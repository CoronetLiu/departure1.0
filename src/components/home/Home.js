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
    constructor(props,context) {
        super(props,context);
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
            });
            return (<div></div>);
        }else{

            return (
                <div id="warp">
                    <Menu content1="概览"/>
                    <div id="main-right">
                        <div id="home">
                            <div id="view">
                                <div id="view-left">
                                    <div className="view-left-top">
                                        <div className="lt-title">
                                            设备状态概览
                                        </div>
                                        <div className="lt-content">
                                            <div>123个</div>
                                            <div>256个</div>
                                            <div>365个</div>
                                        </div>
                                    </div>
                                    <div className="view-left-bottom">
                                        <div className="lb-title">
                                            <div>可用U位</div>
                                            <div>可用功率</div>
                                        </div>
                                        <div className="lb-content">
                                            <div className="able-u">
                                                <p>占总U位</p>
                                                <span>25%</span>
                                            </div>
                                            <div className="able-p">
                                                <p>占总功率</p>
                                                <span>56%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="view-center">
                                    <div className="ct-title">
                                        各厂家故障率占比
                                    </div>
                                    <div className="ct-content">
                                        <div id="ct-chart"></div>
                                    </div>
                                </div>

                                <div id="view-right">
                                    <div className="rt-title">
                                        总耗电量
                                    </div>
                                    <div className="rt-content">
                                        <div>12345678.9</div>
                                    </div>
                                    <div className="rb-title">
                                        按部件类型统计故障数
                                    </div>
                                    <div className="rb-content">
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>40个</p>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>200个</p>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>40个</p>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>40个</p>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>200个</p>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><img src="./assets/images/disk.png"/></dt>
                                            <dd>
                                                <p>硬盘</p>
                                                <p>40个</p>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    componentDidMount(){
        let _this = this;
        this.loadData();
    }//componentDidMount

    loadData(){
        let myChart = echarts.init(document.getElementById('ct-chart'));
		let option = {
            angleAxis: {
                show:false,
                max:1
            },
            tooltip: {
                backgroundColor: '#fff',
                textStyle:{
                    color:'#000'
                },
                formatter: function (param) {
                    return   param.name +'   :  '+ param.data * 100 + '%'
                }
            },
            radiusAxis: {
                show:false,
                type: 'category',
                data: ['A', 'B', 'C', 'D','E'],
                boundaryGap: true,
                z: 1,
                max:4,
            },
            polar: {
            },
            series: [{
                type: 'bar',
                data: [0.1,0,0,0,0],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a',
                itemStyle:{
                    color:'#1247e4'
                }
            },{
                type: 'bar',
                data: [0, 0.3, 0,0,0],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a',
                itemStyle:{
                    color:'#0fabc6'
                }
            },{
                type: 'bar',
                data: [0,0,0.5,0,0],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a',
                itemStyle:{
                    color:'#eae51c'
                }
            },{
                type: 'bar',
                data: [0,0,0,0.7,0],
                coordinateSystem: 'polar',
                name: 'D',
                stack: 'a',
                itemStyle:{
                    color:'#cbac46'
                }
            },{
                type: 'bar',
                data: [0,0,0,0,0.9],
                coordinateSystem: 'polar',
                name: 'E',
                stack: 'a',
                itemStyle:{
                    color:'#d1482f'
                }
            }],
            legend: {
                show: true,
                data: ['A', 'B', 'C','D','E'],
                textStyle:{
                    color:'#48dbfd'
                }
            }
        };
		myChart.setOption(option);
    }
}

export default Home;
