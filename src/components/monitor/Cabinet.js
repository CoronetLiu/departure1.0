/*
* Author: CoronetLiu   2018/2/5
*/

import React from 'react';
import {Row, Col} from 'antd';
import Menu from "../menu/Menu.js"
import './Cabinet.scss';
import Facade from 'axios';
import {cachMap, clear, convertNode, convertCircleNode, getCache, addAlarm} from '../../util/TopoConvertUtil';
import {Link,hashHistory,browserHistory} from "react-router";

let scalRate = 0.8;//缩放比例
let dicTableMap = {};
let rackMap = {};//机柜缓存
let rackDatas = [];//机柜数据
let cardDatas = [];//板卡数据
let tipImage = [];//提示信息数组
let report = [];

let rowGap = 50;//每行高度
let colGap = 50;//每列宽度
let flagRGap = 30;//标题高度
let flagCGap = 30;//标题宽度

let flagSx = 100;//机房布局起始x
let flagSy = 100;//机房布局起始y

let rackSx = 90;//机柜布局起始x
let rackSy = 90;//机柜布局起始y

let swiperTimer = null;//swiper定时器

let alarTime1 = [];
let alarTime0 = [];

let keyWarn = '';//关键告警
let logWarn = '';//日志告警

// let imageBaseUrl = '../dist/resource';
let imageBaseUrl = './assets';

let serverURL = "/serverURL";
// let serverURL = 'http://192.168.182.212:59609/obm';//zhangyilin
// let serverURL = 'http://192.168.18.108:59609/obm';//wang




