/*
* @Author:  CoronetLiu
* @Date:    2018-04-03 17:28:26
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-05-03 16:47:34
* @Email:   liu86931@163.com
*/

// 'use strict';
import './Menu.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuWidth:"short",
            content1:props.content1 || "",
            content2:props.content2 || "",
            content22:props.content22 || "",
            content3:props.content3 || ""
        }
    }

    //提供修改显示维度方法
    changeDimension(cont3){
        this.setState({
            content3:cont3
        })
    }

    componentWillMount(){
        //判断登录状态
        if(!$.cookie("ObmUser")){
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.alert("您尚未登录！", {
                    icon: 7,
                    skin: 'layui-layer-molv',
                    anim: 4,
                    area:['300px','180px'],
                    move:false,
                    shade:[1,"#fff"],
                    closeBtn:false,
                    success:function(){
                        $(".layui-layer-content").css({
                            height:"50px"
                        });
                    },
                    btn: ["登录"],
                    yes: function (index, layero) {  //第一个按钮的回调函数
                        hashHistory.push({
                            pathname: '/login'
                        });
                        layer.close(index)
                    }
                });
            })
        }
    } //componentWillMount

    render() {
        // console.log("render")
        return (
            <div id="menu" className="menu" ref="menu">
                <div id="menu-title"></div>
                <ul id="menu-list" ref="menu_list">
                    <li><Link to="/login">概览</Link>
                        <span className="nav-bar"></span>
                    </li>
                    <li><a className="spread">接入</a>
                        <span className="arrow"></span>
                        <ul>
                            <li><Link to="/join" className="jump">一键接入</Link></li>
                            <li><Link to="/shoot" className="jump">截图工具</Link></li>
                        </ul>
                        <span className="nav-bar"></span>
                    </li>
                    <li><a className="spread">监控</a>
                        <span className="arrow"></span>
                        <ul>
                            <li><Link to="/monitor" className="jump">设备监控</Link></li>
                            <li><Link to="/room" className="jump">机房视图</Link></li>
                        </ul>
                        <span className="nav-bar"></span>
                    </li>
                    <li><Link to="/warn">告警</Link>
                        <span className="nav-bar"></span>
                        <i className="warn-bar">2</i>
                    </li>
                    <li><a className="spread">统计</a>
                        <span className="arrow"></span>
                        <ul>
                            <li><a className="spread">资产统计</a>
                                <span className="arrow"></span>
                                <ul>
                                    <li><Link to="/home" className="jump">按平台</Link></li>
                                    <li><Link to="/home" className="jump">按位置</Link></li>
                                </ul>
                            </li>
                            <li><a className="spread">空间统计</a>
                                <span className="arrow"></span>
                                <ul>
                                    <li><Link to="/home" className="jump">按平台</Link></li>
                                    <li><Link to="/home" className="jump">按位置</Link></li>
                                </ul>
                            </li>
                            <li><a className="spread">温度统计</a>
                                <span className="arrow"></span>
                                <ul>
                                    <li><Link to="/home" className="jump">按平台</Link></li>
                                    <li><Link to="/home" className="jump">按位置</Link></li>
                                </ul>
                            </li>
                            <li><a className="spread">功率统计</a>
                                <span className="arrow"></span>
                                <ul>
                                    <li><Link to="/home" className="jump">按平台</Link></li>
                                    <li><Link to="/home" className="jump">按位置</Link></li>
                                </ul>
                            </li>
                            <li><a className="spread">故障统计</a>
                                <span className="arrow"></span>
                                <ul>
                                    <li><Link to="/home" className="jump">当前故障</Link></li>
                                    <li><Link to="/home" className="jump">历史故障</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/join" className="jump">日志</Link></li>
                        </ul>
                        <span className="nav-bar"></span>
                    </li>
                    <li><a className="spread">配置</a>
                        <span className="arrow"></span>
                        <ul>
                            <li><Link to="/home" className="jump">资源管理</Link></li>
                            <li><Link to="/dimension" className="jump">维度管理</Link></li>
                            <li><Link to="/home" className="jump">邮件配置</Link></li>
                            <li><Link to="/home" className="jump">设备许可</Link></li>
                            <li><Link to="/home" className="jump">数据存储</Link></li>
                        </ul>
                        <span className="nav-bar"></span>
                    </li>
                    <li><a className="spread">帮助</a>
                        <span className="arrow"></span>
                        <ul>
                            <li><Link to="/home" className="jump">系统介绍</Link></li>
                            <li><Link to="/home" className="jump">添加设备</Link></li>
                            <li><Link to="/home" className="jump">配置采集</Link></li>
                            <li><Link to="/home" className="jump">用户权限</Link></li>
                            <li><Link to="/home" className="jump">支持列表</Link></li>
                        </ul>
                        <span className="nav-bar"></span>
                    </li>
                </ul>
                <ul id="menu-head">
                    <li id="title" ref="title"></li>
                    <li id="switch" ref="switch"></li>
                    <li id="content">
                        <span className="content1">{this.state.content1}</span>
                        {this.state.content2 != "" ? <Link className="content2" to={this.state.content22}>{this.state.content2}</Link> : ""}
                        {this.state.content3 != "" ? <span className="content3">{this.state.content3}</span> : ""}
                    </li>
                    <li className="exit">退出</li>
                    <li>|</li>
                    <li className="user">
                        <span className="obm-user">{/*liuxingze*/}</span>
                        <span className="emp-tip">授权管理</span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        //禁用ie/backspace回退功能
        document.onkeydown = function(event) {
            if (event.keyCode == 8) {
                if (document.activeElement.type == "text") {
                    if (document.activeElement.readOnly == false)
                        return true;
                }
                return false;
            }
        };

        if(this.state.content22 == "/room"){
            $("#main-right").css({
                overflowX:"scroll"
            })
        }else{
            $("#main-right").css({
                overflowX:"hidden"
            })
        }
        $('.obm-user').html($.cookie("ObmUser"))
        //用户头像悬浮显示提示
        $(".user").on("mouseover",function(){
            $(".emp-tip").css({
                display:"block"
            })
        });
        $(".user").on("mouseout",function(){
            $(".emp-tip").css({
                display:"none"
            })
        });

        //查询告警数量
        // setTimeout(function(){
        //     axios.get('../resource/datas/warnnum.json').then(function(res){
        //         console.log(res)
        //         $(".warn-bar").html(res.data[0].num)
        //     },function(){
        //         console.log("请求告警数量出错")
        //     })
        // },5000)

        //切换按钮事件
        this.refs.switch.addEventListener("click",function(){
            if(_this.state.menuWidth == "short"){
                _this.setState({
                    menuWidth:"long"
                });
                _this.refs.menu.style.width = 200 + "px";
                _this.refs.title.style.width = 200 + "px";
                //字体显示
                for(var i = 0;i < _this.refs.menu_list.children.length;i ++){
                    _this.refs.menu_list.children[i].children[0].style.display = "block"
                }
                //箭头显示
                for(var j = 0;j < document.getElementsByClassName("arrow").length;j ++){
                    document.getElementsByClassName("arrow")[j].style.display = "block";
                    document.getElementsByClassName("arrow")[j].style.borderColor = "#fff transparent transparent";
                    document.getElementsByClassName("arrow")[j].style.top = "22px"
                }
                $(".warn-bar").css({
                    top:"10px",
                    right:"75px"
                })
            }else{
                _this.setState({
                    menuWidth:"short"
                });
                _this.refs.menu.style.width = 50 + "px";
                _this.refs.title.style.width = 50 + "px";
                //字体隐藏 + 下拉隐藏
                for(var i = 0;i < _this.refs.menu_list.children.length;i ++){
                    _this.refs.menu_list.children[i].children[0].style.display = "none";
                    if(_this.refs.menu_list.children[i].children[2]){
                        _this.refs.menu_list.children[i].children[2].style.display = "none"
                    }
                }
                $(".warn-bar").css({
                    display:"inline-block",
                    top:"0px",
                    right:"0px"
                });
                //箭头隐藏
                for(var j = 0;j < document.getElementsByClassName("arrow").length;j ++){
                    document.getElementsByClassName("arrow")[j].style.display = "none"
                }
            }
        });

        //下拉菜单事件   //hover 事件
        for(var k = 0;k < this.refs.menu_list.children.length;k ++){
            //navBar显示
            this.refs.menu_list.children[k].addEventListener("mouseover",function(evt){
                $(this).find(".nav-bar").css({
                    width:"5px"
                });
                //hover + tips
                if(_this.state.menuWidth == "short"){
                    if(evt.target.nodeName == "LI"){
                        layui.use('layer', function(){
                            var layer = layui.layer;
                            layer.tips(evt.target.children[0].innerHTML, evt.target, {
                                tips: [2, '#333'],
                                time: 1000
                            })
                        });
                    }
                }else if(evt.target.className && evt.target.className.indexOf("jump") != -1){
                    $(evt.target).addClass('active-hover')
                }
            });
            //navBar隐藏
            this.refs.menu_list.children[k].addEventListener("mouseout",function(evt){
                $(this).find(".nav-bar").css({
                    width:"0px"
                });
                //hover
                if(evt.target.className && evt.target.className.indexOf("jump") != -1){
                    $(evt.target).removeClass('active-hover')
                }
            });

            //二级菜单显示 + 三级菜单显示
            this.refs.menu_list.children[k].addEventListener("click",function(evt){
                if(_this.state.menuWidth != "short" && evt.target.parentNode.children[2] && (evt.target.className == "spread" || evt.target.className == "arrow")){
                    //非跳转页的下拉展示
                    let siblings = $(evt.target).parent().siblings();
                    for(var i = 0;i < siblings.length;i ++){ // 收起其他二级菜单
                        if(_this.state.menuWidth != "short" && siblings[i].children[2]){
                            siblings[i].children[2].style.display = "none";
                            siblings[i].children[1].style.borderColor = "#fff transparent transparent";
                            siblings[i].children[1].style.top = "22px";
                            //收起三级菜单
                            let threeLi = siblings[i].children[2].children;
                            for(var j = 0; j < threeLi.length;j ++){
                                if(threeLi[j].children[2]){
                                    threeLi[j].children[2].style.display = "none";
                                    threeLi[j].children[1].style.borderColor = "#fff transparent transparent";
                                    threeLi[j].children[1].style.top = "22px"
                                }
                            }
                        }
                    }
                    $(".warn-bar").css({
                        display:"inline-block"
                    });
                    if(evt.target.parentNode.children[2].style.display == "block"){
                        evt.target.parentNode.children[2].style.display = "none";
                        evt.target.parentNode.children[1].style.borderColor = "#fff transparent transparent";
                        evt.target.parentNode.children[1].style.top = "22px"
                    }else{
                        evt.target.parentNode.children[2].style.display = "block";
                        evt.target.parentNode.children[1].style.borderColor = "transparent transparent #fff";
                        evt.target.parentNode.children[1].style.top = "15px"
                    }
                }else if(evt.target.className.indexOf("jump") != -1){
                    evt.preventDefault();
                    //判断是否点击同一页面
                    if(_this.state.content3 == "" && _this.state.content22 != "" && $(evt.target).attr("href").split("#")[1] == _this.state.content22){
                        return;
                    }else{
                        hashHistory.push({
                            pathname: $(evt.target).attr("href").split("#")[1]
                        })
                    }
                }else{
                    //菜单折叠时点击某个展开
                    _this.setState({
                        menuWidth : "long"
                    });
                    _this.refs.menu.style.width = 200 + "px";
                    _this.refs.title.style.width = 200 + "px";
                    //字体显示
                    for(var i = 0;i < _this.refs.menu_list.children.length;i ++){
                        _this.refs.menu_list.children[i].children[0].style.display = "block"
                    }
                    //箭头显示
                    for(var j = 0;j < document.getElementsByClassName("arrow").length;j ++){
                        document.getElementsByClassName("arrow")[j].style.display = "block";
                        document.getElementsByClassName("arrow")[j].style.borderColor = "#fff transparent transparent";
                        document.getElementsByClassName("arrow")[j].style.top = "22px"
                    }
                    $(".warn-bar").css({
                        top:"10px",
                        right:"75px"
                    })
                }
            });
        }//for循环menulist

        //title 点击事件
        this.refs.title.addEventListener("click",function(){
            hashHistory.push({
                pathname: '/home'
            })
        });

        //main-right 点击事件
        $("#main-right").on("click",function(evt){
            if(!_this.refs.menu){
                return;
            }
            //菜单展开时点击main-right折叠
            _this.setState({
                menuWidth : "short"
            });
            _this.refs.menu.style.width = 50 + "px";
            _this.refs.title.style.width = 50 + "px";
            //字体隐藏
            for(var i = 0;i < _this.refs.menu_list.children.length;i ++){
                _this.refs.menu_list.children[i].children[0].style.display = "none";
                if(_this.refs.menu_list.children[i].children[2]){
                    _this.refs.menu_list.children[i].children[2].style.display = "none"
                }
            }
            //箭头隐藏
            for(var j = 0;j < document.getElementsByClassName("arrow").length;j ++){
                document.getElementsByClassName("arrow")[j].style.display = "none"
            }
            $(".warn-bar").css({
                display:"inline-block",
                top:"0px",
                right:"0px"
            })
        });

        //user 点击事件
        $(".user").on("click",function(){
            hashHistory.push({
                pathname: '/user'
            })
        });

        //exit点击事件
        $(".exit").on("click",function(){
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.confirm('确定要退出么？', {
                    icon: 7,
                    move: false,
                    skin: 'layui-layer-molv',
                    anim: 4,
                    area:['300px','180px'],
                    success:function(){
                        $(".layui-layer-content").css({
                            height:"50px"
                        });
                    },
                }, function (index) {
                    $.cookie("ObmUser", null, {
                        path: "/",
                        expires: -1
                    });
                    hashHistory.push({
                        pathname: '/login'
                    });
                    layer.close(index);
                })
            })
        })
    }//componentDidMount
}

export default Menu;