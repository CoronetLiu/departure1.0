/*
* Author: CoronetLiu   2018/4/26
*/

// 'use strict';
import Menu from "../menu/Menu.js"
import './Warn.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class Warn extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="告警"/>
                <div id="main-right">
                    <div id="warn">
                        告警页面
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.loadWarn()
    }//componentDidMount

    loadWarn(){
//        var socket = io.connect('http://localhost:8000');
//            socket.on('warnNum', function (data) {//接收到服务器发送过来的名为'warnNum'的数据
//                console.log(data.num);//data为应服务器发送过来的数据。
//            });
//            socket.on('warnData', function (data) {//接收到服务器发送过来的名为'warnData'的数据
//                console.log(data.data);//data为应服务器发送过来的数据。
//            });
    }
}

export default Warn;