//默认值
export default class Cabinet extends React.Component {
    constructor(props) {
        super(props);
        //规定
        this.state = {
            w: 1340,
            h: 870,
            resId: '',
            resName: '',
            roomId: '',
            cabinetId: '',
            engineRoomName: '',
            deviceName: '',
            //跳转url
            weburl: '',
            //操作按钮对象
            confirmmes:"",
            confirmtar:"",
            type: '',
            rackU : 0,
            prosAndCons:true,
            canDrill:false,
            mouseevent:false,
            //场景
            scene: {},
            //展现
            stage: {},
            //上下文
            context: {},
            //机房展现
            roomStage: {},
            //机房场景
            roomScene: {}
        };
    }
    //元件    重新赋值
    componentDidMount() {

        //调整画布
       // window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.setState({
            roomId:this.props.location.query.roomId,
            cabinetId:this.props.location.query.cabinetId,
            engineRoomName:this.props.location.query.engineRoomName,
            deviceName:this.props.location.query.deviceName,
            //949
            h: this.roomtopoParent.clientHeight - 3,
            //1920
            w: this.roomtopoParent.clientWidth
        });
        //Object
        this.state.stage = new JTopo.Stage(this.rackcanvas);
        //Object
        this.state.scene = new JTopo.Scene(this.state.stage);
        //Object
        this.state.roomStage = new JTopo.Stage(this.roomNodeCanvas);
        //Object
        this.state.roomScene = new JTopo.Scene(this.state.roomStage);
        //方式
        this.state.stage.mode = 'select';
        this.state.roomStage.mode = 'select';
        //为机柜详细图创建事件监听器    当双击机柜详细图的时候触发（右侧画布）
        this.state.scene.addEventListener('dbclick', (evt) => {
            //获取板卡数据
            if (evt.target && evt.target.canDrill) {

                //清除定时器
                clearInterval(alarTime0);
                clearInterval(alarTime1);

                this.state.scene.clear();
                this.createCabinet();
                this.setState({
                    resId:evt.target.id
                // resName:evt.target.resName
                });
                this.refs.buttons.style.display = 'block';
                document.getElementsByClassName("devicenow")[0].style.display = "block";
                Facade.get(serverURL+'/cabinetview/hardware?resId='+this.state.resId+'&prosAndCons=true')
                .then((response) => {
                    if (evt.target.canDrill) {
                        if(evt.target.image){
                            let hei = evt.target.image.height > this.state.h ? (evt.target.image.height + 130) : 870;
                            this.setState({
                                h:hei
                            });
                            document.getElementsByClassName("room-main")[0].style.height = hei + "px"
                        }

                        //创建设备  （控件id）
                        this.creatDevice(response);
                    }
                }).catch(function (error) {
                    console.log(error);
                });

                //触发告警滚动
                this.warnScroll()
            }

        });

        this.state.scene.addEventListener('mouseout', (evt) => {
            this.refs.tip.style.display = "none";
        });

        this.state.scene.addEventListener('mouseover', (evt) => {
                this.tip(evt);
        });

        this.state.scene.addEventListener('click', (evt) => {
            if(evt.target&&evt.target.id=='exchange'){
                this.exchange();
            }
        });

        this.createCabinet();
        //按钮点击事件监听
        this.refs.confirm.addEventListener("click",(event) => {
            if(event.target.className == "confirm"){
                this.refs.confirm.style.display = "none";
                this.refs.layer.style.display = "none";
                if(this.state.confirmtar == "web"){
                    this.toWeb()
                }
                if(this.state.confirmtar == "webterm"){
                    this.webterm()
                }
                if(this.state.confirmtar == "desktop"){
                    this.desktop()
                }
                if(this.state.confirmtar == "powerOff"){
                    this.powerOff()
                }
                if(this.state.confirmtar == "powerOn"){
                    this.powerOn()
                }
                if(this.state.confirmtar == "restart"){
                    this.restart()
                }
            }else if(event.target.className == "cancle"){
                this.refs.confirm.style.display = "none";
                this.refs.layer.style.display = "none";
            }
        });

        //按钮提示信息显示
        this.refs.buttons.addEventListener('mouseover', (evt) => {
            this.refs.tip.style.left = evt.clientX + "px";
            this.refs.tip.style.top = evt.clientY + evt.target.offsetHeight + "px";
            switch(evt.target.className){
                case "web":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "WEB界面";
                            break;
                case "webterm":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "命令行操作";
                            break;
                case "desktop":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "远程桌面";
                            break;
                case "powerOn":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "开机";
                            break;
                case "powerOff":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "关机";
                            break;
                case "restart":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "重启";
                            break;
                case "backface":this.refs.tip.style.display = "block";
                            this.refs.tip.innerHTML = "切换正反面";
                            break;
                default:this.refs.tip.style.display = "none";
                            break;
            }
        });

        //按钮提示信息消失
        this.refs.buttons.addEventListener('mouseout', (evt) => {
                this.refs.tip.style.display = "none";
        });

        //告警提示弹窗消失
        this.state.scene.addEventListener('mouseout', (evt) => {
            this.refs.tip.style.display = "none";
        });

        //设备信息显示
        this.state.scene.addEventListener("mouseover",(evt) => {
            let that = this;
            if(evt.target && evt.target.message){
                //目标起始x
                let x = evt.target.x;
                //目标起始y
                let y = evt.target.y;
                //鼠标x
                let clientX = evt.clientX;
                //鼠标y
                let clientY = evt.clientY;
                //目标高度
                let height = evt.target.image.height * scalRate * 0.2;
                //目标宽度
                let width = evt.target.image.width / (4.75)  * scalRate;
                //提示框坐标y
                let tipy = (y + 200) > window.innerHeight ? 308 : y;
                //提示框坐标x
                let tipx = x + width;
                Facade.get(serverURL+'/cabinetview/device?cabinetId='+this.state.cabinetId).then((response) => {
                    if (response.data) {
                        response.data.map((item, index) => {
                            // that.setState({
                            //  resName:item.OBJECTNAME
                            // });
                            if(evt.target.id == item.OBJECTID && x <= clientX && clientX <= 222 && y <= clientY && clientY <= 600){
                                that.refs.tip.style.display = "block";
                                that.refs.tip.style.left = tipx + "px";
                                that.refs.tip.style.top = tipy + "px";
                                that.refs.tip.innerHTML =
                                    `<p>管理IP:<span class="MANAGEIP">${item.MANAGEIP}</span></p>
                                    <p>业务IP:<span class="BUSINESSIP">${item.BUSINESSIP}</span></p>
                                    <p>主机名:<span class="OBJECTNAME">${item.OBJECTNAME}</span></p>
                                    <p>归属平台:<span class="BUSINESS">${item.BUSINESS}</span></p>
                                    <p>厂家:<span class="NE_TYPE">${item.VENDOR}</span></p>
                                    <p>型号:<span class="VENDOR">${item.NE_TYPE}</span></p>
                                    <p>序列号:<span class="SERNUM">${item.SERNUM}</span></p>
                                    <p>零件号:<span class="PARTNUM">${item.PARTNUM}</span></p>`;
                            }
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });

        //展开告警按钮
        this.refs.warnBtn.addEventListener("click",(evt)=>{
            if(evt.target.innerHTML == "展开"){
                evt.target.innerHTML = "收起";
                let length = evt.target.nextSibling.children.length+1;
                if(length > 6){
                    this.refs.warnMore.style.display = "block"
                }else{
                    this.refs.warnMore.style.display = "none"
                }
                length = length>6?6:length;
                evt.target.parentNode.style.height = length * 30 +"px";
            }else{
                evt.target.innerHTML = "展开";
                evt.target.parentNode.style.height = 30+"px";
                this.refs.warnMore.style.display = "none"
            }
        })

    }//DidMounted

    warnScroll(){
        //滚动警告显示
        this.refs.swiperCl.style.display = "block";
        this.refs.warnMore.style.display = "none";
        this.refs.warnBtn.innerHTML = "展开";
        this.refs.warnBtn.parentNode.style.height = 30 + "px";

        // Facade.get(imageBaseUrl+"/json/mock.json").then((response) => {
        Facade.get(serverURL+'/cabinetview/warn?resId='+this.state.resId).then((response) => {
            if (response.data) {
                response.data.map((item, index) => {
                    let ar = item.STATUS.split("</br>");
                    let str1 = "";
                    for(var i = 0; i < ar.length; i ++){
                        if(ar[i].indexOf("日志") >= 0){
                            str1 += '<li>'+ar[i]+'</li>'
                        }
                    }
                    if(str1 == ""){
                        this.refs.swiperUl.innerHTML ='<li>暂无告警信息</li>'
                    }else{
                        this.refs.swiperUl.innerHTML = str1
                    }
                });
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    createCabinet(){
        Facade.get(serverURL+'/cabinetview/cabinet?cabinetId='+this.props.location.query.cabinetId)
        .then((response) => {
            console.log("room => cabinet",response);
            this.creatRack(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    //切换板卡正反面
    exchange(){
        //清除定时器
        clearInterval(alarTime0);
        clearInterval(alarTime1);

        if(this.state.prosAndCons){
            this.state.scene.clear();
            this.createCabinet();
            Facade.get(serverURL+'/cabinetview/hardware?resId='+this.state.resId+'&prosAndCons=false')
            .then((response) => {
                if(response.data.length != 0){
                    this.setState({prosAndCons:false});
                    this.creatOpposite();
                    //创建设备
                    this.creatOppositeCard(response);
                }else{
                    this.state.scene.clear();
                    this.createCabinet();
                    this.setState({prosAndCons:true});
                    Facade.get(serverURL+'/cabinetview/hardware?resId='+this.state.resId+'&prosAndCons=true')
                    .then((response) => {
                        //创建设备
                        this.creatDevice(response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            this.state.scene.clear();
            this.createCabinet();
            this.setState({prosAndCons:true});
            Facade.get(serverURL+'/cabinetview/hardware?resId='+this.state.resId+'&prosAndCons=true')
            .then((response) => {
                //创建设备
                this.creatDevice(response);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    //创建机架图
    creatRack(response){
        let ac = response.data;
        ac.map((item, index) => {
            this.setState({
                rankU : item.RANKU
                // rankU : 47
            });
            let img = new Image();
            //加载图片 动态  （存路径）
            img.src = imageBaseUrl+'/images/cabinet/'+item.RANKU+'Ucabinets.png';
            // img.src = imageBaseUrl+'/cabinet/47Ucabinets.png';
            img.onload = () => {
                let rackNode = {};
                //机架名称
                rackNode.name = '';
                //布局起始x
                rackNode.x = rackSy * scalRate;
                //布局起始y
                rackNode.y = rackSx * scalRate;
                //机架宽度
                rackNode.w = img.width * scalRate;
                //机架高度
                rackNode.h = img.height * scalRate;
                //随机id
                rackNode.id = uuid();
                //字体样式
                rackNode.font = '14px 微软雅黑';
                //字体颜色
                rackNode.color = '#fff';
                //创建机架详细图底图
                rackNode.image = imageBaseUrl+'/images/cabinet/'+item.RANKU+'Ucabinets.png';
                // rackNode.image = imageBaseUrl+'/cabinet/47Ucabinets.png';
                rackNode.canDrill = false;
                rackNode.mouseevent = false;
                //画图
                convertNode(this.state.scene, rackNode);
                //获取设备数据（机架与设备绑定）
                Facade.get(serverURL+'/cabinetview/device?cabinetId='+this.state.cabinetId)
                //设备结果
                .then((response) => {
                    this.deviceResult(response)
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
    };

    //创建设备缩略图和告警灯
    deviceResult(response){
        let ac = response.data;
        if (ac) {
            ac.map((item, index) => {
            tipImage.push(item);
            let deviceimg = new Image();
            //创建设备详细图
            deviceimg.src = imageBaseUrl+'/device/'+item.OBJECTTYPE+'/'+ item.OBJECTTYPE + '.png';
            deviceimg.onload = () => {
                let rackNode = {};
                rackNode.name = '';
                //所占总U数         35              23
                let numU = item.TOP_UNIT - item.BOTTOM_UNIT -1;
                if(numU<5){
                }else if(numU>5){
                    this.setState({
                        h: this.roomtopoParent.clientHeight - 3 + (numU-5)*90
                    });
                }
                if(this.state.rankU == 42){
                    //布局x            100
                    rackNode.x = (rackSx + 18) * scalRate;
                    //布局y       13.9单位U长度    机柜框长
                    rackNode.y = (13.9 * (this.state.rankU - item.BOTTOM_UNIT) + 14 + rackSy) * scalRate;
                    //设备缩略图宽度
                    rackNode.w = deviceimg.width/(4.75)  * scalRate;
                    //设备缩略图高度
                    rackNode.h = deviceimg.height * scalRate * 0.188;
                }else if(this.state.rankU == 47){
                    //布局x            100
                    rackNode.x = (rackSx + 18) * scalRate;
                    //布局y      12.4单位U长度
                    rackNode.y = (12.4 * (this.state.rankU - item.BOTTOM_UNIT) + 15 + rackSy) * scalRate;
                    //设备缩略图宽度
                    rackNode.w = deviceimg.width/(4.75)  * scalRate;
                    //设备缩略图高度
                    rackNode.h = deviceimg.height * scalRate * 0.168
                }

                //随机id
                rackNode.id = item.OBJECTID;
                //设备型号
                rackNode.NE_TYPE = item.NE_TYPE;
                //设备供应商
                rackNode.VENDOR = item.VENDOR;
                //字体样式
                rackNode.font = '14px 微软雅黑';
                //字体颜色
                rackNode.color = '#fff';
                //设备MMS
                rackNode.image = imageBaseUrl+'/device/'+item.OBJECTTYPE+'/' + item.OBJECTTYPE + '.png';
                rackNode.canDrill = true;
                rackNode.mouseevent = true;
                //是否显示设备信息
                rackNode.message = true;
                rackNode.resId = item.OBJECTID;
                //画图
                let rackn = convertNode(this.state.scene, rackNode);
                //是否显示设备信息
                rackn.message = true;
                //创建圆点
                let circleNode = {};
                if(this.state.rankU == 42){
                    //圆点起始x
                    circleNode.x = ((rackSx + 5) + deviceimg.width/4.75) * scalRate;
                    //圆点大小    29
                    let centerCirleU = item.BOTTOM_UNIT + (item.TOP_UNIT - item.BOTTOM_UNIT) / 2;
                    //圆点起始y  42U [13.8/12.5] （ 单位u * 距顶部u数  + 顶部灰色  + 高度  / 2 + 100 ）*缩放比例
                    circleNode.y = (13.8 * (this.state.rankU - item.BOTTOM_UNIT) + 14 + (-numU * 12.5 / 2) + rackSy) * scalRate;
                }else if(this.state.rankU == 47){
                    //圆点起始x
                    circleNode.x = ((rackSx + 5) + deviceimg.width/4.75) * scalRate;
                    //圆点大小    29
                    let centerCirleU = item.BOTTOM_UNIT + (item.TOP_UNIT - item.BOTTOM_UNIT) / 2;
                    //圆点起始y 47U [12.4/10] （ 单位u * 距顶部u数  + 顶部灰色  + 高度  / 2 + 100）*缩放比例
                    circleNode.y = (12.3 * (this.state.rankU - item.BOTTOM_UNIT) + 15 + (-numU* 10 / 2) + rackSy) * scalRate;
                }
                Facade.get(serverURL+'/cabinetview/warn?resId='+item.OBJECTID).then((response) => {
                    if (response.data) {
                        response.data.map((item, index) => {
                            //区别告警
                            let ar = item.STATUS.split("<br/>");
                            let ar1 = [];
                            let ar2 = [];
                            for(var i = 0; i < ar.length; i ++){
                                if(ar[i].indexOf("日志") >= 0){
                                    ar2.push(ar[i])
                                }else{
                                    ar1.push(ar[i])
                                }
                            }
                            let str1 = ar1.length ? ar1.join("<br/>") : "正常";
                            let str2 = ar2.length ? ar2.join("<br/>") : "暂无";

                            let cnode = convertCircleNode(this.state.scene, circleNode, 5,item.COLOR);
                            cnode.alpha = 1;
                            //圆点阴影
                            cnode.shadow = true;
                            cnode.resId = item.RESID;
                            //圆点阴影污斑 （类似滤镜功能）
                            cnode.shadowBlur = 10;
                            //圆点阴影颜色
                            cnode.shadowColor = item.COLOR;
                            cnode.fillColor = item.COLOR;

                            if(str1 == "正常" && str2 != "暂无"){
                                cnode.shadowColor = "255,255,0";
                                cnode.fillColor = "255,255,0";
                            }
                            for(var j = 0; j < ar.length; j ++){
                                if(ar[j].indexOf("脱网") >= 0){
                                   cnode.shadowColor = "226,226,226";
                                   cnode.fillColor = "226,226,226";
                                }
                            }

                            //偏移量x
                            cnode.shadowOffsetX = 0;
                            //偏移量y
                            cnode.shadowOffsetY = 0;
                            cnode.dragable = false;
                            cnode.canDrill = false;
                            cnode.mouseevent = true;
                            cnode.type = 'warn';
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            };
        });
        };
    };

    /**
     * 创建报表
     */
    createReport(response){
        this.refs.report.style.display='block';
        Facade.get(serverURL+'/cabinetview/report?resId='+this.state.resId).then((response) => {
            if (response.data) {
                this.refs.report.innerHTML ='';
                response.data.map((item, index) => {
                    this.refs.report.innerHTML += item.VAL;
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    /**
     * 创建板卡框架图
     * @param response
     * @param id
     */
    creatDevice(response){
        //id为cookie id
        let node = cachMap.get(this.state.resId);
        if (node) {
            //设备类型
            let netype = node.NE_TYPE;
            this.setState({
                type:node.NE_TYPE
            });
            let img = new Image();
            img.src =  imageBaseUrl+'/device/'+node.NE_TYPE+'/' + node.NE_TYPE + '.png';
            img.onload = () => {
                let deivce = {};
                //设备名称
                deivce.name = '';
                //布局起始x
                deivce.x = (3 * rackSx);
                //布局起始y
                deivce.y = rackSy;
                //设备宽度  （图片大小）  244
                deivce.w = img.width;
                //设备高度  （图片大小）  273
                deivce.h = img.height;
                //设备随机id
                deivce.id = uuid();
                //设备类型  d310
                deivce.NE_TYPE = node.NE_TYPE;
                //设备供应商 华为
                deivce.VENDOR = node.VENDOR;
                //字体设置
                deivce.font = '14px 微软雅黑';
                //字体颜色
                deivce.color = '#fff';
                deivce.image = imageBaseUrl+'/device/'+node.NE_TYPE+'/' + node.NE_TYPE + '.png';
                //是否能操作
                deivce.canDrill = false;
                deivce.mouseevent = false;
                //画图
                convertNode(this.state.scene, deivce);
                //创建板卡信息
                this.creatCard(netype,response);
                //创建切换按钮
                Facade.get(serverURL+'/cabinetview/weburl?resId='+this.state.resId).then((response) => {
                    if (response.data) {
                        response.data.map((item, index) => {
                            this.setState({
                                weburl : item.WEBURL
                                // weburl : "https://192.168.182.212:25639/"
                            });
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
                //释放对象
                img = null;
            };
        }
    };

    /**
     * 创建板卡信息
     * @param data
     * @param netype
     */
    creatCard(netype,response){
        let ac = response.data;
        if(ac){
            //创建采集报表
            this.createReport();
            ac.map((item, index) => {
                tipImage.push(item);
                this.setState({
                    resName:item.RESNAME
                });
                let card = {};
                //资源名称
                card.name = '';
                //dictable  并列  布局x
                card.x = (3 * rackSx) + item.COORDINATEX * item.WIDTH;
                //布局y
                card.y = item.COORDINATEY * item.HEIGHT + item.COORDINATEY + rackSy;
                let img = new Image();
                //图片路径
                img.src = imageBaseUrl+'/device/'+netype+'/'+ item.HARDWAREIMG+'.png';
                //图片加载样式
                img.onload = () => {
                    //图片宽度
                    card.w = img.width;
                    //图片高度
                    card.h = img.height;
                    //随机id
                    card.id = uuid();
                    //字体样式
                    card.font = '14px 微软雅黑';
                    //字体颜色
                    card.color = '#fff';
                    //图片路径
                    card.image = imageBaseUrl+'/device/'+netype+ '/' + item.HARDWAREIMG + '.png';
                    if(!item.IFINSTALL && item.OBJECTTYPE != "FILLING"){
                        card.image = imageBaseUrl+'/device/'+netype+ '/'+netype+'_FILLING_'+item.OBJECTTYPE+'.png';

                    }
                    card.canDrill = false;
                    card.mouseevent = false;
                    //画图
                    let cards = convertNode(this.state.scene, card);
                    cards.mouseevent = true;
                    cards.message = false;
                    cards.type = item.OBJECTTYPE;
                    cards.imageName = item.HARDWAREIMG;
                    if(item.IFWARN== true){
                        alarTime0 = setInterval(function(){
                            if(cards.alarm == ''){
                                cards.alarm = null;
                            }else{
                                cards.alarm = '';
                                cards.alarmColor = '255,0,0';
                            }
                        }, 600);
                    }
                    //单个硬盘的告警灯      // 前面板
                    if(item.OBJECTTYPE != "FILLING"){
                        let circleNode = {};
                        if(img.height > img.width){
                            circleNode.x = item.COORDINATEX + (3 * rackSx) + img.width / 2 - 5;
                            circleNode.y = item.COORDINATEY * 2 + rackSy + 3;
                        }else{
                            circleNode.x = item.COORDINATEX + (3 * rackSx) + img.width - 18;
                            circleNode.y = item.COORDINATEY * 2   + rackSy + img.height / 2 -5;
                        }

                        let centerCirleU = 20;

                        let cnode = convertCircleNode(this.state.scene, circleNode, 5);
                        //圆点阴影
                        cnode.shadow = true;
                        cnode.resId = item.RESID;
                        //圆点阴影污斑 （类似滤镜功能）
                        cnode.shadowBlur = 10;
                        //圆点阴影颜色
                        cnode.shadowColor = item.COLOR;
                        //偏移量x
                        cnode.shadowOffsetX = 0;
                        //偏移量y
                        cnode.shadowOffsetY = 0;
                        cnode.dragable = false;
                        cnode.canDrill = false;
                        cnode.mouseevent = true;
                        cnode.alpha = 1;
                        let color = '0,255,0';
                        if(item.IFINSTALL && item.IFWARN){
                            color = '255,0,0';
                        }
                        if(!item.IFINSTALL){
                            color = "220,220,220";
                            cnode.fillColor = color;
                            cnode.mouseevent = false;

                        }else{
                            cnode.fillColor = color;
                            alarTime1 = setInterval(function(){
                                if(cnode.alpha > 0.2){
                                    cnode.alpha += -0.1
                                }else{
                                    cnode.alpha  = 1
                                }
                            }, 200);
                        }
                    }
                    //释放对象
                    img = null;
                };
            });
        };

    };

    //后面板背景图
    creatOpposite(){
        let img = new Image();
        //图片 （存路径   d2310_img.png   244x273）
        img.src = imageBaseUrl+'/device/'+this.state.type+'/' + this.state.type + '_opposite.png';
        img.onload = () => {
            let deivce = {};
            //设备名称
            deivce.name = '';
            //布局起始x
            deivce.x = (3 * rackSx);
            //布局起始y
            deivce.y = rackSy;
            //设备宽度  （图片大小）  244
            deivce.w = img.width;
            //设备高度  （图片大小）  273
            deivce.h = img.height;
            //设备随机id
            deivce.id = uuid();
            deivce.image = imageBaseUrl+'/device/'+this.state.type+'/' + this.state.type + '_opposite.png';
            //是否能操作
            deivce.canDrill = false;
            //画图
            let opposite = convertNode(this.state.scene, deivce);
            opposite.mouseevent=false;
            opposite.message = false;
            //释放对象
            img = null;
        };
    };

    //后面板
    creatOppositeCard(response){
        let ac = response.data;
        if(ac){
            ac.map((item, index) => {
                tipImage.push(item);
                let img = new Image();
                //图片 （存路径   d2310_img.png   244x273）
                img.src = imageBaseUrl+'/device/'+item.BOARTYPE+'/'+item.HARDWAREIMG+'.png';
                img.onload = () => {
                    let deivce = {};
                    //设备名称
                    deivce.name = '';
                    deivce.x = (3 * rackSx) + item.COORDINATEX * item.WIDTH;
                    //布局y
                    deivce.y = item.COORDINATEY * item.HEIGHT + item.COORDINATEY + rackSy;
                    //设备宽度  （图片大小）  244
                    deivce.w = img.width;
                    //设备高度  （图片大小）  273
                    deivce.h = img.height;
                    //设备随机id
                    deivce.id = uuid();
                    //设备类型  d310
                    deivce.NE_TYPE = item.NE_TYPE;
                    //设备供应商 华为
                    deivce.VENDOR = item.VENDOR;
                    //字体设置
                    deivce.font = '14px 微软雅黑';
                    //字体颜色
                    deivce.color = '#fff';
                    //图片路径  d2310_img.png
                    deivce.image = imageBaseUrl+'/device/'+item.BOARTYPE+'/'+item.HARDWAREIMG+'.png';
                    if(!item.IFINSTALL && item.OBJECTTYPE != "FILLING"){
                        deivce.image = imageBaseUrl+'/device/'+item.BOARTYPE+ '/'+item.BOARTYPE+'_FILLING_'+item.OBJECTTYPE+'.png';
                    }
                    //是否能操作
                    deivce.canDrill = false;
                    deivce.mouseevent = false;
                    //画图
                    let cards = convertNode(this.state.scene, deivce);
                    cards.mouseevent = true;
                    cards.message = false;
                    cards.type = item.OBJECTTYPE;
                    cards.imageName = item.HARDWAREIMG;

                    //单个硬盘的告警灯    // 后面板
                    if(item.OBJECTTYPE != "FILLING"){
                        let circleNode = {};
                        if(img.height > img.width){
                            circleNode.x = item.COORDINATEX + (3 * rackSx) + img.width / 2 - 5;
                            circleNode.y = item.COORDINATEY * 2 + rackSy ;
                        }else{
                            circleNode.x = item.COORDINATEX + (3 * rackSx) + img.width - 16;
                            circleNode.y = item.COORDINATEY * 2 + rackSy + img.height / 2 - 5;
                        }

                        let centerCirleU = 20;

                        let cnode = convertCircleNode(this.state.scene, circleNode, 5);
                        //圆点阴影
                        cnode.shadow = true;
                        cnode.resId = item.RESID;
                        //圆点阴影污斑 （类似滤镜功能）
                        cnode.shadowBlur = 10;
                        //圆点阴影颜色
                        cnode.shadowColor = item.COLOR;
                        //偏移量x
                        cnode.shadowOffsetX = 0;
                        //偏移量y
                        cnode.shadowOffsetY = 0;
                        cnode.dragable = false;
                        cnode.canDrill = false;
                        cnode.mouseevent = true;
                        cnode.alpha = 1;
                        let color = '0,255,0';
                        if(item.IFINSTALL && item.IFWARN){
                            color = '255,0,0';
                        }
                        if(!item.IFINSTALL){
                            color = "200,200,50";
                            cnode.fillColor = color;
                            cnode.mouseevent = false;

                        }else{
                            cnode.fillColor = color;
                            alarTime1 = setInterval(function(){
                                if(cnode.alpha > 0.2){
                                    cnode.alpha += -0.1
                                }else{
                                    cnode.alpha  = 1
                                }
                            }, 200);
                        }
                    }
                    img = null;
                    if(item.IFWARN == true){
                        alarTime0 = setInterval(function(){
                            if(cards.alarm == ''){
                                cards.alarm = null;
                            }else{
                                cards.alarm = '';
                                cards.alarmColor = '255,0,0';
                            }
                        }, 600);
                    }
                };
            });
        }
    };

    powerOff(){
        Facade.get(serverURL+'/cabinetview/powerOff?resId='+this.state.resId)
        .then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    powerOn(){
        Facade.get(serverURL+'/cabinetview/powerOn?resId='+this.state.resId)
        .then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    restart(){
        Facade.get(serverURL+'/cabinetview/restart?resId='+this.state.resId)
        .then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }
    webterm(){
        Facade.get(serverURL+'/cabinetview/webterm?resId='+this.state.resId)
        .then((response) => {
            let ac = response.data;
            if(ac){
                 // $("#"+data.id+"mindTerm").remove();
                 // $("body").append("<iframe id='+data.id+'mindTerm name='+data.id+'mindTerm' src=''  width='1000px;' height='200px;'>");
                 // var mindterm="<APPLET id='appletId' CODE='com.mindbright.application.MindTerm.class' name='dynamicCommand'  width = '700' height = '100%' ARCHIVE='imageBaseUrl/webterm/mindterm.jar'>";
                 // mindterm+="<PARAM NAME='username' value="+data.username+"></PARAM>";
                 // mindterm+="<PARAM NAME='password' value=''></PARAM>";
                 // mindterm+="<PARAM NAME='port' value="+data.port+"></PARAM>";
                 // mindterm+="<PARAM NAME='server' value="+data.server+"></PARAM>";
                 // mindterm+="<PARAM NAME='sepframe' value='true'></PARAM>";
                 // mindterm+="<PARAM NAME='menus' value='yes'></PARAM>";
                 // mindterm+="<PARAM NAME='postUrl' value=''></PARAM>";
                 // mindterm+="<PARAM NAME='loginUserName' value=''></PARAM>";
                 // mindterm+="<PARAM name='image' value='text.png'> </PARAM>";
                 // mindterm+="<PARAM NAME='resourceId' value="+data.id+"></PARAM>";
                 // mindterm+="<PARAM NAME='title' value='命令行操作'></PARAM>";
                 // mindterm+="</APPLET>";
                 // $("body").append(mindterm);
                 // $("body").append('</iframe>');
                 // console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    desktop(){
        Facade.get(serverURL+'/cabinetview/desktop?resId='+this.state.resId)
        .then((response) => {
            let ac = response.data;
            if(ac){
                //  $("#"+data.resid+"deskTop").remove();
                //  $("body").append("<iframe id="+data.resid+"deskTop' name="+data.resid+"deskTop src=''  width='1000px;' height='200px;'>");
                //  var desktop="<applet code='com.glavsoft.viewer.Viewer' width='1' height='1' archive='imageBaseUrl/desktop/tightvnc-jviewer.jar'>";
                //  desktop+="<param name='Host' value='"+data.host+"'/>";
                //  desktop+="<param name='Port' value='"+data.port+"'/>";
                //  desktop+="<param name='Password' value='"+data.vncpassword+"'/>";
                //  desktop+="<param name='OpenNewWindow' value='yes'/> ";
                //  desktop+="<param name='ShowControls' value='no'/> ";
                //  desktop+="<param name='ViewOnly' value='no'/>";
                //  desktop+="<param name='AllowClipboardTransfer' value='yes'/>";
                //  desktop+="<param name='RemoteCharset' value='standard'/>";
                //  desktop+="<param name='ShareDesktop' value='yes'/>";
                //  desktop+="<param name='AllowCopyRect' value='yes'/>";
                //  desktop+="<param name='Encoding' value='Tight'/>";
                //  desktop+="<param name='CompressionLevel' value=''/>";
                //  desktop+="<param name='JpegImageQuality' value=''/>";
                //  desktop+="<param name='LocalPointer' value='On'/>";
                //  desktop+="<param name='ConvertToASCII' value='no'/>";
                //  desktop+="<param name='colorDepth' value=''/> ";
                //  desktop+="<param name='ScalingFactor' value='100'/>";
                //  desktop+="<param name='sshHost' value=''/>";
                //  desktop+="<param name='sshUser' value=''/>";
                //  desktop+="<param name='sshPort' value=''/>";
                //  desktop+="<param name='useBrowser' value='firefox'/>";
                //  desktop+="<param name='openURL' value='' />";
                //  desktop+="<param name='callbackURL' value='' />";
                //  desktop+="<param name='resourceId' value='"+data.resid+"'/>";
                //  desktop+="<param name='sessionId' value='"+data.sessionId+"'/>";
                //  desktop+="<param name='probeId' value='"+data.probeip+"'/>";
                //  desktop+="<param name='equipmentType' value='"+data.manufacturer+"'/>";
                //  desktop+="<param name='versionType' value='"+data.model+"'/>";
                //  desktop+="<param name='resourceIp' value='"+data.resip+"'/>";
                //  desktop+="<param name='resourcePort' value='"+data.remoteport+"'/>";
                //  desktop+="<param name='resourceUsername' value='"+data.username+"'/>";
                //  desktop+="<param name='resourcePassword' value='"+data.password+"'/>";
                //  desktop+="</applet>";
                //  $("body").append(desktop);
                //  $("body").append('</iframe>');
                // console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    toWeb(){
        this.props.router.push({
            pathname: '/room',
            query: { userId: 1,roomId : this.state.roomId},
        });
    }

    resizeCanvas() {
         this.setState({
             h: this.roomtopoParent.clientHeight - 3,
             w: this.roomtopoParent.clientWidth
         });
    }

    //提示信息事件
    tip(evt){
        let that = this;
        if(evt.target && evt.target.mouseevent&& evt.target.type =='warn'){
            let tipy = (evt.target.y + 30) > window.innerHeight ? 535 : evt.target.y + evt.target.height;
            Facade.get(serverURL+'/cabinetview/warn?resId='+evt.target.resId).then((response) => {
            // Facade.get(imageBaseUrl+"/json/mock.json").then((response) => {
                if (response.data) {
                    response.data.map((item, index) => {
                        that.refs.tip.style.display = "block";
                        that.refs.tip.style.left = evt.target.x + evt.target.width / 2 + 10 + "px";
                        that.refs.tip.style.top = evt.target.y + evt.target.height / 2 + 10 + "px";
                        let ar = item.STATUS.split("<br/>");
                        let ar1 = [];
                        let ar2 = [];
                        for(var i = 0; i < ar.length; i ++){
                            if(ar[i].indexOf("日志") >= 0){
                                ar2.push(ar[i])
                            }else{
                                ar1.push(ar[i])
                            }
                        }
                        keyWarn = ar1.length ? ar1.join("<br/>") : "正常";
                        logWarn = ar2.length ? ar2.join("<br/>") : "暂无";
                        let strIco1 = "<p style='padding-left:16px;font-weight:bold;font-size:14px;background:url("+imageBaseUrl+"/images/warnico1.png) no-repeat 0 8px;'>关键告警</p>";
                        let strIco2 = "<br/><p style='padding-left:16px;font-weight:bold;font-size:14px;background:url("+imageBaseUrl+"/images/warnico2.png) no-repeat 0 8px;'>日志告警</p>";
                        that.refs.tip.innerHTML = strIco1+keyWarn+strIco2+logWarn;
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        if(evt.target && evt.target.mouseevent&& evt.target.type!='warn'&& evt.target.type!='FILLING'){
            Facade.get(serverURL+'/cabinetview/selRes?resId='+this.state.resId+'&type='+evt.target.imageName).then((response) => {
                if (response.data) {
                    response.data.map((item, index) => {
                        that.refs.tip.style.display = "block";
                        that.refs.tip.style.left = evt.target.x + evt.target.width / 2 + 10 + "px";
                        that.refs.tip.style.top = evt.target.y + evt.target.height / 2 + 10 + "px";
                        that.refs.tip.innerHTML = item.VAL;
                        // that.refs.tip.innerHTML = 456;
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    //跳转详情页
    toDetail(){
        window.location.href = serverURL+"/monitoring/monitoringImpl?resid="+this.state.resId+"&roomid="+this.state.roomId+"&cabinetid="+this.state.cabinetId+"&engineroomname="+this.state.engineRoomName+"&devicename="+this.state.deviceName
    };

    //跳转更多警告
    toWarnMore(){
        window.location.href = serverURL+"/warm/findWarm?resid="+this.state.resId
    }

    //显示确认弹窗
    showConfirm(evt){
        let target = evt.target;
        switch(target.className){
            case "webterm":
                        this.setState({
                            confirmmes:"确认是否要执行？",
                            confirmtar:"webterm"
                        });
                        break;
            case "desktop":
                        this.setState({
                            confirmmes:"确认要执行远程桌面吗？",
                            confirmtar:"desktop"
                        });
                        break;
            case "powerOn":
                        this.setState({
                            confirmmes:"本操作会导致电源打开,请确认是否要执行？",
                            confirmtar:"powerOn"
                        });
                        break;
            case "powerOff":
                        this.setState({
                            confirmmes:"本操作会导致电源关闭,请确认是否要执行？",
                            confirmtar:"powerOff"
                        });
                        break;
            case "restart":
                        this.setState({
                            confirmmes:"本操作会导致电源重启,请确认是否要执行？",
                            confirmtar:"restart"
                        });
                        break;
            default:
                        this.setState({
                            confirmmes:"",
                            confirmtar:""
                        });
                        break;
        }
        this.refs.confirm.style.display = "block";
        this.refs.layer.style.display = "block";
        this.refs.layer.style.height = this.state.h + "px"
    };

    render() {
        return (
            //React典型的数据流中，props 传递是父子组件交互的唯一方式
            //React提供的这个 ref 属性， 表示为对组件真正实例的引用，其实就是 ReactDOM.render()返回的组件实例 ；
            <div id="warp">
                <Menu content1="监控" content2="机房视图" content22="/room" content3="机柜视图"/>
                <div id="main-right">
                     <div id="cabinet" ref={(component) => {
                        this.roomtopoParent = component;
                    }}>
                    <div id="swiper-cl" ref="swiperCl">
                    日志告警
                        <a onClick={this.toWarnMore} id="warnMore" ref="warnMore">查看更多>>></a>
                        <span id="warnBtn" ref="warnBtn">展开</span>
                        <ul id="swiper-ul" ref="swiperUl">

                        </ul>
                    </div>
                    <div className="top-cabinet">
                        <h1 className="goback-cl">
                            <a onClick={this.toWeb}>{this.state.engineRoomName}></a>
                            <span className="cabinetnow">{this.state.deviceName}</span>
                            <a className="devicenow" style={{display:"none"}} onClick={this.toDetail}>>{this.state.resName}</a>
                        </h1>
                        <div className="buttons" style={{display:'none'}} ref='buttons'>
                            {/*<Link className="web" onClick={this.toweb}></Link>*/
                            /*<Link className="web" href={this.state.weburl} target="_blank"></Link>
                            <Link className="webterm" onClick={this.showConfirm}></Link>
                            <Link className="desktop" onClick={this.showConfirm}></Link>
                            <Link className="powerOff" onClick={this.showConfirm}></Link>
                            <Link className="powerOn" onClick={this.showConfirm}></Link>
                            <Link className="restart" onClick={this.showConfirm}></Link>*/}
                            <Link className="backface" onClick={this.exchange}></Link>
                        </div>
                        <div id="tip" ref="tip"></div>
                        <div id="report" style={{display:'none'}} ref="report"></div>
                        <div id="confirm" ref="confirm">
                            <p style={{background:"#f0f0f0",height:"40px",padding:"10px 20px",fontSize:"14px",borderRadius:"5px 5px 0 0"}}>警告<span className="cancle" style={{float:"right",cursor:"pointer"}}>X</span></p>
                            <p style={{fontSize:"14px",height:"120px",padding:"30px 50px"}}>{this.state.confirmmes}</p>
                            <p style={{height:"40px",borderTop:"1px solid #f0f0f0",paddingTop:"8px"}}>
                                <span className="cancle" style={{background:"#cccccc",color:"#fff",float:"right",width:"70px",height:"26px",textAlign:"center",fontSize:"14px",cursor:"pointer",padding:"2px 0",borderRadius:"5px"}}>取消</span>
                                <span className="confirm" style={{background:"#36a398",color:"#fff",float:"right", width:"70px",height:"26px",textAlign:"center",fontSize:"14px",cursor:"pointer",padding:"2px 0",borderRadius:"5px",marginRight:"10px"}}>确定</span>
                            </p>
                        </div>
                        <div id="layer" ref="layer"></div>
                    </div>
                        <Row>
                            <Col span={12}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <canvas className="engineRoom" style={{position: 'absolute'}} width={648} height={this.state.h}
                                            ref={(component) => {
                                                this.roomcanvas = component;
                                            }}>
                                    </canvas>
                                    <canvas className="engineRoom" style={{position: 'absolute'}} width={648} height={this.state.h}
                                            ref={(component) => {
                                                this.roomNodeCanvas = component;
                                            }}>
                                    </canvas>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <canvas className="device front" width={1340} height={this.state.h} ref={(component) => {
                                        this.rackcanvas = component;
                                    }}>
                                    </canvas>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
