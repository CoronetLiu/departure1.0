/*
* @Author:  CoronetLiu
* @Date:    2018-04-11 15:13:15
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-04-18 16:50:45
* @Email:   liu86931@163.com
*/

import React from 'react';
import {Link,hashHistory,browserHistory} from "react-router";
import Menu from "../menu/Menu.js"
import './Room.scss';
import {Row, Col} from 'antd';
import Facade from 'axios';
import {cachMap, clear, convertNode, convertCircleNode, getCache, addAlarm, topTitle, leftTitle, loadRack} from '../../util/TopoConvertUtil';

let scalRate = 1;//缩放比例

let rackDatas = [];//机柜数据
let roomDatas = {};//机房数据
let dropEngineRoomDatas = {};//下拉机房数据
let testData = '';//测试数据
let rowColumn = {};

let rowGap = 100;//每行高度
let colGap = 100;//每列宽度
let flagRGap = 30;//标题高度
let flagCGap = 30;//标题宽度

let flagSx = 0;//机房布局起始x
let flagSy = 0;//机房布局起始y

let dataCenterName = '';//数据中心名称
let roomName = '';//机房名称
let cabinetNumber = 0;//机房机柜数量
let roomU = 0;//机房总共U数
let roomOtherU = 0;//机房剩余U数
let roomOccupyU = 0;//机房使用U数
let deviceWarmMessage = '';
let engineRoomId = '';//机房Id
let content = '';
let color = '';

let dropDateCenterName = '';//下拉数据中心名称
let dropEngineRoomName = '';//下拉机房名称

//图片路径
let imageBaseUrl = './assets';
//服务基本路径
let serverURL = "/serverURL";

