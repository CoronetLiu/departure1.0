/*
* @Author:  CoronetLiu
* @Date:    2018-04-17 11:18:11
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-04-18 16:42:21
* @Email:   liu86931@163.com
*/

// 'use strict';

import Menu from "../menu/Menu.js"
import './MonitorDetail.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class MonitorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manageIP:this.props.location.query.manageIP
        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="监控" content2="设备监控" content22="/monitor" content3={this.state.manageIP}/>
                <div id="main-right">
                    <div id="monitor-detail">
                        MonitorDetail + {this.state.manageIP}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        console.log(this.state.manageIP)
    }//componentDidMount
}

export default MonitorDetail;