/*
* Author: CoronetLiu   2018/4/11
*/

// 'use strict';
import Menu from "../menu/Menu.js"
import './Monitor.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            $rateObj:{},
            rateSingle:0 //修改单个采集频率需要
        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="监控" content2="设备监控" content22="/monitor" content3="按平台（所有平台）" ref="dimMenu"/>
                <div id="main-right">
                    <div id="monitor" ref="monitor">
                        <div className="btns">
                            <div>
                                <button className="layui-btn layui-btn-sm adddevice-monitor">添加设备</button>
                                <button className="layui-btn layui-btn-sm exportdevice-monitor">导出资源</button>
                            </div>
                            <div className="search-monitor">
                                查询条件：
                                <div className="search1-container">
                                    <input className="search1"  type="text" placeholder="设备类型" readOnly="readOnly"/>
                                    <ul className="search1-list">
                                        <li className="search1-li">服务器</li>
                                        <li className="search1-li">存储</li>
                                        <li className="search1-li">刀箱</li>
                                        <li className="search1-li">网络设备</li>
                                    </ul>
                                </div>
                                <div className="search2-container">
                                    <input className="search2"  type="text" placeholder="告警类型" readOnly="readOnly"/>
                                    <ul className="search2-list">
                                        <li className="search2-li">异常</li>
                                        <li className="search2-li">脱网</li>
                                    </ul>
                                </div>
                                <div className="search3-container">
                                    <input className="search3"  type="text" placeholder="任务状态" readOnly="readOnly"/>
                                    <ul className="search3-list">
                                        <li className="search3-li">启用</li>
                                        <li className="search3-li">暂停</li>
                                    </ul>
                                </div>
                                <input className="search4" type="text" placeholder="请输入关键字"/>
                                <button className="layui-btn layui-btn-sm search">查询</button>
                            </div>
                        </div>
                        <div className="btns">
                            <div className="change-dir">
                                <ul>
                                    <li className="plateform-dir">按平台
                                        <ul>
                                            <li className="listP" data-id="all">所有平台</li>
                                            {/*<li className="listP">云平台</li>
                                            <li className="listP">云资源1</li>
                                            <li className="listP">云资源2</li>*/}
                                        </ul>
                                    </li>
                                    <li className="position-dir">按位置
                                        <ul>
                                            <li className="listP" data-id="all">所有位置</li>
                                            {/*<li className="second-dir listP">国家电网
                                                <ul>
                                                    <li className="listP">辽阳机房</li>
                                                </ul>
                                            </li>
                                            <li className="second-dir listP">集团
                                                <ul>
                                                    <li className="listP">A-1</li>
                                                    <li className="listP">A-2</li>
                                                    <li className="listP">A-3</li>
                                                </ul>
                                            </li>
                                            <li className="second-dir listP">测试
                                                <ul>
                                                    <li className="listP">测试机房</li>
                                                </ul>
                                            </li>*/}
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="demoTable">
                                <button className="rate-btn">采集频率
                                    <span className="arrowA"></span>
                                    <ul className="rate-list" style={{display:"none"}}>
                                        <li className="rate-li">10</li>
                                        <li className="rate-li">20</li>
                                        <li className="rate-li">30</li>
                                        <li className="rate-li">40</li>
                                        <li className="rate-li">50</li>
                                        <li className="rate-li">60</li>
                                    </ul>
                                </button>
                                <button className="layui-btn layui-btn-sm allon">启用</button>
                                <button className="layui-btn layui-btn-sm alloff">暂停</button>
                                <button className="layui-btn layui-btn-sm layui-btn-danger alldelete">删除</button>
                            </div>
                        </div>
                        <div id="table-container"></div>
                        <span id="tips"></span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        this.loadDimension();
        this.load();

        //添加设备事件
        $("#monitor").on("click",".adddevice-monitor",function(event){
            hashHistory.push({
                pathname: '/join'
            });
        });

        //导出资源事件
        $("#monitor").on("click",".exportdevice-monitor",function(event){
            alert("导出资源")
        });

        //change-dir事件  修改显示维度
        $(".plateform-dir").on("click",function(evt){
           if(evt.target.className.indexOf("listP") != -1){
                let cont3 = "按平台（" + evt.target.innerHTML + "）";
                _this.refs.dimMenu.changeDimension(cont3)

                //渲染页面

            }
        });
        $(".position-dir").on("click",function(evt){
            if(evt.target.className.indexOf("listP") != -1){
                let cont3 = "按位置（";
                let sonTtext = '';
                let fatherText = '';
                let fathers = $(evt.target).parent().parent();
                for(let i = 0;i < fathers[0].childNodes.length;i ++){
                    if(fathers[0].childNodes[i].nodeType == 3){
                        fatherText = fathers[0].childNodes[i].nodeValue
                    }
                }
                for(let i = 0;i < $(evt.target)[0].childNodes.length;i ++){
                    if($(evt.target)[0].childNodes[i].nodeType == 3){
                        sonTtext = $(evt.target)[0].childNodes[i].nodeValue
                    }
                }
                if(fathers[0].className.indexOf("second-dir") != -1){
                    cont3 += fatherText + " / " + sonTtext + "）";
                }else{
                    cont3 += sonTtext + "）";
                }
                _this.refs.dimMenu.changeDimension(cont3)

                //渲染页面

            }
        });
        $(".plateform-dir").on("mouseover",function(){
            this.children[0].style.display = "block";
        });
        $(".plateform-dir").on("mouseout",function(){
            this.children[0].style.display = "none";
        });
        $(".position-dir").on("mouseover",function(){
            let that = this;
            this.children[0].style.display = "block";
            for(let i = 0 ; i < this.children[0].children.length;i ++){
                if(this.children[0].children[i].children[0]){
                    this.children[0].children[i].onmouseover = function(){
                        that.children[0].children[i].children[0].style.display = "block";
                    };
                    this.children[0].children[i].onmouseout = function(){
                        that.children[0].children[i].children[0].style.display = "none";
                    }
                }
            }
        });
        $(".position-dir").on("mouseout",function(){
            this.children[0].style.display = "none";
        });

        //采集频率按钮事件
        document.onclick = function(event){
            if(event.target.className == "rate-btn" || event.target.className == "arrowA"){
                if($(".rate-list")[0].style.display == "none"){
                    $(".rate-list")[0].style.display = "block"
                }else{
                    $(".rate-list")[0].style.display = "none"
                }
            }else if(event.target.className == "rate-li"){
                axios.get("./assets/datas/data.json",{
                    params:{
                        rate:Number(event.target.innerHTML)
                    }
                }).then(function(res){
                    //全部修改成功
                    // console.log(res.data)
                    _this.initialTable(res.data)
                },function(){
                    alert("修改全部采集频率时出错！")
                });
                event.target.parentNode.style.display = "none"
            }else{
                if($(".rate-btn")[0]){
                    $(".rate-btn")[0].children[1].style.display = "none"
                }
            }
        };

        //点击查询
        $("#monitor").on("click",".search",function(event){
            axios.get("./assets/datas/data1.json",{
                params:{
                    search1:$(".search1").val(),
                    search2:$(".search2").val(),
                    search3:$(".search3").val(),
                    search4:$(".search4").val()
                }
            }).then(function(res){
                // console.log(res.data)
                _this.initialTable(res.data)
            },function(){
                alert("查询失败！")
            })
        });

        //绑定查询事件
        $("#monitor").on("mouseover",".search1-container",function(event){
            $(".search1-list").css({
                display:"block"
            })
        });
        $("#monitor").on("mouseout",".search1-container",function(event){
            $(".search1-list").css({
                display:"none"
            })
        });
        $("#monitor").on("click",".search1-container .search1-li",function(event){
            $(".search1").val($(this).html());
            $(".search1-list").css({
                display:"none"
            })
        });
        $("#monitor").on("mouseover",".search2-container",function(event){
            $(".search2-list").css({
                display:"block"
            })
        });
        $("#monitor").on("mouseout",".search2-container",function(event){
            $(".search2-list").css({
                display:"none"
            })
        });
        $("#monitor").on("click",".search2-container .search2-li",function(event){
            $(".search2").val($(this).html());
            $(".search2-list").css({
                display:"none"
            })
        });
        $("#monitor").on("mouseover",".search3-container",function(event){
            $(".search3-list").css({
                display:"block"
            })
        });
        $("#monitor").on("mouseout",".search3-container",function(event){
            $(".search3-list").css({
                display:"none"
            })
        });
        $("#monitor").on("click",".search3-container .search3-li",function(event){
            $(".search3").val($(this).html());
            $(".search3-list").css({
                display:"none"
            })
        });
        //查询事件绑定结束

        //频率编辑事件
        $("#monitor").on("focus",".layui-table-edit",function(){
            _this.setState({
                rateSingle:this.value
            })

        });
        $("#monitor").on("change",".layui-table-edit",function(){
            let that = this;
            _this.setState({
                $rateObj:that.previousSibling
            });
            let testNum = Number(this.value);
            if(isNaN(testNum) || testNum != parseInt(testNum)){
                this.value = _this.state.rateSingle;
                layer.alert("采集频率须为整数！",{
                    icon:7,
                    skin: 'layui-layer-molv',
                    anim: 4,
                    btn:["确定"],
                    yes: function(index, layero){  //第一个按钮的回调函数
                        _this.state.$rateObj.innerHTML = _this.state.rateSingle;
                        layer.close(index)
                    }
                });
                return;
            }
            let index = $(this).parent().parent().attr("data-index");
            //在layui-table-main里面寻找与data-index对应的tr
            let maintr = $(".layui-table-main tr");
            for(var j = 0; j < maintr.length;j ++){
                if($(maintr[j]).attr("data-index") == index){
                    for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找manageIP
                        if($(maintr[j].children[k]).attr("data-field") == "manageIP"){
                            var manageIP = maintr[j].children[k].children[0].innerHTML
                        }
                    }
                }
            }
            that.value = parseInt(that.value);
            axios.get("./assets/datas/data2.json",{
                params:{
                    manageIP:manageIP,
                    rate:that.value
                }
            }).then(function(res){
                // 修改成功
                layer.alert("修改成功！",{
                    icon:6,
                    skin: 'layui-layer-molv',
                    anim: 4,
                    move:false,
                    btn:["确定"],
                    yes: function(index, layero){  //第一个按钮的回调函数
                        _this.state.$rateObj.innerHTML = that.value;
                        layer.close(index)
                    }
                });
            },function(){
                console.log("修改失败！")
            });
        });

        //单个启用暂停事件
        $("#monitor").on("click",".layui-form-switch",function(event){
            let that = this;
            let index = $(this).parent().parent().parent().attr("data-index");
            //在layui-table-main里面寻找与data-index对应的tr
            let maintr = $(".layui-table-main tr");
            for(var j = 0; j < maintr.length;j ++){
                if($(maintr[j]).attr("data-index") == index){
                    for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找manageIP
                        if($(maintr[j].children[k]).attr("data-field") == "manageIP"){
                            var manageIP = maintr[j].children[k].children[0].innerHTML
                        }
                    }
                }
            }
            if(this.className.indexOf("layui-form-onswitch") == -1){ //要暂停
                // alert("要暂停")
                this.children[0].innerHTML = "启用";
                $(this).addClass("layui-form-onswitch");
                this.previousSibling.checked = true;
                layer.confirm('真的要暂停吗？',{
                    move:false,
                    icon:7,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                    axios.get("./assets/datas/data2.json",{
                        params:{
                            manageIP:manageIP,
                            state:0
                        }
                    }).then(function(res){
                        // //暂停成功
                        // that.children[0].innerHTML = "暂停"
                        // $(that).removeClass("layui-form-onswitch")
                        // that.previousSibling.checked = false;
                        _this.initialTable(res.data)
                    },function(){
                        alert("暂停失败！")
                    });
                    layer.close(index);
                })
            }else{ //要启用
                // alert("要启用")
                this.children[0].innerHTML = "暂停";
                $(this).removeClass("layui-form-onswitch");
                this.previousSibling.checked = false;
                layer.confirm('真的要启用吗？',{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                    axios.get("./assets/datas/data1.json",{
                        params:{
                            manageIP:manageIP,
                            state:1
                        }
                    }).then(function(res){
                        // //启用成功
                        // that.children[0].innerHTML = "启用"
                        // $(that).addClass("layui-form-onswitch")
                        // that.previousSibling.checked = true;
                        _this.initialTable(res.data)
                    },function(){
                        alert("启用失败！")
                    });
                    layer.close(index);
                })
            }
        });

        //全部启用操作
        $("#monitor").on("click",".allon",function(event){
            let checkDatas = [];
            for(var i = 0;i < $(".layui-table-fixed .layui-form-checkbox").length;i ++){  // 循环所有的chekbox
                if($(".layui-table-fixed .layui-form-checkbox")[i].previousSibling.checked == true){  // 如果选中了
                    //获取选中父级的tr的data-index
                    let index = $($(".layui-table-fixed .layui-form-checkbox")[i]).parent().parent().parent().attr("data-index");
                    //在layui-table-main里面寻找与data-index对应的tr
                    let maintr = $(".layui-table-main tr");
                    for(var j = 0; j < maintr.length;j ++){
                        if($(maintr[j]).attr("data-index") == index){
                            for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找manageIP
                                if($(maintr[j].children[k]).attr("data-field") == "manageIP"){
                                    let manageIP = maintr[j].children[k].children[0].innerHTML;
                                    checkDatas.push(manageIP)
                                }
                            }
                        }
                    }
                }
            }
            if(!checkDatas.length){
                layer.alert("请至少选择一条数据！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            layer.confirm('真的启用选中的么？',{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                checkDatas.map((item)=>{
                    axios.get("./assets/datas/data1.json",{
                        params:{
                            manageIP:item,
                            state:1
                        }
                    }).then(function(res){
                        // console.log(res.data)
                        // //全部启用操作
                        // for(var i = 0; i < $(".layui-form-switch").length; i ++){
                        //     if($(".layui-form-switch")[i].previousSibling.value == res.data.id){
                        //         $(".layui-form-switch")[i].children[0].innerHTML = "启用"
                        //         $($(".layui-form-switch")[i]).removeClass("layui-form-onswitch")
                        //         $(".layui-form-switch")[i].previousSibling.checked = true;
                        //     }
                        // }
                        // //恢复操作
                        // for(var j = 0;j < $(".layui-form-checkbox").length;j ++){
                        //     $($(".layui-form-checkbox")[j]).removeClass('layui-form-checked')
                        //     $(".layui-form-checkbox")[j].previousSibling.checked = false;
                        // }
                        _this.initialTable(res.data)
                    },function(){
                        alert("全部启用时出错！")
                    })
                });
                layer.close(index);
            })
        });//全部启用事件结束

        //全部暂停操作
        $("#monitor").on("click",".alloff",function(event){
            let checkDatas = [];
            for(var i = 0;i < $(".layui-table-fixed .layui-form-checkbox").length;i ++){  // 循环所有的chekbox
                if($(".layui-table-fixed .layui-form-checkbox")[i].previousSibling.checked == true){  // 如果选中了
                    //获取选中父级的tr的data-index
                    let index = $($(".layui-table-fixed .layui-form-checkbox")[i]).parent().parent().parent().attr("data-index");
                    //在layui-table-main里面寻找与data-index对应的tr
                    let maintr = $(".layui-table-main tr");
                    for(var j = 0; j < maintr.length;j ++){
                        if($(maintr[j]).attr("data-index") == index){
                            for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找manageIP
                                if($(maintr[j].children[k]).attr("data-field") == "manageIP"){
                                    let manageIP = maintr[j].children[k].children[0].innerHTML;
                                    checkDatas.push(manageIP)
                                }
                            }
                        }
                    }
                }
            }
            if(!checkDatas.length){
                layer.alert("请至少选择一条数据！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            layer.confirm('真的暂停选中的么？',{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                checkDatas.map((item)=>{
                    axios.get("./assets/datas/data2.json",{
                        params:{
                            manageIP:item,
                            state:0
                        }
                    }).then(function(res){
                        // console.log(res.data)
                        // //全部暂停操作
                        // for(var i = 0; i < $(".layui-form-switch").length; i ++){
                        //     if($(".layui-form-switch")[i].previousSibling.value == res.data.id){
                        //         $(".layui-form-switch")[i].children[0].innerHTML = "暂停"
                        //         $($(".layui-form-switch")[i]).addClass("layui-form-onswitch")
                        //         $(".layui-form-switch")[i].previousSibling.checked = false;
                        //     }
                        // }
                        // //恢复操作
                        // for(var j = 0;j < $(".layui-form-checkbox").length;j ++){
                        //     $($(".layui-form-checkbox")[j]).removeClass('layui-form-checked')
                        //     $(".layui-form-checkbox")[j].previousSibling.checked = false;
                        // }
                        _this.initialTable(res.data)
                    },function(){
                        alert("全部暂停时出错！")
                    })
                });
                layer.close(index);
            })
        });//全部暂停事件结束

        //全部删除事件
        $("#monitor").on("click",".alldelete",function(event){
            let checkDatas = [];
            for(var i = 0;i < $(".layui-table-fixed .layui-form-checkbox").length;i ++){  // 循环所有的chekbox
                if($(".layui-table-fixed .layui-form-checkbox")[i].previousSibling.checked == true){  // 如果选中了
                    //获取选中父级的tr的data-index
                    let index = $($(".layui-table-fixed .layui-form-checkbox")[i]).parent().parent().parent().attr("data-index");
                    //在layui-table-main里面寻找与data-index对应的tr
                    let maintr = $(".layui-table-main tr");
                    for(var j = 0; j < maintr.length;j ++){
                        if($(maintr[j]).attr("data-index") == index){
                            for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找manageIP
                                if($(maintr[j].children[k]).attr("data-field") == "manageIP"){
                                    let manageIP = maintr[j].children[k].children[0].innerHTML;
                                    checkDatas.push(manageIP)
                                }
                            }
                        }
                    }
                }
            }
            // console.log(checkDatas)
            if(!checkDatas.length){
                layer.alert("请至少选择一条数据！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            layer.confirm('真的删除选中的么？',{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                checkDatas.map((item)=>{
                    axios.get("./assets/datas/data3.json",{
                        params:{
                            manageIP:item
                        }
                    }).then(function(res){
                        // console.log(res.data)
                        // //全部删除操作
                        // for(var i = 0;i < $("td").length;i ++){
                        //     if($($("td")[i]).attr("data-field") == "id"){
                        //         if($("td")[i].children[0].innerHTML == "10000"){
                        //             let index = $($("td")[i]).parent().attr("data-index")
                        //             //删除table-main
                        //             $($("td")[i]).parent().remove()
                        //             //删除table-l
                        //             let fixedltr = $(".layui-table-fixed-l").find("tr")
                        //             for(var j = 0;j < fixedltr.length;j ++){
                        //                 if($(fixedltr[j]).attr("data-index") == index){
                        //                     $(fixedltr[j]).remove()
                        //                 }
                        //             }
                        //             //删除table-r
                        //             let fixedrtr = $(".layui-table-fixed-r").find("tr")
                        //             for(var k = 0;k < fixedrtr.length;k ++){
                        //                 if($(fixedrtr[k]).attr("data-index") == index){
                        //                     $(fixedrtr[k]).remove()
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                        // //恢复操作
                        // for(var j = 0;j < $(".layui-form-checkbox").length;j ++){
                        //     $($(".layui-form-checkbox")[j]).removeClass('layui-form-checked')
                        //     $(".layui-form-checkbox")[j].previousSibling.checked = false;
                        // }
                        _this.initialTable(res.data)
                    },function(){
                        alert("全部删除时出错！")
                    })
                });
                layer.close(index);
            })
        });//全部删除事件结束

        //按钮信息显示
        $("#table-container").on("mouseover",".command",function(evt){
            $("#tips").html("命令行操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".command",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".desk",function(evt){
            $("#tips").html("远程桌面操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".desk",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".web",function(evt){
            $("#tips").html("WEB界面操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".web",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".on",function(evt){
            $("#tips").html("开机操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".on",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".off",function(evt){
            $("#tips").html("关机操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".off",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".restart",function(evt){
            $("#tips").html("重启操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".restart",function(evt){
            $("#tips").css({
                display:"none"
            })
        });
        $("#table-container").on("mouseover",".SSH",function(evt){
            $("#tips").html("SSH操作");
            $("#tips").css({
                display:"block",
                left:evt.clientX - 50,
                top:evt.clientY - 40 + 21
            });
            document.onmousemove = function(event){
                let e = event || window.event;
                $("#tips").css({
                    left:e.clientX - 50,
                    top:e.clientY - 40 + 21
                })
            }
        });
        $("#table-container").on("mouseout",".SSH",function(evt){
            $("#tips").css({
                display:"none"
            })
        })
        //按钮信息显示结束

    }//componentDidMount

    //加载维度信息
    loadDimension(){
        let _this = this;
        axios.get("./assets/datas/dimension.json").then(function(res){
            if(!res.data){
                return;
            }
            res.data.map((item,index) => {
                if(item.flag == "plateform"){
                    $(".plateform-dir")[0].children[0].innerHTML += `<li class="listP" data-id="${item.id}">${item.name}</li>`;
                }
                if(item.flag == "position"){
                    let ul = "";
                    if(item.rooms.length){
                        item.rooms.map((it,ind) => {
                            ul += `<li class="listP" data-id="${it.id}">${it.roomName}</li>`
                        });
                        ul = '<ul>' + ul + '</ul>'
                    }
                    $(".position-dir")[0].children[0].innerHTML +=
                        `<li class="second-dir listP" data-id="${item.id}">${item.name}${ul}</li>`
                }
            })
        },function(){
            console.log("获取维度信息失败")
        })
    }

    //初次渲染页面
    load(){
        let _this = this;
        axios.get("./assets/datas/data.json").then(function(res){
            $("#table-container").html(`
                    <table className="layui-hide" id="monitor-table" lay-filter="demo"></table>
                    <script type="text/html" id="barMonitor">
                        <input type="checkbox" name="state" value="{{d.manageIP}}" lay-skin="switch" lay-text="启用|暂停" lay-filter="stateDemo" {{ d.state == "1" ? 'checked' : '' }}>
                        <span class="span1">
                            {{# if(d.command == "on"){ }}
                            <a class="layui-btn operate-btn command" lay-event="command"></a>
                            {{# } }}
                            {{# if(d.desk == "on"){ }}
                            <a class="layui-btn operate-btn desk" lay-event="desk"></a>
                            {{# } }}
                            {{# if(d.web == "on"){ }}
                            <a class="layui-btn operate-btn web" lay-event="web"></a>
                            {{# } }}
                        </span>
                        <span class="span2">
                            {{# if(d.fast && d.fast.length){ }}
                                {{# for(var i = 0;i < d.fast.length;i ++){ }}
                                <a class="layui-btn operate-btn {{d.fast[i]}}" lay-event="{{d.fast[i]}}"></a>
                                {{# } }}
                            {{# } }}
                        </span>

                        <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="detail">详情</a>
                        <a class="layui-btn layui-btn-xs" lay-event="modify">修改</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    </script>
                    <script type="text/html" id="devicename">
                            <span style="display:block;padding-right:15px;background:url('./assets/images/lookup.png') no-repeat right center;">{{ d.name }}</span>
                    </script>
                    <script type="text/html" id="warnstate">
                        {{#  if(d.warnstate === '正常'){ }}
                            <span style="text-align:center;display:block;background:#43be57;color:#fff;">{{ d.warnstate }}</span>
                        {{#  } else { }}
                            <span style="text-align:center;display:block;background:#ff6d60;color:#fff;">{{ d.warnstate }}</span>
                        {{#  } }}
                    </script>
            `);
            _this.initialTable(res.data)
        },function(){
            alert("初始化失败！")
        }) //初次获取数据
    }//load

    // 初始化表格
    initialTable(data){
        let curPage = "";
        if($(".layui-laypage-curr")[0]){
            curPage = $(".layui-laypage-curr")[0].children[1].innerHTML
        }else{
            curPage = 1
        }
        layui.use('table', function(){
            var table = layui.table,form = layui.form;
            // //监听表格复选框选择
            // table.on('checkbox(demo)', function(obj){
            //     console.log("已选中："+obj)
            // });

            //展示数据
            table.render({
                elem: '#monitor-table',
                cols: [[ //标题栏
                    {type:'checkbox',fixed: 'left',width:40},
                    {field: 'name', title: '设备名称', minWidth: 153,sort:true,style:'cursor: pointer;', event: 'lookup',templet:"#devicename"},
                    {field: 'manageIP', title: '管理IP', minWidth: 140,sort:true},
                    {field: 'type', title: '型号', minWidth: 160,sort:true},
                    {field: 'temperature', title: '状态', width: 80, sort: true,templet: '#warnstate'},
                    {field: 'rate', title: '采集频率(分钟)', width: 130, edit: 'text',style:'text-align: center;'},
                    {field: 'operate', title: '操作',fixed: 'right', width:460, align:'center', toolbar: '#barMonitor'}
                ]],
                data: data,
                // skin: 'line',//表格风格
                even: true,
                page: true, //是否显示分页
                limits: [1,5,10,20,50],
                limit: 10 //每页默认显示的数量
            });

            //监听频率编辑
            // table.on('edit(demo)', function(obj){
            //     var value = obj.value; //得到修改后的值
            //     // data = obj.data, //得到所在行所有键值
            //     // field = obj.field; //得到字段
            //     // layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
            //     axios.get("./assets/datas/data1.json",{
            //         params:{
            //             rate:Number(value)
            //         }
            //     }).then(function(res){
            //         // console.log(res.data)
            //     },function(){
            //         alert("发送修改频率请求失败！")
            //     })
            // });

            //监听工具条
            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'detail'){
                    // layer.msg('ID：'+ data.id + ' 的详情操作');
                    hashHistory.push({
                        pathname: '/monitordetail',
                        query: {
                            manageIP: obj.data.manageIP,
                        }
                    });
                } else if(obj.event === 'del'){
                    layer.confirm('真的删除么？',{
                        icon:7,
                        move:false,
                        skin: 'layui-layer-molv',
                        anim: 4
                    }, function(index){
                        // obj.del();
                        axios.get("./assets/datas/data3.json",{
                            params:{
                                manageIP:obj.data.manageIP
                            }
                        }).then(function(res){
                            // console.log(res.data)
                            let delCurPage = $(".layui-laypage-curr")[0].children[1].innerHTML;
                            table.render({
                                elem: '#monitor-table',
                                cols: [[ //标题栏
                                    {type:'checkbox',fixed: 'left',width:40},
                                    {field: 'name', title: '设备名称', minWidth: 153,sort:true,style:'cursor: pointer;', event: 'lookup',templet:"#devicename"},
                                    {field: 'manageIP', title: '管理IP', minWidth: 140,sort:true},
                                    {field: 'type', title: '型号', minWidth: 160,sort:true},
                                    {field: 'temperature', title: '状态', width: 80, sort: true,templet: '#warnstate'},
                                    {field: 'rate', title: '采集频率(分钟)', width: 130, edit: 'text',style:'text-align: center;'},
                                    {field: 'operate', title: '操作',fixed: 'right', width:460, align:'center', toolbar: '#barMonitor'}
                                ]],
                                data: res.data,
                                // skin: 'line',//表格风格
                                even: true,
                                page: true, //是否显示分页
                                limits: [1,5,10,20,50],
                                limit: 10 //每页默认显示的数量
                            });
                            $(".layui-laypage-skip")[0].children[0].value = delCurPage;
                            $(".layui-laypage-btn").click();
                        },function(){
                            alert("删除失败！")
                        });
                        layer.close(index);
                    });
                } else if(obj.event === 'modify'){
                    // layer.alert('编辑行：<br>'+ JSON.stringify(data))
                    hashHistory.push({
                        pathname: '/monitormodify',
                        query: {
                            manageIP: obj.data.manageIP,
                        }
                    });
                } else if(obj.event === 'command'){
                    // layer.msg('ID：'+ data.id + ' 的命令行操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的命令行操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            console.log($(".confirm-username").val());
                            console.log($(".confirm-password").val());
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'desk'){
                    // layer.msg('ID：'+ data.id + ' 的远程桌面操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的远程桌面操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'web'){
                    // layer.msg('ID：'+ data.id + ' 的WEB界面操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的WEB界面操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'on'){
                    // layer.msg('ID：'+ data.id + ' 的开机操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的开机操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'off'){
                    // layer.msg('ID：'+ data.id + ' 的关机操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的关机操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'restart'){
                    // layer.msg('ID：'+ data.id + ' 的重启操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的重启操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'SSH'){
                    // layer.msg('ID：'+ data.id + ' 的SSH操作');
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:50px;margin-top:5px;">
                        <span class="nece"></span>用户名
                        <input class="confirm-username" type="text" placeholder="请输入用户名" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;padding-left:64px;">
                        <span class="nece"></span>密码
                        <input class="confirm-password" type="password" placeholder="请输入密码" style="margin-left:5px;height:25px;"/></label>`;
                    var layerIndex = layer.open({
                        title :data.manageIP + ' 的SSH操作',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","200px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            layer.close(index)
                        }
                    });
                } else if(obj.event === 'lookup'){
                    // layer.msg('ID：'+ data.id + ' 的查看操作');
                    axios.get("./assets/datas/data.json",{
                        params:{
                                manageIP:obj.data.manageIP
                            }
                    }).then(function(res){
                        // console.log(res.data)
                        let str = `
                            <table frame="hsides" border="1" class="roughly" style="text-align:center;width:100%;">
                                <thead style="background:#cfe6fd;linear-gradient(to top, #cfe6fd, #cfe6fd);color:#666;">
                                    <th height="30">采集时间</th>
                                    <th>CPU</th>
                                    <th>内存</th>
                                    <th>硬盘</th>
                                    <th>电源</th>
                                    <th>风扇</th>
                                    <th>网卡</th>
                                    <th>温度</th>
                                    <th>电池</th>
                                </thead>
                                <tbody>
                                    <tr height="40">
                                        <td>${res.data[0].time}</td>
                                        <td>${res.data[0].CPU}</td>
                                        <td>${res.data[0].memory}</td>
                                        <td>${res.data[0].disk}</td>
                                        <td>${res.data[0].power}</td>
                                        <td>${res.data[0].fan}</td>
                                        <td>${res.data[0].netcard}</td>
                                        <td>${res.data[0].tem}</td>
                                        <td>${res.data[0].powerSupply}</td>
                                    </tr>
                                </tbody>
                            </table>

                        `;

                        var layerIndex = layer.open({
                            title :data.manageIP + ' 的简要信息',
                            type: 1,  //1 页面；2 frame
                            move: false, //禁止拖动
                            maxmin: false,   //允许最大化
                            closeBtn: false, //右上角的关闭按钮
                            area:["700px","114px"],   //弹出层大小
                            shade: 0.2,
                            shadeClose: true,
                            skin: 'layui-layer-lan',
                            anim: 3,
                            content: str
                        });

                    },function(){
                        alert("获取简要信息失败！")
                    })
                }
            });
        }); // use table
        if($(".layui-laypage-skip")[0]){
            $(".layui-laypage-skip")[0].children[0].value = curPage;
            $(".layui-laypage-btn").click();
        }
    }//initialTable
}

export default Monitor;