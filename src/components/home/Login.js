/*
* Author: CoronetLiu   2018/4/27
*/

// 'use strict';
import './Login.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class Login extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <div id="login">
                    <div id="login-log">Out-of-Band Management</div>
                    <div id="login-box">
                        <form id="loginForm" name="loginForm" method="post" action="./assets/datas/users.json">
                            <label className="login-label">
                                用户登录
                            </label>
                            <label className="login-label">
                                <span className="loginico1"></span><input className="login-username" name="loginUsername" type="text" />
                            </label>
                            <label className="login-label">
                                <span className="loginico2"></span><input className="login-password" name="loginPassword" type="password" />
                            </label>
                            <label className="login-label">
                                <input className="login-submit" type="button" value="登录"/>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        $("html").css({
            overflow:"auto"
        });
        $("body").css({
            overflow:"auto"
        });
        $("#root, #app-all, #warp").css({
            overflow:"auto"
        });
        $(".login-submit").on("click",function(){
            axios.get("./assets/datas/users.json",{
                params:{
                    username:$(".login-username").val(),
                    password:$(".login-password").val()
                }
            }).then(function(res){
                console.log(res.data)
                if(res.data){ //登陆成功
                    $.cookie("ObmUser",$(".login-username").val(),{
                        path:"/"
                    });
                    hashHistory.push({
                        path:"/home"
                    })
                }else{
                    layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("用户名或密码错误！", {
                        icon: 7,
                        skin: 'layui-layer-molv',
                        anim: 5
                    });
                });
                }
            },function(){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请求服务器失败！", {
                        icon: 7,
                        skin: 'layui-layer-molv',
                        anim: 5
                    });
                });
            })
            // $("#loginForm").submit()
        })
    }//componentDidMount
}

export default Login;
