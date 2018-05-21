/*
* @Author:  CoronetLiu
* @Date:    2018-04-03 17:16:45
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-04-24 09:59:11
* @Email:   liu86931@163.com
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
        return (
            <div id="warp">
                <Menu content1="概览"/>
                <div id="main-right">
                    <div id="home">
                        HOME
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){

    }//componentDidMount
}

export default Home;
