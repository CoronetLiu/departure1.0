/*
* Author: CoronetLiu   2018/2/5
*/

// 'use strict';

import Menu from "../menu/Menu.js";
import './Shoot.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


//全局画笔
let ctx = {};
//全局jcrop对象
let jcrop_api = {};

//类型匹配
let base64 = "";

let typeDisk = [];
let typePower = [];
let typeFan = [];
let typeNetcard = [];
let typeFilling = [];

//撤销
let ls = [];

let imageURL = './assets';
let serverURL = '/serverURL';


class Combine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObj:{}, //当前所要画的图片
            x:0,           //记录所画图片的位置X
            y:0,           //记录所画图片的位置X
            height:0,      //显示截图区域高
            width:0,       //显示截图区域宽
            base64:"",
            shootVal:"",
            typeVal:"",
            factoryVal:"",
            frontVal:""
        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="接入" content2="截图工具" content22="/shoot"/>
                <div id="main-right">
                    <div id="shoot">
                        <div id="data-box-c">
                            <label id="lab-factory">厂商
                            <div id="factory-container"><select name="" id="factory" onChange={this.factoryChange.bind(this)}>
                                {/*<option value="">请选择厂家</option>
                                <option value="LENOVO">LENOVO</option>*/}
                            </select></div></label>
                            <label id="lab-type">型号
                            <div id="type-container"><select name="" id="type" onChange={this.typeChange.bind(this)}>
                                <option value="">请选择型号</option>
                                    {/*<option value="ThinkServer RQ940">ThinkServer RQ940</option>
                                    <option value="System x3650 M4">System x3650 M4</option>
                                    <option value="System x3650 M5">System x3650 M5</option>
                                    <option value="System x3750 M4">System x3750 M4</option>
                                    <option value="VNX5600">VNX5600</option>
                                    <option value="WSC6509E">WSC6509E</option>*/}
                            </select></div></label>
                            <label id="lab-front">面板<select name="" id="front" onChange={this.frontChange.bind(this)}>
                                <option value="">前</option>
                                <option value="_opposite">后</option>
                            </select></label>

                            <label id="lab-x">X:<input type="text" className="data-c x" disabled value={this.state.x}/></label>
                            <label  id="lab-y">Y:<input type="text" className="data-c y" disabled value={this.state.y}/></label>
                            <button type="" id="confirm-c" onClick={this.confirm.bind(this)}>确定画图</button>
                            <button type="" id="back-c" onClick={this.back.bind(this)}>撤销</button>
                            <button type="" id="clear-c" onClick={this.clear.bind(this)}>清空画板</button>
                            <a id="save-c">保存结果</a>
                        </div>
                        <div id="top-c">
                            <canvas id="myCanvas-c" width="600"></canvas>
                            <div id="container-c"></div>
                            <div id="box-c">
                                {/*<img src='../../assets/images/example.png' alt="" id="target-c"/>*/}
                            </div>
                            <div id="data-inner-box-c">
                                <div id="showWH">
                                    <label>宽：<span>{this.state.width}</span></label>
                                    <label>高：<span>{this.state.height}</span></label>
                                </div>
                                <div>
                                    <select name="" id="shoot-type" onChange={this.shootChange.bind(this)}>
                                        <option value="">请选择截图类型</option>
                                    </select>
                                    <input id="btn-c" type="button" value="确认截图"/>
                                </div>
                            </div>
                            {/*<canvas id="myCanvas-cc"></canvas>*/}
                            <canvas id="myCanvas-none"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    //获取厂商数据
    loadData(){
        $.ajax(serverURL + "/cabinetview/factoryAll").then(function(res){
            // console.log(res)
            let ress = JSON.parse(res);
            let str = '<option value="">请选择厂家</option>';
            ress.map((item)=>{
                str += `<option value="${item.FACTORY}">${item.FACTORY}</option>`
            });
            $("#factory").html(str)
        },function(){
            alert("获取厂商数据失败！")
        })
    }

    //选择截图类型
    shootChange(e){
        this.setState({
            shootVal:e.target.value
        })
    }

    //选择厂家
    factoryChange(e){
        this.setState({
            factoryVal:e.target.value
        });

        $.ajax(serverURL + "/cabinetview/factoryByPid",{
            data:{factory:e.target.value}
        }).then(function(res){
            // console.log(res)
            let ress = JSON.parse(res);
            let str = '<option value="">请选择型号</option>';
            ress.map((item)=>{
                str += `<option value="${item.TYPE}">${item.TYPE}</option>`
            });
            $("#type").html(str)
        },function(){
            alert("获取型号失败！")
        });

        if(e.target.value == "H3C" || e.target.value == "CISCO"){
            $("#shoot-type").html(`
                    <option value="">请选择截图类型</option>
                    <option value="SWITCHFAN">SWITCHFAN</option>
                    <option value="DISK">DISK</option>
                    <option value="SWITCHPORT">SWITCHPORT</option>
                    <option value="SWITCHPOWERS">SWITCHPOWERS</option>
                    <option value="FILLING">FILLING</option>
                `)
        }else if(e.target.value == "EMC"){
            $("#shoot-type").html(`
                    <option value="">请选择截图类型</option>
                    <option value="EMCFAN">EMCFAN</option>
                    <option value="EMCDRIVE">EMCDRIVE</option>
                    <option value="SWITCHPORT">SWITCHPORT</option>
                    <option value="EMCPOWERSUPPLY">EMCPOWERSUPPLY</option>
                    <option value="FILLING">FILLING</option>
                `)
        }else{
            $("#shoot-type").html(`
                    <option value="">请选择截图类型</option>
                    <option value="FAN">FAN</option>
                    <option value="DISK">DISK</option>
                    <option value="NETCARD">NETCARD</option>
                    <option value="POWERSUPPLY">POWERSUPPLY</option>
                    <option value="FILLING">FILLING</option>
                `)
        }

        //还原各个属性
        $("#box-c")[0].innerHTML = '<canvas id="myCanvas-cc"></canvas>';
        $("#container-c")[0].innerHTML = "";
        let c=document.getElementById("myCanvas-c");
        let ct=c.getContext("2d");
        ct.clearRect(0,0,c.width,c.height);
        $("#myCanvas-cc").css({
            display:"none"
        });
        $("#data-inner-box-c").css({
            display:"none"
        });
        if($("#moveDiv")){
            $("#moveDiv").remove()
        }
        //清空数组
        typeDisk = [];
        typePower = [];
        typeFan = [];
        typeNetcard = [];
        typeFilling = [];

    }

    //选择型号
    typeChange(e){
        //还原各个属性
        $("#box-c")[0].innerHTML = '<canvas id="myCanvas-cc"></canvas>';
        $("#container-c")[0].innerHTML = "";
        let c=document.getElementById("myCanvas-c");
        let ct=c.getContext("2d");
        ct.clearRect(0,0,c.width,c.height);
        $("#myCanvas-cc").css({
            display:"none"
        });
        $("#data-inner-box-c").css({
            display:"none"
        });
        if($("#moveDiv")){
            $("#moveDiv").remove()
        }
        //清空数组
        typeDisk = [];
        typePower = [];
        typeFan = [];
        typeNetcard = [];
        typeFilling = [];

        //重新切换新图片
        let targetC = new Image();
        targetC.src = imageURL+'/device/'+e.target.value+'/'+e.target.value+this.state.frontVal+'.png';
        targetC.id = "target-c";
        $("#box-c").append(targetC);

        let oldStateVal = this.state.typeVal;
        let newStateVal = e.target.value;

        this.setState({
            typeVal:e.target.value
        });

        newStateVal = (newStateVal == oldStateVal) ? 0 : 1;

        this.screenShoot(newStateVal,ct)

    }

    //选择面板
    frontChange(e){
        //还原各个属性
        $("#box-c")[0].innerHTML = '<canvas id="myCanvas-cc"></canvas>';
        $("#container-c")[0].innerHTML = "";
        let c=document.getElementById("myCanvas-c");
        let ct=c.getContext("2d");
        ct.clearRect(0,0,c.width,c.height);
        $("#myCanvas-cc").css({
            display:"none"
        });
        $("#data-inner-box-c").css({
            display:"none"
        });
        if($("#moveDiv")){
            $("#moveDiv").remove()
        }
        //清空数组
        typeDisk = [];
        typePower = [];
        typeFan = [];
        typeNetcard = [];
        typeFilling = [];

        //重新切换新图片
        let targetC = new Image();
        targetC.src = imageURL+'/device/'+this.state.typeVal+'/'+this.state.typeVal+e.target.value+'.png';
        targetC.id = "target-c";
        $("#box-c").append(targetC);

        let oldStateVal = this.state.frontVal;
        let newStateVal = e.target.value;

        this.setState({
            frontVal:e.target.value
        });

        newStateVal = (newStateVal == oldStateVal) ? 0 : 1;

        this.screenShoot(newStateVal,ct)

    }

    //截图功能
    screenShoot(newStateVal,ct){
        let _this = this;
        $('#target-c').Jcrop({
          onSelect: updatePreview,
          onChange: updatePreview,
          onRelease:release
        },function(){
          jcrop_api = this;
        });
        function updatePreview(c){
            let canvasHh = $(".jcrop-holder").height();
            let canvasWw = $(".jcrop-holder").width();
            if(newStateVal){
                newStateVal = 0;//防止再次进入
                //重新布局myCanvas-c
                $("#myCanvas-c")[0].width = canvasWw;
                $("#myCanvas-c")[0].height = canvasHh;
                ct.strokeRect(0,0,canvasWw,canvasHh);
                //布局完成

                $("#myCanvas-cc").css({
                    left:canvasWw + 20 + 2,
                    top:canvasHh + 10
                })
            }
            //二倍图显示
            $("#myCanvas-cc").css({
                display:"block"
            });

            let canvasH = $(".jcrop-holder").children('div').height();
            let canvasW = $(".jcrop-holder").children('div').width();
            //扩大两倍的canvas
            $("#myCanvas-cc")[0].width = canvasW * 2;
            $("#myCanvas-cc")[0].height = canvasH * 2;
            //隐藏的canvas
            $("#myCanvas-none")[0].width = canvasW;
            $("#myCanvas-none")[0].height = canvasH;

            let canvasStartX = - $(".jcrop-holder").children('div')[0].offsetLeft;
            let canvasStartY = - $(".jcrop-holder").children('div')[0].offsetTop;

            //数据显示
            let dataPositionX = -canvasStartX+canvasW+20;
            let dataPositionY = -canvasStartY+canvasH+canvasHh+10;
            $("#data-inner-box-c").css({
                display:"block",
                left:dataPositionX,
                top:dataPositionY
            });

            let canvasSrc = $(".jcrop-holder").children('img')[0].src;

            //扩大两倍的canvas
            let ctx = $("#myCanvas-cc")[0].getContext("2d");
            let img = new Image();
            img.src = canvasSrc;
            ctx.scale(2,2);
            ctx.drawImage(img,canvasStartX,canvasStartY);

            //隐藏的canvas
            let ctx_none = $("#myCanvas-none")[0].getContext("2d");
            let img_none = new Image();
            img_none.src = canvasSrc;
            ctx_none.drawImage(img_none,canvasStartX,canvasStartY);

            base64 = $("#myCanvas-none")[0].toDataURL("image/png");
            // base64 = $("#myCanvas-cc")[0].toDataURL("image/png");

            _this.setState({
                width:canvasW,
                height:canvasH
            })
        }
        function release(c){
            $("#myCanvas-cc").css({
                display:"none"
            });

            $("#data-inner-box-c").css({
                display:"none"
            })
        }
    }

    //点击确认画图按钮事件
    confirm(){
        if($("#moveDiv")[0]){
            let img=new Image();
            img.src = this.state.currentObj.src;
            ctx.drawImage(img,this.state.x,this.state.y);

            //储存位置
            let _typeStr = this.state.currentObj.className;
            let typeStr = _typeStr.split(" ")[1];
            let obj = {};
            if(typeStr == "DISK" || typeStr == "DISK" || typeStr == "EMCDRIVE"){
                obj = {
                        "type":typeStr,
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width,
                        "src":this.state.currentObj.src
                    };
                    typeDisk.push(obj);
                    ls.push(obj);
            }
            if(typeStr == "POWERSUPPLY" || typeStr == "SWITCHPOWERS" || typeStr == "EMCPOWERSUPPLY"){
                obj = {
                        "type":typeStr,
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width,
                        "src":this.state.currentObj.src
                    };
                    typePower.push(obj);
                    ls.push(obj);
            }
            if(typeStr == "FAN" || typeStr == "SWITCHFAN" || typeStr == "EMCFAN"){
                obj = {
                        "type":typeStr,
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width,
                        "src":this.state.currentObj.src
                    };
                    typeFan.push(obj);
                    ls.push(obj);
            }
            if(typeStr == "NETCARD" || typeStr == "SWITCHPORT"){
                obj = {
                        "type":typeStr,
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width,
                        "src":this.state.currentObj.src
                    };
                    typeNetcard.push(obj);
                    ls.push(obj);
            }
            if(typeStr == "FILLING"){
                obj = {
                        "type":typeStr,
                        "x":this.state.x,
                        "y":this.state.y,
                        "height":this.state.currentObj.height,
                        "width":this.state.currentObj.width,
                        "src":this.state.currentObj.src
                    };
                    typeFilling.push(obj);
                    ls.push(obj);
            }
            // switch(typeStr){
            //     case "DISK":
            //         obj = {
            //             "type":"DISK",
            //             "x":this.state.x,
            //             "y":this.state.y,
            //             "height":this.state.currentObj.height,
            //             "width":this.state.currentObj.width,
            //             "src":this.state.currentObj.src
            //         }
            //         typeDisk.push(obj);
            //         ls.push(obj);
            //         break;
            //     case "POWERSUPPLY":
            //         obj = {
            //             "type":"POWERSUPPLY",
            //             "x":this.state.x,
            //             "y":this.state.y,
            //             "height":this.state.currentObj.height,
            //             "width":this.state.currentObj.width,
            //             "src":this.state.currentObj.src
            //         }
            //         typePower.push(obj);
            //         ls.push(obj);
            //         break;
            //     case "FAN":
            //         obj = {
            //             "type":"FAN",
            //             "x":this.state.x,
            //             "y":this.state.y,
            //             "height":this.state.currentObj.height,
            //             "width":this.state.currentObj.width,
            //             "src":this.state.currentObj.src
            //         }
            //         typeFan.push(obj);
            //         ls.push(obj);
            //         break;
            //     case "NETCARD":
            //         obj = {
            //             "type":"NETCARD",
            //             "x":this.state.x,
            //             "y":this.state.y,
            //             "height":this.state.currentObj.height,
            //             "width":this.state.currentObj.width,
            //             "src":this.state.currentObj.src
            //         }
            //         typeNetcard.push(obj);
            //         ls.push(obj);
            //         break;
            //     case "FILLING":
            //         obj = {
            //             "type":"FILLING",
            //             "x":this.state.x,
            //             "y":this.state.y,
            //             "height":this.state.currentObj.height,
            //             "width":this.state.currentObj.width,
            //             "src":this.state.currentObj.src
            //         }
            //         typeFilling.push(obj);
            //         ls.push(obj);
            //         break;
            //     default: alert("类型无法匹配！");
            // }
        }

        $("#moveDiv").remove()
    }

    //撤销
    back(){
        //清空canvas
        let c=document.getElementById("myCanvas-c");
        let ct=c.getContext("2d");
        ct.clearRect(0,0,c.width,c.height);
        ct.strokeRect(0,0,c.width,c.height);
        //重新画图
        let lsLast = ls[ls.length-1];
        typeDisk.map((item,index)=>{
            if(item != lsLast){
                let img=new Image();
                img.src = item.src;
                ctx.drawImage(img,item.x,item.y);
            }else{
                typeDisk.pop();
                ls.pop()
            }
        });
        typeFan.map((item,index)=>{
            if(item != lsLast){
                let img=new Image();
                img.src = item.src;
                ctx.drawImage(img,item.x,item.y);
            }else{
                typeFan.pop();
                ls.pop()
            }
        });
        typePower.map((item,index)=>{
            if(item != lsLast){
                let img=new Image();
                img.src = item.src;
                ctx.drawImage(img,item.x,item.y);
            }else{
                typePower.pop();
                ls.pop()
            }
        });
        typeNetcard.map((item,index)=>{
            if(item != lsLast){
                let img=new Image();
                img.src = item.src;
                ctx.drawImage(img,item.x,item.y);
            }else{
                typeNetcard.pop();
                ls.pop()
            }
        });
        typeFilling.map((item,index)=>{
            if(item != lsLast){
                let img=new Image();
                img.src = item.src;
                ctx.drawImage(img,item.x,item.y);
            }else{
                typeFilling.pop();
                ls.pop()
            }
        })
    }

    //清空画板
    clear(){
        //清空数组数据
        typeDisk = [];
        typePower = [];
        typeFilling = [];
        //清空canvas
        let c=document.getElementById("myCanvas-c");
        let ct=c.getContext("2d");
        ct.clearRect(0,0,c.width,c.height);
        ct.strokeRect(0,0,c.width,c.height);
    }

    componentDidMount(){
        let _this = this;
        this.loadData();
        ctx = $("#myCanvas-c")[0].getContext("2d");
        //拖动事件开始
        $("#warp").on("mousedown",".createImg",function(event){
            let e = event || window.event;
            e.preventDefault();
            //保存当前要画的图片对象
            _this.setState({
                currentObj : this
            });

            let offsetY = e.offsetY;
            let offsetX = e.offsetX;

            let x = e.clientX - e.offsetX;
            let y = e.clientY - e.offsetY;

            if(!$("#moveDiv").get(0)){
                // let oD = document.createElement("div")
                let oD = new Image();
                oD.src = this.src;
                oD.className = this.id;
                oD.id = "moveDiv";

                $(oD).css({
                    // background : 'url(' + this.src + ')',
                    height:this.height,
                    width:this.width,
                    position:"absolute",
                    left:x,
                    top:y
                });
                $("#warp")[0].appendChild(oD)
            }else{
                $("#moveDiv").get(0).src = _this.state.currentObj.src;
                $("#moveDiv").css({
                    // background : 'url(' + this.src + ')',
                    height:this.height,
                    width:this.width,
                    position:"absolute",
                    left:x,
                    top:y
                })
            }
            //拖动
            document.onmousemove = function(evt){
                let e = evt || window.event;

                let cHeight = e.clientY;
                let cWidth = e.clientX;

                let _left = parseInt(cWidth - offsetX);
                let _top = parseInt(cHeight - offsetY);

                _this.setState({
                    x:_left-20,
                    y:_top-50
                });
                $("#moveDiv").css({
                    top:_top,
                    left:_left
                })
            };
            //清除拖动效果
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        });

        //如果moveDiv存在   //事件委托
        $("#warp").on("mousedown","#moveDiv",function(event){
            // alert(1)
            let e = event || window.event;
            e.preventDefault();
            let offsetY = e.offsetY;
            let offsetX = e.offsetX;

            //拖动
            document.onmousemove = function(evt){
                let e = evt || window.event;

                let cHeight = e.clientY;
                let cWidth = e.clientX;

                let _left = parseInt(cWidth - offsetX);
                let _top = parseInt(cHeight - offsetY);

                _this.setState({
                    x:_left-20,
                    y:_top-50
                });

                $("#moveDiv").css({
                    top:_top,
                    left:_left
                })
            };
            //清除拖动效果
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        });

        //键盘事件  调整位置
        $(document).keydown(function(e){
            e.preventDefault();
            let xMod = _this.state.x;
            let yMod = _this.state.y;
            if($("#moveDiv").get(0)){
                if(e.keyCode == 37){  //左
                    _this.setState({
                        x:xMod - 1
                    });
                    $("#moveDiv").css({
                        left:xMod - 1+20 //与位置有关
                    })
                }
                if(e.keyCode == 39){  //右
                    _this.setState({
                        x:xMod + 1
                    });
                    $("#moveDiv").css({
                        left:xMod + 1+20 //与位置有关
                    })
                }
                if(e.keyCode == 38){  //上
                    _this.setState({
                        y:yMod - 1
                    });
                    $("#moveDiv").css({
                        top:yMod - 1+50 //与位置有关
                    })
                }
                if(e.keyCode == 40){  //下
                    _this.setState({
                        y:yMod + 1
                    });
                    $("#moveDiv").css({
                        top:yMod + 1+50 //与位置有关
                    })
                }
                //确认画图
                if(e.keyCode == 13){
                    _this.confirm()
                }
            }
        });

        //确认截图
        $("#btn-c").on("click",function(){
            // console.log(base64)
            // if(base64 === "" || base64 === "data:," || base64 === "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAxUlEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA1v9QAATX68/0AAAAASUVORK5CYII="){
            //     alert("请选择截图区域！")
            //     return ;
            // }else
            if(_this.state.shootVal == ""){
                alert("请选择截图类型！");
                return ;
            }

            let Img = '';

            Img = '<img src="'+base64+'" class="createImg '+_this.state.shootVal+'"/>';

            $("#container-c").append(Img);

            base64 = "";

            $("#myCanvas-cc").css({
                display:"none"
            });
            $("#data-inner-box-c").css({
                display:"none"
            })
        });

        //保存结果
        $("#save-c").on("click",function(e){
            if(typeDisk.length){
                for(let i = 0;i < typeDisk.length; i ++){
                    Ajax(typeDisk,i)
                }
            }
            if(typePower.length){
                for(let i = 0;i < typePower.length; i ++){
                    Ajax(typePower,i)
                }
            }
            if(typeFan.length){
                for(let i = 0;i < typeFan.length; i ++){
                    Ajax(typeFan,i)
                }
            }
            if(typeNetcard.length){
                for(let i = 0;i < typeNetcard.length; i ++){
                    Ajax(typeNetcard,i)
                }
            }
            if(typeFilling.length){
                for(let i = 0;i < typeFilling.length; i ++){
                    Ajax(typeFilling,i)
                }
            }

            //// 弹窗提示
            // var layerIndex = layer.open({
            //     title :'确认结果',
            //     type: 1,  //1 页面；2 frame
            //     move: false, //禁止拖动
            //     maxmin: true,   //允许最大化
            //     area:["500px","500px"],   //弹出层大小
            //     content: 'http://www.baidu.com',
            //     success: function(index, layero){  //回调函数
            //         let H1 = $("#h1")[0]
            //     },
            //     btn: ['确定'],  //按钮s
            //     yes: function(index, layero){  //第一个按钮的回调函数
            //         // alert("发送数据")
            //         if(typeDisk.length){
            //             for(let i = 0;i < typeDisk.length; i ++){
            //                 Ajax(typeDisk,i)
            //             }
            //         }
            //         if(typePower.length){
            //             for(let i = 0;i < typePower.length; i ++){
            //                 Ajax(typePower,i)
            //             }
            //         }
            //         if(typeFilling.length){
            //             for(let i = 0;i < typeFilling.length; i ++){
            //                 Ajax(typeFilling,i)
            //             }
            //         }
            //     },
            //     cancel: function(index, layero){
            //         if(confirm('确定要关闭么')){  //只有当点击confirm框的确定时，该层才会关闭
            //             layer.close(index)
            //         }
            //         return false;
            //     }
            // });
            ////
            return false;
        });

        //Ajax 请求函数
        function Ajax(arr,i){
            // //  用formData形式传递Blob对象
            let $picSrc = convertBase64UrlToBlob(arr[i].src,"png");
            let src = arr[i].src.split(',')[1];
            let picname = '';
            let imgname = '';
            let k = i + 1;
            if(_this.state.frontVal == "_opposite"){
                picname = _this.state.typeVal + "_" + arr[i].type + "_" + k + "_opposite.png";
                imgname = _this.state.typeVal + "_" + arr[i].type + "_" + k + "_opposite";
            }else{
                picname = _this.state.typeVal + "_" + arr[i].type + "_" + k + ".png";
                imgname = _this.state.typeVal + "_" + arr[i].type + "_" + k;
            }
            $.ajax({
                url:serverURL+"/cabinetview/filesUpload",
                type:"POST",  // 上传POST
                data:{
                        resId:"!@#$%^&*()_+=-",
                        resType:arr[i].type,  // 类型 //电源，风扇，硬盘
                        supplier:_this.state.factoryVal,  //厂家
                        typeId:_this.state.typeVal,  // 型号
                        picSrc:src,  // 图片src
                        picName:picname,  //图片名称
                        img:imgname,
                        x:arr[i].x,  //  图片坐标x
                        y:arr[i].y,  //  图片坐标y
                        height:arr[i].height,  //
                        width:arr[i].width,    //
                        front:_this.state.frontVal == "" ? 0 : 1  //前后面板   0 前   1 后
                    },
                success:function(res){
                },
                error:function(){
                    alert("上传失败！")
                }
            })
        }

        // ------- 将以base64的图片url数据转换为Blob ------
        function convertBase64UrlToBlob(urlData,fileType){
            //去掉url的头，并转换为byte
            let binary = window.atob(urlData.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            let array = new ArrayBuffer(binary.length);
            for (let i = 0; i < binary.length; i++) {
                array[i] = binary.charCodeAt(i);
            }
            return new Blob([new Uint8Array(array)], {type : fileType});
        }

    }//componentDidMount
}

export default Combine;
