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
                    <Menu content1="概览" ref="menu"/>
                    <div id="main-right">
                        <div id="home">
                            <div id="view-top">
                                <div className="tl">
                                    <div className="tlt">
                                        <div className="tlt-title">
                                            <div></div>
                                            机房管理
                                        </div>
                                        <div className="tlt-content">
                                            <div className="able-u">
                                                <div className="warp">
                                                    <div className="l-rate">75<span>%</span></div>
                                                    <div className="div rig">
                                                        <div className="circle right-circle"></div>
                                                    </div>
                                                    <div className="div lef">
                                                        <div className="circle left-circle"></div>
                                                    </div>
                                                </div>
                                                <p>可用U位 120 个</p>
                                            </div>
                                            <div className="able-p">
                                                <div className="warp">
                                                    <div className="l-rate">56<span>%</span></div>
                                                    <div className="div rig">
                                                        <div className="circle right-circle"></div>
                                                    </div>
                                                    <div className="div lef">
                                                        <div className="circle left-circle"></div>
                                                    </div>
                                                </div>
                                                <p>可用功率 56%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tlb">
                                        <div className="tlb-title">
                                            <div></div>
                                            设备状态概览
                                        </div>
                                        <div className="tlb-content">
                                            <div id="device-state"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tc">
                                    <div className="tct">
                                        <span>总耗电量</span>
                                        <div className="num9 numP"></div>
                                        <div className="num8 numP"></div>
                                        <div className="num7 numP"></div>
                                        <div className="num6 numP"></div>
                                        <div className="num5 numP"></div>
                                        <div className="num4 numP"></div>
                                        <div className="num3 numP"></div>
                                        <div className="num2 numP"></div>
                                        <div className="num1 numP"></div>
                                        <div className="do"><span></span></div>
                                        <div className="num0 numP"></div>
                                        <span>瓦</span>
                                    </div>
                                    <div className="tcc">
                                        <dl>
                                            <dt>
                                                <img alt="" src="./assets/images/view_icon2.png"/>
                                            </dt>
                                            <dd>
                                                <p>5748<span>台</span></p>
                                                <span>接入设备数量</span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <img alt="" src="./assets/images/view_icon4.png"/>
                                            </dt>
                                            <dd>
                                                <p>87.56<span>%</span></p>
                                                <span>设备总功率</span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <img alt="" src="./assets/images/view_icon3.png"/>
                                            </dt>
                                            <dd>
                                                <p>90.50<span>%</span></p>
                                                <span>设备健康度</span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <img alt="" src="./assets/images/view_icon1.png"/>
                                            </dt>
                                            <dd>
                                                <p>5748<span>台</span></p>
                                                <span>过保设备数量</span>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className="tcb">
                                        <div id="components-error">
                                            <img id="bg_img" alt="" src='./assets/images/view_earth.png'
                                                 style={{display: "none"}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="tr">
                                    <div className="trt">
                                        <div className="trt-title">
                                            <div className="trt-title-name">
                                                <div></div>
                                                <div></div>
                                                各厂家历史故障率占比
                                            </div>
                                            <div className="a"></div>
                                        </div>
                                        <div className="trt-content" id="factory-error">

                                        </div>
                                    </div>
                                    <div className="trb">
                                        <div className="trb-title">
                                            <div className="trb-title-name">
                                                <div></div>
                                                <div></div>
                                                温度走势
                                            </div>
                                            <div className="a"></div>
                                        </div>
                                        <div className="trb-content" id="average-temp">

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div id="view-bottom">
                                <div className="bl">
                                    <div className="blt">
                                        <div className="blt-title">
                                            <div></div>
                                            设备告警简要&nbsp;&nbsp;<span className="titleinfo">［当前有 <i
                                            className="redfont"><span>0</span></i> 个告警事件］</span>
                                        </div>
                                        <div className="blt-content">
                                            <table cellSpacing='0'>
                                                <thead>
                                                <tr>
                                                    <th width="20%">监控对象</th>
                                                    <th width="10%">类型</th>
                                                    <th width="22%">异常信息</th>
                                                    <th width="20%">最后时间</th>
                                                    <th width="18%">已持续</th>
                                                    <th width="10%">操作</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><a className="ttdlink">1</a></td>
                                                    <td><span>1</span></td>
                                                    <td><em className="redfont">［主要］</em><span>1</span></td>
                                                    <td><span>1</span></td>
                                                    <td><span>1</span></td>
                                                    <td><span><a className="tdlink" href="#">详情</a></span></td>
                                                </tr>
                                                </tbody>

                                                <tfoot>
                                                <tr>
                                                    <td colSpan="6"><a className="more" href="#">查看更多>></a></td>
                                                </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="br">
                                    <div className="brt">
                                        <div className="brt-title">
                                            <div className="brt-temp gre">
                                                温度排行TOP5
                                                <div className="brt-rig"></div>
                                                <div className="brt-bot"></div>
                                            </div>
                                            <div className="brt-power nul">
                                                功率排行TOP5
                                            </div>
                                            <div className="brt-das"></div>
                                        </div>
                                        <div className="brt-content">
                                            <div className="power-top5" id="power-top5">
                                            </div>
                                            <div className="temp-top5" id="temp-top5">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="copyright">版权所有©神州泰岳 Ultrapower Software.All right reserved</div>
                            <div className="copyright">Ultra_Outmanage_v2.0</div>
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
        //切换排行榜
        $(".brt-title").on("click",function(evt){
            if(evt.target.className.indexOf('brt-temp') != -1){
                //alert(1)
                $(".brt-power").removeClass("gre");
                $('.brt-temp').addClass("gre");
                $(".brt-power").addClass("nul");
                $('.brt-temp').removeClass("nul");
                var rig = $(".brt-rig")[0];
                var bot = $(".brt-bot")[0];
                $(".brt-lef").remove();
                $(".brt-bot").remove();
                $(".brt-temp").append(rig);
                $(".brt-temp").append(bot);

                $(".temp-top5").css({
                    top:0
                });
                $(".power-top5").css({
                    top:'1000px'
                })
            }else if(evt.target.className.indexOf('brt-power') != -1){
                //alert(2)
                $(".brt-temp").removeClass("gre");
                $('.brt-power').addClass("gre");
                $(".brt-temp").addClass("nul");
                $('.brt-power').removeClass("nul");
                var rig = $(".brt-rig")[0];
                var bot = $(".brt-bot")[0];
                $(".brt-lef").remove();
                $(".brt-bot").remove();
                $(".brt-power").append(rig);
                $(".brt-power").append(bot);

                $(".temp-top5").css({
                    top:'1000px'
                });
                $(".power-top5").css({
                    top:0
                })
            }
        });

        var img = $("#bg_img")[0];

        var myChart1 = echarts.init(document.getElementById('device-state'));
        var stateOption = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                padding: 10,
                backgroundColor: 'rgba(10,10,10,0.8)',
                textStyle:{
                    color:'#fff'
                }
            },
            legend: {
                x:'right',
                y:10,
                data: ['正常', '异常', '脱网'],
                textStyle: {
                    color: 'fff',
                    fontSize: 14
                }
            },
            grid: {
                top:'25%',
                left: '3%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: true},
                    data: ['网络设备', '服务器', '存储', '刀箱'],
                    axisLine: {
                        lineStyle: {
                            color: '#8c8cbb'
                        }
                    },
                    splitLine:{
         　　　　		show:false
                    },
                    axisTick :{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    name:'单位：台',
                    nameTextStyle:{
                       color:'#8c8cbb'
                     },
                    type: 'value',
                    axisLabel:{
                      textStyle:{
                          color:'#8c8cbb'
                      }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#8c8cbb'
                        }
                    },
                    splitLine:{
             　　　　		show:false
                    },
                    axisTick :{
                        show:false
                    }
                }
            ],
            series: [
                {
                    name: '正常',
                    type: 'bar',
                    barGap: 0,
                    data: [35, 32, 30, 33],
                    color:'#04b2eb',
                    barCategoryGap:'50%'
                },
                {
                    name: '异常',
                    type: 'bar',
                    data: [22, 18, 19, 23],
                    color:'#8d14b4',
                    barCategoryGap:'50%'
                },
                {
                    name: '脱网',
                    type: 'bar',
                    data: [15, 22, 20, 15],
                    color:'#0d47a6',
                    barCategoryGap:'50%'
                }
            ]
        };
        myChart1.setOption(stateOption);


        var myChart2 = echarts.init(document.getElementById('components-error'));
        var componentsOption = {
            title: {
                text: '各部件故障情况',
                left: 'center',
                textStyle:{
                    fontSize:16,
                    color:'#82e1ff'
                }
            },
            tooltip : {
                trigger: 'axis',
                backgroundColor: 'rgba(10,10,10,0.8)',
                textStyle:{
                    color:'#fff'
                },
                axisPointer: {
                    //type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: function(param){
                    return param[0].name+'<br/>发生故障 <span style="color:#ff0;font-size:18px;">'+param[0].data +'</span> 个'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick :{
                    show:false
                },
                data: ['硬盘', '电源', '风扇', '内存', 'CPU', '刀片', '交换区','电池'],
                axisLabel:{
                  textStyle:{
                      color:'#50bfed'
                  }
                }
            },
            yAxis: {
                name:'单位：个',
                nameTextStyle:{
                   color:'#8c8cbb'
                 },
                type: 'value',
                axisLabel:{
                  textStyle:{
                      color:'#8c8cbb'
                  }
                },
                axisLine:{
                    show:false
                },
                axisTick :{
                    show:false
                },
                splitLine:{
                    show: true,
                    lineStyle: {
                        color: '#2c2c4b'
                    }
                }

            },
            series: [{
                data: [15, 25, 28, 25, 30, 40, 44,45],
                type: 'line',
                smooth: true,
                color:'#04b2eb',
                areaStyle: {

                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 0.8,
                            [
                                {offset: 0, color: 'rgb(16,180,251,0.5)'},
                                {offset: 0.5, color: 'rgb(14,145,239,0.5)'},
                                {offset: 1, color: 'rgb(10,8,192,0.5)'}
                            ]
                        )
                    }
                }
            }]
        };
        myChart2.setOption(componentsOption);



        var myChart3 = echarts.init(document.getElementById('factory-error'));

        var factoryOption = {
                angleAxis: {
                    show:false,
                    max:1
                },
                tooltip: {
                    backgroundColor: 'rgba(10,10,10,0.8)',
                    textStyle:{
                        color:'#fff'
                    },
                    formatter: function (param) {
                        return   param.name +'  历史故障率   :  '+ param.data * 100 + '%'
                    }
                },
                radiusAxis: {
                    show:false,
                    type: 'category',
                    data: ['CISCO', 'IBM', 'HP', 'DELL','HUAWEI'],
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
                    name: 'CISCO',
                    stack: 'a',
                    itemStyle:{
                        color:'#169537'
                    },
                    center: ['40%', '50%']
                },{
                    type: 'bar',
                    data: [0, 0.3, 0,0,0],
                    coordinateSystem: 'polar',
                    name: 'IBM',
                    stack: 'a',
                    itemStyle:{
                        color:'#169195'
                    },
                    center: ['40%', '50%']
                },{
                    type: 'bar',
                    data: [0,0,0.5,0,0],
                    coordinateSystem: 'polar',
                    name: 'HP',
                    stack: 'a',
                    itemStyle:{
                        color:'#125c9d'
                    },
                    center: ['40%', '50%']
                },{
                    type: 'bar',
                    data: [0,0,0,0.7,0],
                    coordinateSystem: 'polar',
                    name: 'DELL',
                    stack: 'a',
                    itemStyle:{
                        color:'#958e16'
                    },
                    center: ['40%', '50%']
                },{
                    type: 'bar',
                    data: [0,0,0,0,0.9],
                    coordinateSystem: 'polar',
                    name: 'HUAWEI',
                    stack: 'a',
                    itemStyle:{
                        color:'#d1482f'
                    },
                    center: ['40%', '50%']
                }],
                legend: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    data: ['CISCO', 'IBM', 'HP','DELL','HUAWEI'],
                    textStyle:{
                        color:'#48dbfd'
                    }
                }
            };

        myChart3.setOption(factoryOption);

        var myChart4 = echarts.init(document.getElementById('temp-top5'));

        var tempOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(param){
                        return param[0].name+'<br/>'+param[0].marker+'温度：'+param[0].data+'℃'
                    },
                    backgroundColor: 'rgba(10,10,10,0.8)',
                    textStyle:{
                        color:'#fff'
                    },
                },
                legend: {
                    show:false
                },
                grid: {
                    top:'20%',
                    left: '12%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel:{
                        textStyle:{
                            color:'#8c8cbb'
                        }
                      },
                      axisTick :{
                          show:false
                      },
                      splitLine:{
                          show: false,
                          lineStyle: {
                              color: '#2c2c4b'
                          }
                      }
                },
                yAxis: {
                    name:'单位：℃',
                    nameTextStyle:{
                        color:'#8c8cbb'
                      },
                    type: 'category',
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                      show:true
                    },
                    axisLabel:{
                        show:false,
                        rotate: 30,
                        textStyle:{
                           color:'#50bfed'
                        }
                    },
                    data: ['192.168.182.210','192.168.182.211','192.168.182.212','192.168.182.213','192.168.182.214']
                },
                series: [
                    {
                        name: '温度',
                        type: 'bar',
                        color:'#8e14b4',
                        barCategoryGap:'50%',
                        data: [30, 40, 50, 60, 70],
                        label:{
                            normal: {
                                show: true,
                                position: 'insideLeft',
                                formatter: function(param){
                                    return 'NO'+(5-param.dataIndex) +'  '+ param.name
                                },
                                fontSize: 12,
                                color:'#73cefa'
                            }
                        }
                    }
                ]
            };
        myChart4.setOption(tempOption);

        var myChart5 = echarts.init(document.getElementById('power-top5'));

        var powerOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(param){
                        return param[0].name+'<br/>'+param[0].marker+'功率：'+param[0].data+'W'
                    },
                    backgroundColor: 'rgba(10,10,10,0.8)',
                    textStyle:{
                        color:'#fff'
                    },
                },
                legend: {
                    show:false
                },
                grid: {
                    top:'20%',
                    left: '12%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel:{
                        textStyle:{
                            color:'#8c8cbb'
                        }
                      },
                      axisTick :{
                          show:false
                      },
                      splitLine:{
                          show: false,
                          lineStyle: {
                              color: '#2c2c4b'
                          }
                      }
                },
                yAxis: {
                    name:'单位：Watt',
                    nameTextStyle:{
                        color:'#8c8cbb'
                      },
                    type: 'category',
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                      show:true
                    },
                    axisLabel:{
                        show:false,
                        rotate: 30,
                        textStyle:{
                           color:'#50bfed'
                        }
                    },
                    data: ['1','2','3','4','5']
                },
                series: [
                    {
                        name: '功率',
                        type: 'bar',
                        color:'#8e14b4',
                        barCategoryGap:'50%',
                        data: [300, 400, 500, 600, 700],
                        label:{
                            normal: {
                                show: true,
                                position: 'insideLeft',
                                formatter: function(param){
                                    return 'NO'+(5-param.dataIndex) +'  '+ param.name
                                },
                                fontSize: 12,
                                color:'#73cefa'
                            }
                        }
                    }
                ]
            };
        myChart5.setOption(powerOption);

        var myChart6 = echarts.init(document.getElementById('average-temp'));
        var averageTempOption = {
            title: {
                left: 'center',
                textStyle:{
                    fontSize:16,
                    color:'#82e1ff'
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                backgroundColor: 'rgba(10,10,10,0.8)',
                textStyle:{
                    color:'#fff'
                },
                formatter: function(param){
                    return param[0].name+'时<br/>'+param[0].marker+'温度：'+param[0].data+'℃'
                }
            },
            grid: {
                top:'18%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick :{
                    show:false
                },
                data: ['11','12','13','14','15','16','17','18','19','20','21','22','23','0','1','2','3','4','5','6','7','8','9','10'],
                axisLabel:{
                  textStyle:{
                      color:'#50bfed'
                  }
                }
            },
            yAxis: {
                name:'单位：℃',
                nameTextStyle:{
                   color:'#8c8cbb'
                 },
                type: 'value',
                axisLabel:{
                  textStyle:{
                      color:'#8c8cbb'
                  }
                },
                axisLine:{
                    show:true
                },
                axisTick :{
                    show:false
                },
                splitLine:{
                    show: true,
                    lineStyle: {
                        color: '#2c2c4b'
                    }
                }

            },
            series: [{
                data: [40, 44,45,15, 25, 28, 25, 30,28, 25, 30, 40, 44,45, 25, 28, 25, 30,28, 25, 30, 40, 44,45],
                type: 'line',
                smooth: false,
                color:'#04b2eb',
                areaStyle: {

                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 0.8,
                            [
                                {offset: 0, color: 'rgb(246,50,45,0.5)'},
                                {offset: 0.5, color: 'rgb(240,182,45,0.5)'},
                                {offset: 1, color: 'rgb(187,240,25,0.5)'}
                            ]
                        )
                    }
                }
            }]
        };
        myChart6.setOption(averageTempOption);

		window.addEventListener("resize",function(){
	      	 myChart1.resize();
	      	 myChart2.resize();
	      	 myChart3.resize();
	      	 myChart4.resize();
	      	 myChart5.resize();
	      	 myChart6.resize();
       	});
        var observer = new MutationObserver(function () {
            // myChart1.resize();
            // myChart2.resize();
            // myChart3.resize();
            // myChart4.resize();
            // myChart5.resize();
            // myChart6.resize();
        });
        var config = {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: [
                'style'
            ]
        };
        var el = this.refs.menu.refs.menu;
        observer.observe(el, config);
    }
}

export default Home;
