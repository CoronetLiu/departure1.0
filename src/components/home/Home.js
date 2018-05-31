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

    componentDidMount(){

    }//componentDidMount
}

export default Home;
