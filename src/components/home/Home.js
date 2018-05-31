/*
* Author: CoronetLiu   2018/4/3
*/

// 'use strict';
import Menu from "../menu/Menu.js"
import './Home.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // console.log("render")

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
            return (<div></div>);
        }else{

            return (
                <div id="warp">
                    <Menu content1="概览"/>
                    <div id="main-right">
                        <div id="home">
                            <img src="./assets/images/down.png" alt="图片" title="down.png"/>HOME
                        </div>
                    </div>
                </div>
            );
        }
    }

    componentDidMount(){

    }//componentDidMount
}

export default Home;