//默认值
export default class Room extends React.Component {
    constructor(props) {
        super(props);
        //规定
        this.state = {
            w: window.innerWidth,
            h: rowGap * 12,
            //是否显示
            displayState:'none',
            //弹窗相对位置
            topLocation:200,
            //弹窗相对位置
            leftLocation:100,
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

    componentDidMount() {
        let _this = this;
        //调整画布
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
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
        //this.dropData();
        var receiveId = this.props.location.query.roomId;
        if(receiveId != undefined){
            //回调获取机房数据
            Facade.get(serverURL+'/engineRoom/queryOne?userId=1&roomId='+receiveId)
                .then(this.initRoomBgData)
                .catch(function (error) {
                    console.log(error);
                });
        }else{
          //初始加载获取机房数据
            // Facade.get(serverURL+'/engineRoom/queryOne?userId=1')
            Facade.get(imageBaseUrl+'/datas/small.json')
                .then(function(res){
                    _this.initRoomBgData(res)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //返回convas上下文或者返回null       创建2D视图
        this.state.context = this.roomcanvas.getContext('2d');

        //为机柜缩略图创建事件监听器    当鼠标移动的时候触发
        this.state.roomScene.addEventListener('mousemove', (evt) => {
            if(evt.target){
               this.showDeviceDetail(evt.target.id,evt);
            }
        })

        this.state.roomScene.addEventListener('dbclick', (evt) => {
            //alert(evt.target.text);
            hashHistory.push({
                pathname: '/cabinet',
                query: {
                    cabinetId: evt.target.id,
                    roomId : engineRoomId,
                    engineRoomName:roomName,
                    deviceName:evt.target.text
                }
            });
        })

        this.state.roomScene.addEventListener('mouseout', (evt) => {
            this.hideDeviceDetail();
        })


    }

    //初始化机房数据
    initRoomBgData(response,evt){
        roomDatas = response;
        this.change();
        this.createDrop(roomDatas);
        this.createRoomBg(roomDatas);
        this.initRackDatas(roomDatas);
    }

    /**
     * 创建机房
     * @param response
     */
    //创建机房
    createRoomBg(response){
        let ac = response.data;
        if (ac) {
            ac.map((item, index) => {
                //机房唯一标识
                engineRoomId = item.roomPrimKey;

                //机房的行数
                let row = item.roomRow;
                //机房的列数
                let col = item.roomColumn;
                //机房行列布局
                rowColumn = item.rowColumn;
                flagSx = item.roomFlagX * scalRate;
                flagSy = item.roomFlagY * scalRate;

                dataCenterName = item.dataCenterName;
                roomName = item.roomName;
                roomU = item.roomU;
                roomOtherU = item.roomOtherU;
                roomOccupyU = item.roomOccupyU;

                //alert(roomIntroduce);
                // rowGap = (window.innerHeight) / (item.roomRow + 1) * scalRate;
                rowGap = 160;
                // colGap = (window.innerWidth - flagSx) / (item.roomColumn + 3) * scalRate;
                colGap = 70;

                this.setState({
                    //h: (rowGap * row + flagSy * 2) * scalRate,
                    // h : window.innerHeight * scalRate-40,
                    h : (row * 160 + 200) * scalRate-40,
                    // w : window.innerWidth * scalRate - 50-50
                    w : (col * 70 + 300) * scalRate - 50-50
                });
                //画机房名称层 --> 标题层
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.6';
                this.state.context.strokeStyle= 'black';
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.6';
                this.state.context.strokeStyle= 'black';
                //this.state.context.scale(scalRate,scalRate);
                this.state.context.rect(window.innerWidth * scalRate/ 2 - 110,flagSy / 2 - 35,220,35);
                this.state.context.fillStyle = '#F2C357';
                this.state.context.fillRect(window.innerWidth * scalRate/ 2 - 110,flagSy / 2 - 35,220,35);
                this.state.context.closePath();
                this.state.context.font = '20px 微软雅黑';
                this.state.context.textAlign = 'center';
                //标题栏写入数值
                this.state.context.strokeText(item.roomName, window.innerWidth* scalRate/ 2,flagSy / 2 - 10);
                this.state.context.stroke();
                this.state.context.restore();

                //告警监控
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.1';
                this.state.context.strokeStyle= 'black';
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.1';
                this.state.context.strokeStyle= 'black';
                this.state.context.rect(40,10,100,20);
                this.state.context.fillStyle = '#F2C357';
                this.state.context.fillRect(40,10,100,20);
                this.state.context.closePath();
                this.state.context.font = '13px 微软雅黑';
                this.state.context.textAlign = 'center';
                this.state.context.fillStyle = 'black';
                this.state.context.fillText('告警视图',90,25);
                this.state.context.stroke();
                this.state.context.restore();

                //温度监控
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.1';
                this.state.context.strokeStyle= 'black';
                this.state.context.beginPath();
                this.state.context.save();
                this.state.context.lineWidth = '1.1';
                this.state.context.strokeStyle= 'black';
                this.state.context.rect(40,35,100,20);
                this.state.context.fillStyle = '#F2C357';
                this.state.context.fillRect(40,35,100,20);
                this.state.context.closePath();
                this.state.context.font = '13px 微软雅黑';
                this.state.context.textAlign = 'center';
                this.state.context.fillStyle = 'black';
                this.state.context.fillText('功耗视图', 90,50);
                this.state.context.stroke();
                this.state.context.restore();

                //画顶部flag层 --> 标识层
                this.state.context.beginPath();
                this.state.context.save();
                //线宽
                this.state.context.lineWidth = '1';
                //线色
                this.state.context.strokeStyle = '#C1C1BF';
                //第一步，写顶部栏数据
                //1.行不控制
                if(rowColumn.columnControl == 0){
                    let that = this;
                    for (let c = 0; c < col; c++) {
                        that.state.context.rect(flagSx + c * colGap + 5+3, flagSy - flagRGap -5 , colGap -5, flagRGap);
                        if (c != col) {
                            content = c + 1;
                            topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap);
                        }
                    }
                }
                //2.行控制
                else{
                    //1.行类型 数字
                    if(rowColumn.columnType == '数字'){
                        //1.行不自增
                        if(rowColumn.columnIncrease == '不自增'){
                            let that = this;
                            for (let c = 0; c < col; c++) {
                                that.state.context.rect(flagSx + c * colGap + 5+3, flagSy - flagRGap -5 , colGap -5, flagRGap);
                                if (c != col) {
                                    content = rowColumn.columnStartData;
                                    topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap);
                                }
                            }
                        }
                        //2.行自增
                        else{
                            let rowNumber = Number(rowColumn.columnStartData);
                            let that = this;
                            for (let c = 0; c < col; c++) {
                                (function(i){
                                    that.state.context.rect(flagSx + c * colGap + 5+3, flagSy - flagRGap -5 , colGap -5, flagRGap);
                                    if (c != col) {
                                        content = i;
                                        topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap);
                                    }
                                })(rowNumber++)
                            }
                        }
                    }
                    //2.行类型 字母
                    else{
                        //1.行起始数据非数字
                        //1.行不自增
                        if(rowColumn.columnIncrease == '不自增'){
                            let that = this;
                            for (let c = 0; c < col; c++) {
                                that.state.context.rect(flagSx + c * colGap + 5+3, flagSy - flagRGap -5 , colGap -5, flagRGap);
                                if (c != col) {
                                    content = rowColumn.columnStartData;
                                    topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap);
                                }
                            }
                        }
                        //2.行自增
                        else{
                            let that = this;
                            let otherLength = 'Z'.charCodeAt(0) - rowColumn.columnStartData.charCodeAt(0);
                            let startData = 0;
                            for (let c = 0; c < col; c++) {
                                (function(a){
                                    that.state.context.rect(flagSx + c * colGap + 5+3, flagSy - flagRGap -5 , colGap -5, flagRGap);
                                    if (c != col) {
                                        for(var i = 0; i < otherLength; i++){
                                            content = String.fromCharCode((rowColumn.columnStartData.charCodeAt(0) + a));
                                            topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap);
                                        }
                                    }
                                })(startData++)
                            }
                        }
                    }
                }


                //第二步，画顶部栏表格
                //创建从当前点到开始点的路径
                this.state.context.closePath();
                //实际的绘制出通过moveTo()和lineTo()方法定义的路径，默认颜色是黑色
                this.state.context.stroke();
                this.state.context.restore();
                //画左侧flag层 --> 标识层
                //开始一条路径或重置当前的路径
                this.state.context.beginPath();
                this.state.context.save();
                this.strokeStyle = '1';
                this.state.context.strokeStyle = '#C1C1BF';

                //第三步，写左侧栏数据（修改）
                //console.log(rowColumn.columnControl);
                //1.列不控制
                if(rowColumn.rowControl == 0){
                    let that = this;
                    for (let r = 0; r < row; r++) {
                        that.state.context.rect(flagSx - flagRGap - 5, flagSy + r * rowGap + 2, flagCGap, rowGap - 5);
                        if (r != row) {
                            var character = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z");
                            for(var i = 0; i < character.length; i++){
                                content = character[r];
                                leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap);
                            }
                        }
                    }
                //2.列控制
                }else{
                    //1.列类型 数字
                    if(rowColumn.rowType == '数字'){
                        //1.列不自增
                        if(rowColumn.rowIncrease == '不自增'){
                            let that = this;
                            for (let r = 0; r < row; r++) {
                                that.state.context.rect(flagSx - flagRGap - 5, flagSy + r * rowGap + 2, flagCGap, rowGap - 5);
                                if (r != row) {
                                    content = rowColumn.rowStartData;
                                    leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap);
                                }
                            }
                        }
                        //2.列自增
                        else{
                            let columnNumber = Number(rowColumn.rowStartData);
                            let that = this;
                            for (let r = 0; r < row; r++) {
                                (function(i){
                                    that.state.context.rect(flagSx - flagRGap - 5, flagSy + r * rowGap + 2, flagCGap, rowGap - 5);
                                    if (r != row) {
                                        content = i;
                                        leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap);
                                    }
                                })(columnNumber++)
                            }
                        }
                    }
                    //2.列类型 字母
                    else{
                        //1.列起始数据非数字
                        //1.列不自增
                        if(rowColumn.rowIncrease == '不自增'){
                            let that = this;
                            for (let r = 0; r < row; r++) {
                                that.state.context.rect(flagSx - flagRGap - 5, flagSy + r * rowGap + 2, flagCGap, rowGap - 5);
                                if (r != row) {
                                    content = rowColumn.rowStartData;
                                    leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap);
                                }
                            }
                        }
                        //2.列自增
                        else{
                            let that = this;
                            let otherLength = 'Z'.charCodeAt(0) - rowColumn.rowStartData.charCodeAt(0);
                            let startData = 0;
                            for (let r = 0; r < row; r++) {
                                (function(a){
                                    that.state.context.rect(flagSx - flagRGap - 5, flagSy + r * rowGap + 2, flagCGap, rowGap - 5);
                                    if (r != row) {
                                        for(var i = 0; i < otherLength; i++){
                                            content = String.fromCharCode((rowColumn.rowStartData.charCodeAt(0) + a));
                                            leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap);
                                        }
                                    }
                                })(startData++)
                            }
                        }
                    }
                }


                //第四步，画左侧栏表格
                this.state.context.closePath();
                this.state.context.stroke();
                this.state.context.restore();

                //第五步，画中心层 --> 机房视图层
                for (let r = 0; r < row; r++) {
                    for (let c = 0; c < col; c++) {
                        this.state.context.beginPath();
                        this.state.context.lineWidth = '0.5';
                        this.state.context.strokeStyle = item.roomLineColor;
                        this.state.context.rect(flagSx + c * colGap + 5, flagSy + r * rowGap, colGap, rowGap);
                        this.state.context.closePath();
                        this.state.context.stroke();
                        this.state.context.restore();
                    }
                }
            });
        }
    };

    //第七步，创建机架位置
    initRackDatas(response){
        let ac = response.data;
        ac.map((a, index) => {
            rackDatas = a.deviceVos;
            cabinetNumber = rackDatas.length;
            rackDatas.map((item,index) =>{
                let devices = item.deviceData;
                let img = new Image();
                let cabinetName = rowColumn.rowStartData + "/" + item.deviceName;
                devices = JSON.parse(devices);
                devices.map((device,index) =>{
                    let that = this;
                    if(item.warmNumber > 0){
                        color = '255,0,0';
                        loadRack(img,imageBaseUrl,flagSx,item,colGap,flagSy,rowGap,device,scalRate,that,cabinetName,color);
                    }else if(item.deviceState == 0){
                        color = '50,50,60';
                        loadRack(img,imageBaseUrl,flagSx,item,colGap,flagSy,rowGap,device,scalRate,that,cabinetName,color);
                    }else{
                        color = '0,255,0';
                        loadRack(img,imageBaseUrl,flagSx,item,colGap,flagSy,rowGap,device,scalRate,that,cabinetName,color);
                    }
                });
            });
        });
    };

    /**
     * 创建下拉菜单
     * @param
    */
    createDrop(response){
        let that = this;
        let ac = response.data;
        ac.map((item,index) => {
            testData = item.testData;
            this.refs.test.innerHTML = testData;
            let lis = document.getElementsByClassName("dropName");
            let ids = document.getElementsByClassName('engineRoomId');
            for(var i = 0; i < lis.length; i++){
                //页面加载时即执行
                lis[i].onclick = function(){
                    if(this.children[0].style.display == "block"){
                        this.children[0].style.display = "none";
                        this.style.backgroundImage = 'url("../../assets/images/room/right.png")';
                    }else{
                        this.children[0].style.display = "block";
                        this.style.backgroundImage = 'url("../../assets/images/room/down.png")';
                        for(var j = 0; j < ids.length; j++){
                            const roomId = ids[j].id;
                            ids[j].onclick = function(){
                                that.state.roomScene.clear();
                                Facade.get(serverURL+'/engineRoom/queryOne?userId=1&roomId='+roomId)
                                .then(that.initRoomBgData)
                                .catch(function (error) {
                                    console.log(error);
                                });
                            }
                        }
                    }
                }
            }
        });
    };

    change(){
        let _this = this;
        let scaleDiv = document.getElementById("scale");
        scaleDiv.onclick = function(e){
            if(e.target.className == "bigger"){
                if(scalRate <= 1.6){
                    scalRate+=0.1;
                    _this.state.roomScene.clear();
                    _this.createDrop(roomDatas);
                    _this.createRoomBg(roomDatas);
                    _this.initRackDatas(roomDatas);
                }

            }
            if(e.target.className == "narrow"){
                if(scalRate >= 0.9){
                    scalRate+= -0.1;
                    _this.state.roomScene.clear();
                    _this.createDrop(roomDatas);
                    _this.createRoomBg(roomDatas);
                    _this.initRackDatas(roomDatas);
                }
            }
            if(e.target.className == "reset"){
                scalRate = 1;
                _this.state.roomScene.clear();
                _this.createDrop(roomDatas);
                _this.createRoomBg(roomDatas);
                _this.initRackDatas(roomDatas);
            }
        }
    }

    /**
     * 悬浮弹窗事件
     * @param
    */
    showDeviceDetail(id,evt){
        rackDatas.map((item,index) =>{
            if(id == item.devicePrimkey){
                let startX = flagSx + (item.deviceColumn - 1) * colGap;
                let startY = flagSy + (item.deviceRow - 1) * rowGap;
                let endX = flagSx + item.deviceColumn * colGap;
                let endY = flagSy + item.deviceRow * rowGap;
                if((evt.layerX > startX) && (evt.layerX < endX) &&
                    (evt.layerY > startY) && (evt.layerY < endY)){
                    if(evt.layerX > this.state.w * (2/3) && evt.layerY > this.state.h * (2/3)){
                        this.setState({
                            displayState:'block',
                            topLocation:evt.layerY - 200,
                            leftLocation:evt.layerX - 550
                        })
                    }else if(evt.layerX > this.state.w * (2/3) && evt.layerY < this.state.h * (2/3)){
                        this.setState({
                            displayState:'block',
                            topLocation:evt.layerY,
                            leftLocation:evt.layerX - 550
                        })
                    }else if(evt.layerX < this.state.w * (2/3) && evt.layerY > this.state.h * (2/3)){
                        this.setState({
                            displayState:'block',
                            topLocation:evt.layerY - 250,
                            leftLocation:evt.layerX + 70
                        })
                    }else if(evt.layerX < this.state.w * (2/3) && evt.layerY < this.state.h * (2/3)){
                        this.setState({
                            displayState:'block',
                            topLocation:evt.layerY,
                            leftLocation:evt.layerX + 30
                        })
                    }else{
                       this.setState({
                            displayState:'block',
                            topLocation:evt.layerY,
                            leftLocation:evt.layerX + 70
                        })
                    }
                const otherU = item.deviceNum - item.deviceOccuPyU;
                this.refs.deviceDatas.innerHTML = '<p>机柜名称:'+rowColumn.rowStartData + "/" +item.deviceName
                                                +'<br/>机柜使用U数:'+item.deviceOccuPyU
                                                +'<br/>机柜剩余U数:'+otherU
                                                +'<br/>机柜总共U数:'+item.deviceNum
                                                +'<br/>告警设备数量:'+item.warmNumber
                                                +item.resDatas
                                                +'</p>';
                }else{
                    this.setState({
                        displayState:'none'
                    })
                }
            }
        });
    }

    /**
     * 隐藏弹窗事件
     * @param
    */
    hideDeviceDetail(){
        this.setState({
            displayState:'none'
        })
    }

    resizeCanvas() {}

    render() {
        const myStyle = {
            display:this.state.displayState,
            top:this.state.topLocation,
            left:this.state.leftLocation,
            border:'1px solid black',
            borderRadius:"10px",
            minWidth:'400px',
            minHeight:'100px',
            position:'absolute',
            // boxShadow:'4px 2px 1px',
            // backgroundColor:'#FFFFF8',
            // padding:'5px 10px',
            backgroundColor:"rgba(0,0,0,0.7)",
            lineHeight:'20px',
            color:"#fff",
            fontFamily:"楷体"
        }

        return (
            //React典型的数据流中，props 传递是父子组件交互的唯一方式
            //React提供的这个 ref 属性， 表示为对组件真正实例的引用，其实就是 ReactDOM.render()返回的组件实例 ；
            //需要区分一下， ReactDOM.render() 渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点

            <div id="warp">
                <Menu content1="监控" content2="机房视图" content22="/room"/>
                <div id="main-right">
                    <div id="room" style={{width:this.state.w,height:this.state.h}} ref={(component) => {
                        this.roomtopoParent = component;
                    }}>
                        <div className="top-cl">
                            <div className="brief-box">
                                <div className="brief-content">
                                    <ul className="room-list1">
                                        <li>数据中心:{dataCenterName}</li>
                                        <li>机房名称:{roomName}</li>
                                        <li>机房机柜数量:{cabinetNumber}</li>
                                        <li>机房总共U数:{roomU}</li>
                                        <li>机房使用U数:{roomOccupyU}</li>
                                        <li>机房剩余U数:{roomOtherU}</li>
                                    </ul>
                                </div>
                                <span className="brief-name">机房简介</span>
                            </div>
                            <div className="change-box">
                                <div className="change-content">
                                    <p className="room-data-name">数据中心</p>
                                    <ul className="room-list2" ref="test">
                                    </ul>
                                </div>
                                <span className="change-name">机房切换</span>
                            </div>
                        </div>

                        <Row>
                            <Col span={12}>
                                <div id="scale" style={{width: '100%', height: '100%'}}>
                                    <canvas className="topo" style={{position: 'absolute'}} width={this.state.w} height={this.state.h}
                                            ref={(component) => {
                                                this.roomcanvas = component;
                                            }}>
                                    </canvas>
                                    <canvas className="topo" style={{position: 'absolute'}} width={this.state.w} height={this.state.h}
                                            ref={(component) => {
                                                this.roomNodeCanvas = component;
                                            }}>
                                    </canvas>
                                    <div className="test" ref="deviceDatas" style={myStyle}>
                                    </div>
                                    {/*<img className="bigger" src="../../assets/images/room/amplification.png" width={20} height={20} style={{left:8,top:10,position:"absolute",zIndex:50}}></img>
                                                                        <img className="narrow" src="../../assets/images/room/narrow.png" width={20} height={20} style={{left:8,top:35,position:"absolute",zIndex:50}}></img>
                                                                        <img className="reset" src="../../assets/images/room/reset.png" width={20} height={20} style={{left:8,top:60,position:"absolute",zIndex:50}}></img>*/}
                                </div>
                            </Col>
                            <Col span={12}>
                                <canvas className="topo" width={0} height={0} ref={(component) => {
                                    this.rackcanvas = component;
                                }}>
                                </canvas>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>


        );
    }
}
