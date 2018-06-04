/*
* Author: CoronetLiu   2018/4/17
*/

// 'use strict';

import Menu from "../menu/Menu.js"
import './MonitorDetail.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class MonitorDetail extends React.Component {
    constructor(props,context) {
        super(props,context);
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