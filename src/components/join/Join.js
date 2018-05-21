/*
* @Author:  CoronetLiu
* @Date:    2018-04-18 15:57:16
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-04-26 11:43:56
* @Email:   liu86931@163.com
*/

// 'use strict';
import Menu from "../menu/Menu.js"
import './Join.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";

let OBJ1 = {};
let OBJ2 = {};
let flag2 = [false,false,false,false,false,false]; //第二步验证需要
let autofindflag = [false,false,false,false,false,false]; //autofind验证需要

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu  content1="接入" content2="一键接入" content22="/join"/>
                <div id="main-right">
                    <div id="join">
                        <div id="join-container">
                            <div className="join-header">
                                <p className="join-title">添加设备 > <span className="join-title2">手动添加</span></p>
                                <div className="btns-join">
                                    <button className="layui-btn layui-btn handler">手动添加</button>
                                    <button className="layui-btn layui-btn autofind">自动发现</button>
                                    <button className="layui-btn layui-btn entering">设备导入</button>
                                </div>
                            </div>
                            <div className="join-body">
                                <div className="join-body-top">
                                    <span className="step1"><i>1</i>选择设备类型</span>
                                    <span className="step2"><i>2</i>填写管理信息</span>
                                    <span className="step3"><i>3</i>高级设置</span>
                                </div>
                                <div className="join-body-bottom">
                                    <div className="step1-content">
                                        <p>请选择设备类型：</p>
                                        <label><a className="join-select-type type-selected"></a><span>服务器</span></label>
                                        <label><a className="join-select-type"></a><span>存储</span></label>
                                        <label><a className="join-select-type"></a><span>刀箱</span></label>
                                        <label><a className="join-select-type"></a><span>网络设备</span></label>
                                        <button className="layui-btn layui-btn next-step1">下一步</button>
                                    </div>
                                    <div className="step2-content" style={{display:"none"}}>
                                        <p>请填写管理口信息：</p>
                                        <label><span className="front-name"><span className="nece"></span>管理IP：</span>
                                            <input type="text" className="join-manageIP" name="join-manageIP" placeholder="请输入设备管理IP"/>
                                            <em className="join-tip" style={{display:"none"}}>管理IP不合法！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>业务IP：</span>
                                            <input type="text" className="join-businessIP" name="join-businessIP" placeholder="请输入设备业务IP"/>
                                            <em className="join-tip" style={{display:"none"}}>业务IP不合法！</em>
                                        </label>
                                        <label className="join-collector-label"><span className="front-name"><span className="nece"></span>采集机：</span>
                                            <input type="text" className="join-collector" name="join-collector" placeholder="请选择采集机"/>
                                            <ul className="join-collector-list">
                                                <li className="join-collector-li">192.168.0.1</li>
                                                <li className="join-collector-li">192.168.0.2</li>
                                                <li className="join-collector-li">192.168.0.3</li>
                                                <li className="join-collector-li">192.168.0.4</li>
                                                <li className="join-collector-li">192.168.0.5</li>
                                            </ul>
                                            <em className="join-tip" style={{display:"none"}}>采集机IP不合法！</em>
                                            <a className="join-arrow"></a>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>用户名：</span>
                                            <input type="text" className="join-username" name="join-username" placeholder="请输入管理口用户名"/>
                                            <em className="join-tip" style={{display:"none"}}>用户名不能为空！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>密码：</span>
                                            <input type="password" className="join-password" name="join-password" placeholder="请输入管理口密码"/>
                                            <em className="join-tip" style={{display:"none"}}>密码不能为空！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>确认确认密码：</span>
                                            <input type="password" className="join-confirm-password" name="join-confirm-password" placeholder="请再次输入密码"/>
                                            <em className="join-tip" style={{display:"none"}}>两次密码不一致！</em>
                                        </label>
                                        <a className="higher-setting">高级设置 >>></a>
                                        <button className="layui-btn layui-btn prev-step2">上一步</button>
                                        {/*<button className="layui-btn layui-btn next-step2">下一步</button>*/}
                                        <button className="layui-btn layui-btn save-step2">保存</button>
                                    </div>
                                    <div className="step3-content" style={{display:"none"}}>
                                        <div className="join-one">
                                            <div className="updown"></div>
                                            <p>采集配置</p>
                                            <label className="collect-type-label"><span className="front-name"><span className="nece"></span>采集方式：</span>
                                                <input type="text" className="collect-type" placeholder="点击选择采集方式"/>
                                            </label>
                                            <div className="collect-port-container" style={{overflow:"hidden"}}></div>
                                            <label className="join-factory-label"><span className="front-name"><span className="nece"></span>厂商：</span>
                                                <input type="text" className="join-factory" placeholder="请选择厂商"/>
                                                <ul className="join-factory-list">
                                                    <li className="join-factory-li">HP</li>
                                                    <li className="join-factory-li">IBM</li>
                                                    <li className="join-factory-li">H3C</li>
                                                    <li className="join-factory-li">EMC</li>
                                                    <li className="join-factory-li">LNVO</li>
                                                    <li className="join-factory-li">CISCO</li>
                                                    <li className="join-factory-li">LENOVO</li>
                                                    <li className="join-factory-li">CURRENCY</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label className="join-type-label"><span className="front-name"><span className="nece"></span>型号：</span>
                                                <input type="text" className="join-type" placeholder="请选择或添加型号"/>
                                                <ul className="join-type-list">
                                                    <li className="join-type-li">385 G7</li>
                                                    <li className="join-type-li">380 G9</li>
                                                    <li className="join-type-li">3650 M4</li>
                                                    <li className="join-type-li">3650 M5</li>
                                                    <li className="join-type-li">3750 M4</li>
                                                    <li className="join-type-li">3750 M5</li>
                                                    <li className="join-type-li">6509E</li>
                                                    <li className="join-type-li">VNX5600</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label><span className="front-name"><span className="nece"></span>提示符：</span>
                                                <input type="text" className="join-symbol" placeholder="请填写提示符"/>
                                            </label>
                                            <label className="join-commands"><span className="front-name">命令集：</span>
                                                <input type="text" className="join-command1"/>
                                                <input type="text" className="join-command2"/>
                                                <span className="join-add-commands">+</span>
                                            </label>
                                        </div>
                                        <div className="join-two" style={{maxHeight:"40px"}}>
                                            <div className="updown"></div>
                                            <p>属性配置</p>
                                            <label className="join-manageIP2s"><span className="front-name">管理IP2：</span>
                                                <input type="text" className="join-manageIP2" placeholder="输入备用管理IP"/>
                                                <span className="join-add-manageIP2s">+</span>
                                            </label>
                                            <label><span className="front-name">主机名：</span>
                                                <input type="text" className="join-master" placeholder="填写系统名称"/>
                                            </label>
                                            <label><span className="front-name">父资源管理IP：</span>
                                                <input type="text" className="join-father-manageIP" placeholder="填写父资源管理IP"/>
                                            </label>
                                            <label><span className="front-name">父资源业务IP：</span>
                                                <input type="text" className="join-father-businessIP" placeholder="填写父资源业务IP"/>
                                            </label>
                                            <label><span className="front-name">联系人：</span>
                                                <input type="text" className="join-concat" placeholder="选择或新增联系人"/>
                                            </label>
                                            <label><span className="front-name">维保厂商：</span>
                                                <input type="text" className="join-repair" placeholder="填写维保厂商名称"/>
                                            </label>
                                            <label><span className="front-name">保修截止日期：</span>
                                                <input type="text" className="join-end-date" placeholder="选择保修截止日期"/>
                                            </label>
                                            <label><span className="front-name">业务系统：</span>
                                                <input type="text" className="join-business-sys" data-id="" placeholder="选择或新增业务系统"/>
                                            </label>
                                            <label className="join-Us"><span className="front-name">位置：</span>
                                                <input type="text" className="join-position" data-id="" placeholder="点击添加位置信息"/>
                                                <span className="join-add-Us">+</span>
                                                <div style={{marginTop:"20px"}}>
                                                    <span className="front-name">U位：</span>
                                                    <input type="text" className="join-U-start" placeholder="起始U位"/>
                                                    <input type="text" className="join-U-end" placeholder="结束U位"/>
                                                </div>
                                            </label>
                                            <label className="if-manage-label"><span className="front-name">可管理：</span>
                                                <input type="text" className="join-if-manage" placeholder="选择是否可管理"/>
                                                <ul className="if-manage-list">
                                                    <li className="if-manage-li">是</li>
                                                    <li className="if-manage-li">否</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                        </div>
                                        <div className="join-three"  style={{maxHeight:"40px"}}>
                                            <div className="updown"></div>
                                            <p>远程桌面配置</p>
                                            <label className="if-desk-label"><span className="front-name">是否启用：</span>
                                                <input type="text" className="join-if-desk" placeholder="请选择是否启用"/>
                                                <ul className="if-desk-list">
                                                    <li className="if-desk-li">是</li>
                                                    <li className="if-desk-li">否</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label><span className="front-name">远程KVM端口：</span>
                                                <input type="text" className="KVM-port" placeholder="请输入远程桌面调用端口（443）"/>
                                            </label>
                                            <label className="desk-collector-label"><span className="front-name">采集机：</span>
                                                <input type="text" className="desk-collector" placeholder="请选择采集机"/>
                                                <ul className="desk-collector-list">
                                                    <li className="desk-collector-li">192.168.0.1</li>
                                                    <li className="desk-collector-li">192.168.0.2</li>
                                                    <li className="desk-collector-li">192.168.0.3</li>
                                                    <li className="desk-collector-li">192.168.0.4</li>
                                                    <li className="desk-collector-li">192.168.0.5</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                        </div>
                                        <div className="join-four"  style={{maxHeight:"40px"}}>
                                            <div className="updown"></div>
                                            <p>远程WEB配置</p>
                                            <label className="if-web-label"><span className="front-name">是否启用：</span>
                                                <input type="text" className="join-if-web" placeholder="请选择是否启用"/>
                                                <ul className="if-web-list">
                                                    <li className="if-web-li">是</li>
                                                    <li className="if-web-li">否</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label className="web-collector-label"><span className="front-name">采集机：</span>
                                                <input type="text" className="web-collector" placeholder="请选择采集机"/>
                                                <ul className="web-collector-list">
                                                    <li className="web-collector-li">192.168.0.1</li>
                                                    <li className="web-collector-li">192.168.0.2</li>
                                                    <li className="web-collector-li">192.168.0.3</li>
                                                    <li className="web-collector-li">192.168.0.4</li>
                                                    <li className="web-collector-li">192.168.0.5</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label><span className="front-name">管理口URL：</span>
                                                <input type="text" className="join-URL" placeholder="范例：https://192.168.1.1"/>
                                            </label>
                                            <label><span className="front-name">本地端口：</span>
                                                <input type="text" className="join-localport" placeholder="本地端口"/>
                                            </label>
                                            <label className="join-transferports"><span className="front-name">端口转发：</span>
                                                <input type="text" className="join-port1" placeholder="本地端口"/>
                                                <input type="text" className="join-port2" placeholder="要映射的端口"/>
                                                <span className="join-add-transferports">+</span>
                                            </label>
                                        </div>
                                        <div className="join-five"  style={{maxHeight:"40px"}}>
                                            <div className="updown"></div>
                                            <p>快捷指令配置</p>
                                            <label className="if-fast-label"><span className="front-name">是否启用：</span>
                                                <input type="text" className="join-if-fast" placeholder="请选择是否启用"/>
                                                <ul className="if-fast-list">
                                                    <li className="if-fast-li">是</li>
                                                    <li className="if-fast-li">否</li>
                                                </ul>
                                                <a className="join-arrow"></a>
                                            </label>
                                            <label className="join-fasts"><span className="front-name">指令：</span>
                                                <div className="fast-collect-div"><input type="text" className="join-fast-collect" placeholder="采集方式"/>
                                                    <ul className="fast-collect-list">
                                                        <li className="fast-collect-li">IPMI</li>
                                                    </ul>
                                                    <a className="join-arrow"></a>
                                                </div>
                                                <input type="text" className="join-fast-name" placeholder="指令名称"/>
                                                <input type="text" className="join-fast-command" placeholder="指令"/>
                                                <span className="join-add-fasts">+</span>
                                            </label>
                                        </div>

                                        <button className="layui-btn layui-btn-danger prev-step3">放弃设置</button>
                                        <button className="layui-btn layui-btn-normal next-step3">设置完成</button>
                                    </div>
                                    <div className="autofind-content" style={{display:"none"}}>
                                        <p>IPMI自动发现：</p>
                                        <label><span className="front-name"><span className="nece"></span>起始IP：</span>
                                            <input type="text" className="auto-startIP" placeholder="请输入起始IP"/>
                                            <em className="join-tip" style={{display:"none"}}>起始IP不合法！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>结束IP：</span>
                                            <input type="text" className="auto-endIP" placeholder="请输入结束IP"/>
                                            <em className="join-tip" style={{display:"none"}}>结束IP不合法！</em>
                                        </label>
                                        <label className="auto-collector-label"><span className="front-name"><span className="nece"></span>采集机：</span>
                                            <input type="text" className="auto-collector" placeholder="请选择采集机"/>
                                            <ul className="auto-collector-list">
                                                <li className="auto-collector-li">192.168.0.1</li>
                                                <li className="auto-collector-li">192.168.0.2</li>
                                                <li className="auto-collector-li">192.168.0.3</li>
                                                <li className="auto-collector-li">192.168.0.4</li>
                                                <li className="auto-collector-li">192.168.0.5</li>
                                            </ul>
                                            <em className="join-tip" style={{display:"none"}}>采集机IP不合法！</em>
                                            <a className="join-arrow"></a>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>用户名：</span>
                                            <input type="text" className="auto-username" placeholder="请输入用户名"/>
                                            <em className="join-tip" style={{display:"none"}}>用户名不能为空！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>密码：</span>
                                            <input type="password" className="auto-password" name="join-password" placeholder="请输入密码"/>
                                            <em className="join-tip" style={{display:"none"}}>密码不能为空！</em>
                                        </label>
                                        <label><span className="front-name"><span className="nece"></span>确认密码：</span>
                                            <input type="password" className="auto-confirm-password" placeholder="请再次输入密码"/>
                                            <em className="join-tip" style={{display:"none"}}>两次密码不一致！</em>
                                        </label>
                                        <button className="layui-btn layui-btn next-autofind">开始</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        this.loadDatas();
        $("#main-right").scroll(function(){
            $(".join-end-date").blur();
            $(".layui-laydate").remove()
        });
        layui.use('laydate', function(){
            var laydate = layui.laydate;
                laydate.render({
                elem: '.join-end-date'
            });
        });

        //step2 选择采集方式
        $(".collect-type").on("click",function(){
            let str = `
                    <div style="max-height:242px;padding:10px 30px;"><table border="1" style="text-align:center;width:100%;">
                        <thead style="background:#cfe6fd;linear-gradient(to top, #cfe6fd, #cfe6fd);color:#666;">
                            <th height="30" width="40"></th>
                            <th>名称</th>
                        </thead>
                        <tbody>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="IPMI"/></td>
                                <td>IPMI</td>
                            </tr>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="SSH2"/></td>
                                <td>SSH2</td>
                            </tr>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="SMI-S"/></td>
                                <td>SMI-S</td>
                            </tr>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="SNMPGET"/></td>
                                <td>SNMPGET</td>
                            </tr>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="REDFISH"/></td>
                                <td>REDFISH</td>
                            </tr>
                            <tr height="30">
                                <td><input type="checkbox" class="collect-type-list" value="SNMPTRAP"/></td>
                                <td>SNMPTRAP</td>
                            </tr>
                        </tbody>
                </table></div>`;
            layui.use('layer', function(){
                var layer = layui.layer;
                var layerIndex = layer.open({
                    title :'选择采集方式',
                    type: 1,  //1 页面；2 frame
                    move: false, //禁止拖动
                    maxmin: false,   //允许最大化
                    // closeBtn: true, //右上角的关闭按钮
                    area:["400px","335px"],   //弹出层大小
                    shade: 0.2,
                    shadeClose: false,
                    skin: 'layui-layer-lan',
                    anim: 3,
                    content: str,
                    success:function(){
                        $(".layui-layer-content").css({
                            height:"242px"
                        });
                        if($(".collect-type").val() != ""){
                            let arr = $(".collect-type").val().split("+");
                            for(let i = 0;i < arr.length;i ++){
                                for(let j = 0;j < $(".collect-type-list").length;j ++){
                                    if($(".collect-type-list")[j].value == arr[i]){
                                        $(".collect-type-list")[j].checked = true;
                                    }
                                }
                            }
                        }
                    },
                    btn:["确定"],
                    yes:function(index, layero){
                        let arr = [];
                        let arr2 = [];
                        for(let i = 0;i < $(".collect-type-list").length;i ++){
                            if($(".collect-type-list")[i].checked == true){
                                arr.push(1);
                                arr2.push($(".collect-type-list")[i].value)
                            }else{
                                arr.push(0)
                            }
                        }
                        if(arr.indexOf(1) == -1){
                            layer.alert("至少选择一种采集方式！",{
                                icon:7,
                                skin: 'layui-layer-molv',
                                closeBtn: false, //右上角的关闭按钮
                                shade: 0.2,
                                anim: 5
                            });
                            return;
                        }
                        $(".collect-type").val(arr2.join("+"));
                        let str1 = '';
                        for(let j = 0;j < arr2.length;j ++){
                            str1 += `<label><span class="front-name">${arr2[j]}端口：</span><input type="text" class="collect-port ${arr2[j]}Port" placeholder="填写${arr2[j]}端口"/></label>`
                        }
                        $(".collect-port-container").html(str1);
                        layer.close(index);
                    }
                })
            })
        });

        //悬浮显示数据
        $(".auto-collector-label").on("mouseover",function(){
            $(".auto-collector-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".auto-collector-label").on("mouseout",function(){
            $(".auto-collector-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".auto-collector-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".join-collector-label").on("mouseover",function(){
            $(".join-collector-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".join-collector-label").on("mouseout",function(){
            $(".join-collector-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".join-collector-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".join-factory-label").on("mouseover",function(){
            $(".join-factory-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".join-factory-label").on("mouseout",function(){
            $(".join-factory-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".join-factory-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".join-type-label").on("mouseover",function(){
            $(".join-type-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".join-type-label").on("mouseout",function(){
            $(".join-type-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".join-type-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".if-manage-label").on("mouseover",function(){
            $(".if-manage-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".if-manage-label").on("mouseout",function(){
            $(".if-manage-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".if-manage-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".if-desk-label").on("mouseover",function(){
            $(".if-desk-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".if-desk-label").on("mouseout",function(){
            $(".if-desk-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".if-desk-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".desk-collector-label").on("mouseover",function(){
            $(".desk-collector-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".desk-collector-label").on("mouseout",function(){
            $(".desk-collector-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".desk-collector-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".if-web-label").on("mouseover",function(){
            $(".if-web-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".if-web-label").on("mouseout",function(){
            $(".if-web-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".if-web-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".web-collector-label").on("mouseover",function(){
            $(".web-collector-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".web-collector-label").on("mouseout",function(){
            $(".web-collector-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".web-collector-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $(".if-fast-label").on("mouseover",function(){
            $(".if-fast-list").css({
                display:"block"
            });
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $(".if-fast-label").on("mouseout",function(){
            $(".if-fast-list").css({
                display:"none"
            });
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $(".if-fast-li").on("click",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        $("#join").on("mouseover",".fast-collect-div",function(){
            this.children[1].style.display = "block";
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $("#join").on("mouseout",".fast-collect-div",function(){
            this.children[1].style.display = "none";
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $("#join").on("click",".fast-collect-li",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });
        //悬浮结束

        //添加命令集
        $(".join-add-commands").on("click",function(){
            $($(".join-commands")[$(".join-commands").length-1]).after(`
                        <label class="join-commands"><span class="front-name">命令集：</span><input type="text" class="join-command1"/><input type="text" class="join-command2"/><span class="join-delete-commands">×</span></label>
                `)
        });
        //删除命令集
        $("#join").on("click",".join-delete-commands",function(){
            $(this).parent().remove();
        });

        //添加 manageIP2
        $(".join-add-manageIP2s").on("click",function(){
            $($(".join-manageIP2s")[$(".join-manageIP2s").length-1]).after(`
                        <label class="join-manageIP2s"><span class="front-name">管理IP2：</span><input type="text" class="join-manageIP2" placeholder="输入备用管理IP"/><span class="join-delete-manageIP2s">×</span></label>
                `)
        });
        //删除 manageIP2
        $("#join").on("click",".join-delete-manageIP2s",function(){
            $(this).parent().remove();
        });

        //添加 Us
        $("#join").on("click",".join-add-Us",function(){
            $($(".join-Us")[$(".join-Us").length-1]).after(`
                        <label class="join-Us"><span class="front-name">位置：</span><input type="text" class="join-position"  data-id="" placeholder="点击添加位置信息"/><span class="join-delete-Us">×</span><div style="margin-top:20px;"><span class="front-name">U位：</span><input type="text" class="join-U-start" placeholder="起始U位"/><input type="text" class="join-U-end" placeholder="结束U位"/></div></label>
                `)
        });
        //删除 Us
        $("#join").on("click",".join-delete-Us",function(){
            $(this).parent().remove();
        });

        //添加 transferports
        $(".join-add-transferports").on("click",function(){
            $($(".join-transferports")[$(".join-transferports").length-1]).after(`
                        <label class="join-transferports"><span class="front-name">端口转发：</span><input type="text" class="join-port1" placeholder="本地端口"/><input type="text" class="join-port2" placeholder="要映射的端口"/><span class="join-delete-transferports">×</span></label>
                `)
        });
        //删除 transferports
        $("#join").on("click",".join-delete-transferports",function(){
            $(this).parent().remove();
        });

        //添加 快捷指令
        $(".join-add-fasts").on("click",function(){
            $($(".join-fasts")[$(".join-fasts").length-1]).after(
                        '<label class="join-fasts"><span class="front-name">指令：</span>'+
                        '<div class="fast-collect-div"><input type="text" class="join-fast-collect" placeholder="采集方式"/>'+
                        '<ul class="fast-collect-list">'+
                        '<li class="fast-collect-li">IPMI</li>'+
                        '</ul>'+
                        '<a class="join-arrow"></a>'+
                        '</div>'+
                        '<input type="text" class="join-fast-name" placeholder="指令名称"/>'+
                        '<input type="text" class="join-fast-command" placeholder="指令"/>'+
                        '<span class="join-delete-fasts">×</span>'+
                        '</label>'
                )
        });
        //删除 快捷指令
        $("#join").on("click",".join-delete-fasts",function(){
            $(this).parent().remove();
        });

        //切换手动添加
        $(".handler").on("click",function(){
            $(".join-title2").html("手动添加");
            for(let i = 0 ; i < $(".join-body-bottom")[0].children.length; i ++){
                $(".join-body-bottom")[0].children[i].style.display = "none"
            }
            $(".join-body-top").css({
                display:"flex"
            });
            $(".step1-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step1").css({
                backgroundPosition : "0 0"
            });
            //还原数据
            //还原step1
            for(let i = 0;i < $(".step1-content label").length;i ++){
                $($(".step1-content label")[i].children[0]).removeClass('type-selected')
            }
            $($(".step1-content label")[0].children[0]).addClass('type-selected');
            //还原step2
            for(let j = 0;j < $(".step2-content input").length;j ++){
                $(".step2-content input")[j].value = ""
            }
            for(let j = 0;j < $(".join-tip").length;j ++){
                $(".join-tip")[j].style.display = "none"
            }
            flag2 = [false,false,false,false,false,false];
            //还原step3
            for(let k = 0; k < $(".step3-content input").length;k ++){
                $(".step3-content input")[k].value = ""
            }
            for(let k = 1;k < $(".join-commands").length;k ++){
                $($(".join-commands")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-manageIP2s").length;k ++){
                $($(".join-manageIP2s")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-Us").length;k ++){
                $($(".join-Us")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-transferports").length;k ++){
                $($(".join-transferports")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-fasts").length;k ++){
                $($(".join-fasts")[k]).remove();
                k --
            }
            $(".join-one").css({
                maxHeight:"none",
            });
            $(".join-two").css({
                maxHeight:"40px"
            });
            $(".join-three").css({
                maxHeight:"40px"
            });
            $(".join-four").css({
                maxHeight:"40px"
            });
            $(".join-five").css({
                maxHeight:"40px"
            });
            $(".updown").css({
                backgroundImage : "url('../resource/images/down.png')"
            });
            $(".join-one .updown").css({
                backgroundImage : "url('../resource/images/up.png')"
            });
            $(".collect-port-container").html("")
        });

        //切换自动发现
        $(".autofind").on("click",function(){
            $(".join-title2").html("IPMI自动发现");
            for(let i = 0 ; i < $(".join-body-bottom")[0].children.length; i ++){
                $(".join-body-bottom")[0].children[i].style.display = "none"
            }
            $(".join-body-top").css({
                display:"none"
            });
            $(".autofind-content").css({
                display:"block"
            });
            //还原数据
            $(".auto-startIP").val("");
            $(".auto-endIP").val("");
            $(".auto-collector").val("");
            $(".auto-username").val("");
            $(".auto-password").val("");
            $(".auto-confirm-password").val("");
            for(let j = 0;j < $(".join-tip").length;j ++){
                $(".join-tip")[j].style.display = "none"
            }
            autofindflag = [false,false,false,false,false,false]
        });

        //设备导入
        $(".entering").on("click",function(){
            let str = `<div style="height:90px;padding:30px 50px;">
                <form id="upLoadForm" name="upLoadForm">
                    <input type="file" id="upLoadExc"/>
                </form>
                <p style="height:30px;line-height:30px;margin:20px 0 0 5px;font-size:15px;">模板下载:
                    <a style="margin-left:7px;color:blue!important;" href="" download>Resource.xls</a></p>
                </div>`;
            layui.use('layer', function(){
                var layer = layui.layer;
                var layerIndex = layer.open({
                    title :'文件上传',
                    type: 1,  //1 页面；2 frame
                    move: false, //禁止拖动
                    maxmin: false,   //允许最大化
                    // closeBtn: true, //右上角的关闭按钮
                    area:["400px","245px"],   //弹出层大小
                    shade: 0.2,
                    shadeClose: false,
                    skin: 'layui-layer-lan',
                    anim: 3,
                    content: str,
                    success:function(){
                        $(".layui-layer-content").css({
                            height:"150px"
                        })
                    },
                    btn:["确定"],
                    yes:function(index, layero){
                        var name = $("#upLoadExc")[0].value;
                        var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
                        if(fileName !="xls" && fileName !="xlsx"){
                            alert("请选择execl格式文件上传！");
                            $("#upLoadExc")[0].value="";
                            return;
                        }else{
                            let form = document.getElementById('upLoadForm');
                            let formData = new FormData(form);
                            $.ajax({
                                url:"../resource/datas/data.json",
                                // url:"api/cabinetview/filesUpload",
                                type:"GET",  // 上传POST
                                processData: false,  // 不处理数据   //  formData 时启用
                                contentType: false,  // 不设置内容类型  //  formData 时启用
                                data:formData,
                                success:function(res){
                                    console.log(res)
                                },
                                error:function(){
                                    alert("上传失败！")
                                }
                            })
                        }
                        layer.close(index);
                    }
                })
            })
        });

        //step1  label按钮事件
        $(".step1-content").on("click","label",function(){
            for(let i = 0;i < $(this).siblings('label').length;i ++){
                $($(this).siblings('label')[i].children[0]).removeClass('type-selected')
            }
            $(this.children[0]).addClass('type-selected')
        });

        //step1下一步
        $(".next-step1").on("click",function(){
            $(".step1-content").css({
                display:"none"
            });
            $(".step2-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step2").css({
                backgroundPosition : "0 0"
            })
        });

        //step2上一步
        $(".prev-step2").on("click",function(){
            $(".step2-content").css({
                display:"none"
            });
            $(".step1-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step1").css({
                backgroundPosition : "0 0"
            })
        });

        //高级设置
        $(".higher-setting").on("click",function(){
            $(".step2-content").css({
                display:"none"
            });
            $(".step3-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step3").css({
                backgroundPosition : "0 0"
            })
        });

        //step2保存事件
        $(".save-step2").on("click",function(){
            //验证第二步内容
            if(flag2.indexOf(false) !== -1){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请完善信息！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            layer.close(index);
                        }
                    })
                });
                return;
            }else{
                OBJ1["deviceType"] = $(".type-selected").siblings("span").html();
                OBJ1["manageIP"] = $(".join-manageIP").val();
                OBJ1["businessIP"] = $(".join-businessIP").val();
                OBJ1["collector"] = $(".join-collector").val();
                OBJ1["manageUsername"] = $(".join-username").val();
                OBJ1["managePassword"] = $(".join-password").val();
                let arr = [];
                arr.push(OBJ1);
                if(JSON.stringify(OBJ2) !== "{}"){
                    arr.push(OBJ2);
                }
                // console.log(arr);
                axios.get("../resource/datas/data.json",{
                    params:{
                        joinMessage:JSON.stringify(arr)
                    }
                }).then(function(res){
                    // console.log(res)
                    layui.use('layer', function(){
                        var layer = layui.layer;
                        layer.alert("添加成功！",{
                            icon:6,
                            skin: 'layui-layer-molv',
                            closeBtn: false, //右上角的关闭按钮
                            shade: 0.2,
                            anim: 5,
                            btn: ['确定'],  //按钮s
                            yes: function(index, layero){  //第一个按钮的回调函数
                                hashHistory.push({
                                    pathname:"/monitor"
                                });
                                layer.close(index);
                            }
                        })
                    });

                },function(){
                    alert("添加失败！")
                })
            }
        });

        //验证第二步事件
        $(".join-manageIP").on("blur",function(){
            let manageIP = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(manageIP)){
                flag2[0] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[0] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".join-businessIP").on("blur",function(){
            let businessIP = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(businessIP)){
                flag2[1] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[1] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".join-collector").on("blur",function(){
            let collector = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(collector)){
                flag2[2] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[2] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".join-username").on("blur",function(){
            let username = this.value;
            if(username !== ""){
                flag2[3] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[3] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".join-password").on("blur",function(){
            let password = this.value;
            if(password !== ""){
                flag2[4] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[4] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".join-confirm-password").on("blur",function(){
            let confirm = this.value;
            if(confirm == $(".join-password").val()){
                flag2[5] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                flag2[5] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });

        //autofind开始事件
        $(".next-autofind").on("click",function(){
            //验证第二步内容
            if(autofindflag.indexOf(false) !== -1){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请完善信息！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5,
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            layer.close(index);
                        }
                    })
                });
                return;
            }else{
                axios.get("../resource/datas/data.json",{
                    params:{
                        autoStartIP:$(".auto-startIP").val(),
                        autoEndIP:$(".auto-endIP").val(),
                        autoCollector:$(".auto-collector").val(),
                        autoUsername:$(".auto-username").val(),
                        autoPassword:$(".auto-password").val()
                    }
                }).then(function(res){
                    // console.log(res)
                    layui.use('layer', function(){
                        var layer = layui.layer;
                        layer.alert("自动发现成功！",{
                            icon:6,
                            skin: 'layui-layer-molv',
                            closeBtn: false, //右上角的关闭按钮
                            shade: 0.2,
                            anim: 5,
                            btn: ['确定'],  //按钮s
                            yes: function(index, layero){  //第一个按钮的回调函数
                                layer.close(index);
                            }
                        })
                    });

                    //未发现设备

                },function(){
                    alert("自动发现失败！")
                })
            }
        });

        //验证autofind
        $(".auto-startIP").on("blur",function(){
            let manageIP = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(manageIP)){
                autofindflag[0] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[0] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".auto-endIP").on("blur",function(){
            let businessIP = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(businessIP)){
                autofindflag[1] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[1] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".auto-collector").on("blur",function(){
            let collector = this.value;
            let reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
            if(reg.test(collector)){
                autofindflag[2] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[2] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".auto-username").on("blur",function(){
            let username = this.value;
            if(username !== ""){
                autofindflag[3] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[3] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".auto-password").on("blur",function(){
            let password = this.value;
            if(password !== ""){
                autofindflag[4] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[4] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });
        $(".auto-confirm-password").on("blur",function(){
            let confirm = this.value;
            if(confirm == $(".auto-password").val()){
                autofindflag[5] = true;
                $(this).siblings('.join-tip').css({
                    display:"none"
                })
            }else{
                autofindflag[5] = false;
                $(this).siblings('.join-tip').css({
                    display:"inline"
                })
            }
        });

        //step3上一步  放弃设置
        $(".prev-step3").on("click",function(){
            $(".step3-content").css({
                display:"none"
            });
            $(".step2-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step2").css({
                backgroundPosition : "0 0"
            });
            //清除高级设置数据
            //还原step3
            for(let k = 0; k < $(".step3-content input").length;k ++){
                $(".step3-content input")[k].value = ""
            }
            for(let k = 1;k < $(".join-commands").length;k ++){
                $($(".join-commands")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-manageIP2s").length;k ++){
                $($(".join-manageIP2s")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-Us").length;k ++){
                $($(".join-Us")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-transferports").length;k ++){
                $($(".join-transferports")[k]).remove();
                k --
            }
            for(let k = 1;k < $(".join-fasts").length;k ++){
                $($(".join-fasts")[k]).remove();
                k --
            }
            $(".join-one").css({
                maxHeight:"none",
            });
            $(".join-two").css({
                maxHeight:"40px"
            });
            $(".join-three").css({
                maxHeight:"40px"
            });
            $(".join-four").css({
                maxHeight:"40px"
            });
            $(".join-five").css({
                maxHeight:"40px"
            });
            $(".updown").css({
                backgroundImage : "url('../resource/images/down.png')"
            });
            $(".join-one .updown").css({
                backgroundImage : "url('../resource/images/up.png')"
            });
            $(".collect-port-container").html("");
            OBJ2 = {}
        });

        //step3下一步  设置完成
        $(".next-step3").on("click",function(){
            //验证高级设置数据
            if($(".collect-type").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请选择采集方式！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
            if($(".join-factory").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请选择厂商！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
            if($(".join-type").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请选择型号！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
            if($(".join-symbol").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请填写提示符！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }

            //包装数据 OBJ2
            //采集
            OBJ2["collectType"] = $(".collect-type").val();
            let obj = {};
            for(let i = 0;i < $(".collect-port").length;i ++){
                let portname = $(".collect-port")[i].className.split(" ")[1];
                obj[portname] = $(".collect-port")[i].value
            }
            OBJ2["collectPort"] = obj;
            OBJ2["joinFactory"] = $(".join-factory").val();
            OBJ2["joinType"] = $(".join-type").val();
            OBJ2["joinSymbol"] = $(".join-symbol").val();
            let arr = [];
            for(let i = 0;i < $(".join-commands").length;i ++){
                let obj = {};
                obj["command1"] = $($(".join-commands")[i]).find(".join-command1").val();
                obj["command2"] = $($(".join-commands")[i]).find(".join-command2").val();
                arr.push(obj)
            }
            OBJ2["command"] = arr;
            //属性
            let arr1 = [];
            for(let i = 0;i < $(".join-manageIP2s").length;i ++){
                arr1.push($($(".join-manageIP2s")[i]).find(".join-manageIP2").val())
            }
            OBJ2["manageIP2"] = arr1;
            OBJ2["master"] = $(".join-master").val();
            OBJ2["fatherManageIP"] = $(".join-father-manageIP").val();
            OBJ2["fatherBusinessIP"] = $(".join-father-businessIP").val();
            OBJ2["concat"] = $(".join-concat").val();
            OBJ2["repair"] = $(".join-repair").val();
            OBJ2["endDate"] = $(".join-end-date").val();
            OBJ2["businessSys"] = $(".join-business-sys").attr("data-id");
            let arr2 = [];
            for(let i = 0;i < $(".join-Us").length;i ++){
                let obj = {};
                obj["cabinetId"] = $($(".join-Us")[i]).find(".join-position").attr("data-id");
                obj["start"] = $($(".join-Us")[i]).find(".join-U-start").val();
                obj["end"] = $($(".join-Us")[i]).find(".join-U-end").val();
                arr2.push(obj);
            }
            OBJ2["position"] = arr2;
            OBJ2["ifManage"] = $(".join-if-manage").val();
            //远程桌面
            OBJ2["ifDesk"] = $(".join-if-desk").val();
            OBJ2["KVMPort"] = $(".KVM-port").val();
            OBJ2["deskCollector"] = $(".desk-collector").val();
            //远程WEB
            OBJ2["ifWeb"] = $(".join-if-web").val();
            OBJ2["webCollector"] = $(".web-collector").val();
            OBJ2["manageURL"] = $(".join-URL").val();
            OBJ2["localport"] = $(".join-localport").val();
            let arr3 = [];
            for(let i = 0;i < $(".join-transferports").length;i ++){
                let obj = {};
                obj["port1"] = $($(".join-transferports")[i]).find(".join-port1").val();
                obj["port2"] = $($(".join-transferports")[i]).find(".join-port2").val();
                arr3.push(obj);
            }
            OBJ2["transferport"] = arr3;
            //快捷指令
            OBJ2["ifFast"] = $(".join-if-fast").val();
            let arr4 = [];
            for(let i = 0;i < $(".join-fasts").length;i ++){
                let obj = {};
                obj["fastCollect"] = $($(".join-fasts")[i]).find(".join-fast-collect").val();
                obj["fastName"] = $($(".join-fasts")[i]).find(".join-fast-name").val();
                obj["fastCommand"] = $($(".join-fasts")[i]).find(".join-fast-command").val();
                arr4.push(obj);
            }
            OBJ2["fast"] = arr4;

            // console.log(OBJ2)

            //返回step2
            $(".step3-content").css({
                display:"none"
            });
            $(".step2-content").css({
                display:"block"
            });
            for(let i = 0 ; i < $(".join-body-top")[0].children.length;i ++){
                $(".join-body-top")[0].children[i].style.backgroundPosition = "0 -34px"
            }
            $(".step2").css({
                backgroundPosition : "0 0"
            })
        });

        //step3展开折叠事件
        $(".updown").on("click",function(){
            if(this.parentNode.style.maxHeight == "40px"){
                this.parentNode.style.maxHeight = "none";
                this.style.backgroundImage = "url('../resource/images/up.png')"
            }else{
                this.parentNode.style.maxHeight = "40px";
                this.style.backgroundImage = "url('../resource/images/down.png')"
            }
        });

        //联系人点击事件
        $(".join-concat").on("click",function(evt){
            axios.get("../resource/datas/concat.json").then(function(res){
                // console.log(res.data)
                let str0 = '';
                res.data.map((item,index)=>{
                    str0 += `<tr height='30'>
                                <td><input type="checkbox" class="concat-list" value="${item.name}"/></td>
                                <td>${item.name}</td>
                                <td>${item.tel}</td>
                                <td>${item.email}</td>
                        </tr>`
                });
                let str1 = `
                    <div style="max-height:182px;"><table frame="hsides" border="1" style="text-align:center;width:100%;">
                        <thead style="background:#cfe6fd;linear-gradient(to top, #cfe6fd, #cfe6fd);color:#666;">
                            <th height="30" width="40"></th>
                            <th>姓名</th>
                            <th>电话</th>
                            <th>eMail</th>
                        </thead>
                        <tbody>
                        ${str0}
                        </tbody>
                    </table></div>`;
                let str2 = `<label style="display:block;height:50px;line-height:50px;font-size:15px;padding-left:100px;margin-top:15px;">
                        <span class="nece"></span>姓名：
                        <input class="concat-name" type="text" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:50px;line-height:50px;font-size:15px;padding-left:100px;">
                        <span class="nece"></span>电话：
                        <input class="concat-tel" type="text" style="margin-left:5px;height:25px;"/></label>
                        <label style="display:block;height:50px;line-height:50px;font-size:15px;padding-left:94px;">
                        <span class="nece"></span>eMail：
                        <input class="concat-email" type="text" style="margin-left:5px;height:25px;"/></label>`;
                layui.use('layer', function(){
                    var layer = layui.layer;
                    var layerIndex = layer.open({
                        title :'联系人配置',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: true, //右上角的关闭按钮
                        area:["500px","275px"],   //弹出层大小
                        shade: 0.2,
                        shadeClose: false,
                        skin: 'layui-layer-lan',
                        anim: 3,
                        content: str1,
                        success:function(){
                            $(".layui-layer-content").css({
                                height:"182px"
                            });
                            if($(".join-concat").val() != ""){
                                let arr = $(".join-concat").val().split(",");
                                for(let i = 0;i < arr.length;i ++){
                                    for(let j = 0;j < $(".concat-list").length;j ++){
                                        if($(".concat-list")[j].value == arr[i]){
                                            $(".concat-list")[j].checked = true;
                                        }
                                    }
                                }
                            }
                        },
                        btn:["确定","新建"],
                        yes:function(index, layero){
                            let arr = [];
                            let arr2 = [];
                            for(let i = 0;i < $(".concat-list").length;i ++){
                                if($(".concat-list")[i].checked == true){
                                    arr.push(1);
                                    arr2.push($(".concat-list")[i].value)
                                }else{
                                    arr.push(0)
                                }
                            }
                            if(arr.indexOf(1) == -1){
                                layer.alert("至少选择一位联系人！",{
                                    icon:7,
                                    skin: 'layui-layer-molv',
                                    closeBtn: false, //右上角的关闭按钮
                                    shade: 0.2,
                                    anim: 5
                                });
                                return;
                            }
                            $(".join-concat").val(arr2.join(","));
                            layer.close(index);
                        },
                        btn2:function(){
                            var layerIndex2 = layer.open({
                                title :'新建联系人',
                                type: 1,  //1 页面；2 frame
                                move: false, //禁止拖动
                                maxmin: false,   //允许最大化
                                // closeBtn: true, //右上角的关闭按钮
                                area:["500px","275px"],   //弹出层大小
                                shade: 0.2,
                                shadeClose: false,
                                skin: 'layui-layer-lan',
                                anim: 3,
                                content: str2,
                                btn:["确定"],
                                yes:function(index, layero){
                                    if($(".concat-name").val() == ""){
                                        layer.alert("姓名不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    if($(".concat-tel").val() == ""){
                                        layer.alert("电话不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    if($(".concat-email").val() == ""){
                                        layer.alert("邮箱不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    layer.close(index);
                                    //发送数据
                                    axios.get("../resource/datas/concat.json",{
                                        params:{
                                            name:$(".concat-name").val(),
                                            tel:$(".concat-tel").val(),
                                            email:$(".concat-email").val()
                                        }
                                    }).then(function(){
                                        layer.alert("新建联系人成功！",{
                                            icon:6,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    },function(){
                                        layer.alert("新建联系人失败！",{
                                            icon:5,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    })
                                }
                            });
                        }//btn2
                    });
                });
            },function(){
                console.log("获取联系人失败")
            })
        });//点击获取联系人事件结束

        //点击业务系统事件
        $(".join-business-sys").on("click",function(){
            axios.get("../resource/datas/businesssys.json").then(function(res){
                // console.log(res.data)
                let str0 = '';
                res.data.map((item,index)=>{
                    str0 += `<tr height='30'>
                                <td><input type="checkbox" class="businesssys-list" data-id="${item.bussinessId}" value="${item.name}"/></td>
                                <td>${item.name}</td>
                        </tr>`
                });
                let str1 = `
                    <div style="max-height:242px;padding:20px;"><table border="1" style="text-align:center;width:100%;">
                        <thead style="background:#cfe6fd;linear-gradient(to top, #cfe6fd, #cfe6fd);color:#666;">
                            <th height="30" width="40"></th>
                            <th>名称</th>
                        </thead>
                        <tbody>
                        ${str0}
                        </tbody>
                    </table></div>`;
                let str2 = `<label style="display:block;height:50px;line-height:50px;font-size:15px;padding-left:100px;margin-top:30px;">
                        <span class="nece"></span>名称：
                        <input class="businesssys-name" type="text" style="margin-left:5px;height:25px;"/></label>`;
                layui.use('layer', function(){
                    var layer = layui.layer;
                    var layerIndex = layer.open({
                        title :'业务系统配置',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: true, //右上角的关闭按钮
                        area:["500px","335px"],   //弹出层大小
                        shade: 0.2,
                        shadeClose: false,
                        skin: 'layui-layer-lan',
                        anim: 3,
                        content: str1,
                        success:function(){
                            $(".layui-layer-content").css({
                                height:"242px"
                            });
                            if($(".join-business-sys").val() != ""){
                                let arr = $(".join-business-sys").attr("data-id");
                                for(let j = 0;j < $(".businesssys-list").length;j ++){
                                    if($($(".businesssys-list")[j]).attr("data-id") == arr){
                                        $(".businesssys-list")[j].checked = true;
                                    }
                                }
                            }
                            $(".businesssys-list").on("click",function(){
                                for(let k = 0;k < $(".businesssys-list").length;k ++){
                                    $(".businesssys-list")[k].checked = false;
                                }
                                this.checked = true;
                            })
                        },
                        btn:["确定","新增"],
                        yes:function(index, layero){
                            let arr = [];
                            for(let i = 0;i < $(".businesssys-list").length;i ++){
                                if($(".businesssys-list")[i].checked == true){
                                    arr.push(1);
                                    $(".join-business-sys").attr("data-id",($($(".businesssys-list")[i]).attr("data-id")));
                                    $(".join-business-sys").val($(".businesssys-list")[i].value)
                                }else{
                                    arr.push(0)
                                }
                            }
                            if(arr.indexOf(1) == -1){
                                layer.alert("请选择业务系统！",{
                                    icon:7,
                                    skin: 'layui-layer-molv',
                                    closeBtn: false, //右上角的关闭按钮
                                    shade: 0.2,
                                    anim: 5
                                });
                                return;
                            }
                            layer.close(index);
                        },
                        btn2:function(){
                            var layerIndex2 = layer.open({
                                title :'新增业务系统',
                                type: 1,  //1 页面；2 frame
                                move: false, //禁止拖动
                                maxmin: false,   //允许最大化
                                // closeBtn: true, //右上角的关闭按钮
                                area:["500px","225px"],   //弹出层大小
                                shade: 0.2,
                                shadeClose: false,
                                skin: 'layui-layer-lan',
                                anim: 3,
                                content: str2,
                                btn:["确定"],
                                yes:function(index, layero){
                                    if($(".businesssys-name").val() == ""){
                                        layer.alert("名称不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    layer.close(index);
                                    //发送数据
                                    axios.get("../resource/datas/businesssys.json",{
                                        params:{
                                            name:$(".businesssys-name").val()
                                        }
                                    }).then(function(){
                                        layer.alert("新增业务系统成功！",{
                                            icon:6,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    },function(){
                                        layer.alert("新增业务系统失败！",{
                                            icon:5,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    })
                                }
                            });
                        }//btn2
                    })//open
                })//layer.use
            },function(){
                console.log("获取业务系统失败")
            })
        });//点击业务系统事件结束

        //点击位置事件
        $("#join").on("click",".join-position",function(evt){
            let that = this;
            axios.get("../resource/datas/position.json").then(function(res){
                // console.log(res.data)
                let str0 = '';
                res.data.map((item,index)=>{
                    str0 += `<tr height='30'>
                                <td><input type="checkbox" class="position-list" data-id="${item.cabinetId}"/></td>
                                <td class="dataCenter">${item.dataCenter}</td>
                                <td class="dataRoom">${item.dataRoom}</td>
                                <td class="dataRowCol">${item.dataRowCol}</td>
                                <td class="dataCab">${item.dataCab}</td>
                        </tr>`
                });
                let str1 = `
                    <div style="max-height:242px;"><table frame="hsides" border="1" style="text-align:center;width:100%;">
                        <thead style="background:#cfe6fd;linear-gradient(to top, #cfe6fd, #cfe6fd);color:#666;">
                            <th height="30" width="40"></th>
                            <th>数据中心</th>
                            <th>机房名称</th>
                            <th>行列</th>
                            <th>机柜</th>
                        </thead>
                        <tbody>
                        ${str0}
                        </tbody>
                    </table></div>`;
                let str2 = `<label class="position-dataCenter-label" style="display:block;margin:20px 0;width:360px;height:30px;line-height:30px;font-size:15px;position:relative;">
                        <span class="before-name"><span class="nece"></span>数据中心名称：</span>
                        <input class="position-dataCenter" disabled type="text"/>
                        <ul class="position-dataCenter-list">
                            <li class="position-dataCenter-li">国家电网</li>
                            <li class="position-dataCenter-li">集团</li>
                            <li class="position-dataCenter-li">测试</li>
                        </ul>
                        <span class="arrowB"></span>
                        </label>
                        <label class="position-dataRoom-label" style="display:block;margin:20px 0;width:360px;height:30px;line-height:30px;font-size:15px;position:relative;">
                        <span class="before-name"><span class="nece"></span>机房名称：</span>
                        <input class="position-dataRoom" disabled type="text"/>
                        <ul class="position-dataRoom-list">
                            <li class="position-dataRoom-li">A1</li>
                            <li class="position-dataRoom-li">A2</li>
                            <li class="position-dataRoom-li">A3</li>
                        </ul>
                        <span class="arrowB"></span>
                        </label>
                        <label class="position-dataRowCol-label" style="display:block;margin:20px 0;width:360px;height:30px;line-height:30px;font-size:15px;position:relative;">
                        <span class="before-name"><span class="nece"></span>行列：</span>
                        <input class="position-dataRowCol" disabled type="text"/>
                        <ul class="position-dataRowCol-list">
                            <li class="position-dataRowCol-li">B1</li>
                            <li class="position-dataRowCol-li">B2</li>
                            <li class="position-dataRowCol-li">B3</li>
                        </ul>
                        <span class="arrowB"></span>
                        </label>
                        <label style="display:block;margin:20px 0;width:360px;height:30px;line-height:30px;font-size:15px;">
                        <span class="before-name">机柜：</span>
                        <input class="position-dataCab" type="text"/></label>`;
                layui.use('layer', function(){
                    var layer = layui.layer;
                    var layerIndex = layer.open({
                        title :'位置配置',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: true, //右上角的关闭按钮
                        area:["500px","335px"],   //弹出层大小
                        shade: 0.2,
                        shadeClose: false,
                        skin: 'layui-layer-lan',
                        anim: 3,
                        content: str1,
                        success:function(){
                            $(".layui-layer-content").css({
                                height:"242px"
                            });
                            if($(that).val() != ""){
                                let arr = $(that).attr("data-id");
                                for(let j = 0;j < $(".position-list").length;j ++){
                                    if($($(".position-list")[j]).attr("data-id") == arr){
                                        $(".position-list")[j].checked = true;
                                    }
                                }
                            }
                            $(".position-list").on("click",function(){
                                for(let k = 0;k < $(".position-list").length;k ++){
                                    $(".position-list")[k].checked = false;
                                }
                                this.checked = true;
                            })
                        },
                        btn:["确定","新增"],
                        yes:function(index, layero){
                            let arr = [];
                            let arr2 = [];
                            for(let i = 0;i < $(".position-list").length;i ++){
                                if($(".position-list")[i].checked == true){
                                    arr.push(1);
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataRoom").html())
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataRowCol").html())
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataCab").html())
                                    $(that).attr("data-id",$($(".position-list")[i]).attr("data-id"));
                                    $(that).val(arr2.join(">"));
                                }else{
                                    arr.push(0)
                                }
                            }
                            if(arr.indexOf(1) == -1){
                                layer.alert("请选择位置！",{
                                    icon:7,
                                    skin: 'layui-layer-molv',
                                    closeBtn: false, //右上角的关闭按钮
                                    shade: 0.2,
                                    anim: 5
                                });
                                return;
                            }
                            layer.close(index);
                        },
                        btn2:function(){
                            var layerIndex2 = layer.open({
                                title :'新增位置',
                                type: 1,  //1 页面；2 frame
                                move: false, //禁止拖动
                                maxmin: false,   //允许最大化
                                // closeBtn: true, //右上角的关闭按钮
                                area:["500px","375px"],   //弹出层大小
                                shade: 0.2,
                                shadeClose: false,
                                skin: 'layui-layer-lan',
                                anim: 3,
                                content: str2,
                                success:function(){
                                    $(".position-dataCenter-label").on("mouseover",function(){
                                        $(".position-dataCenter-list").css({
                                            display:"block"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "transparent transparent #707070",
                                            top : "3px"
                                        })
                                    });
                                    $(".position-dataCenter-label").on("mouseout",function(){
                                        $(".position-dataCenter-list").css({
                                            display:"none"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "#707070 transparent transparent",
                                            top : "11px"
                                        })
                                    });
                                    $(".position-dataCenter-li").on("click",function(){
                                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                                    });
                                    $(".position-dataRoom-label").on("mouseover",function(){
                                        $(".position-dataRoom-list").css({
                                            display:"block"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "transparent transparent #707070",
                                            top : "3px"
                                        })
                                    });
                                    $(".position-dataRoom-label").on("mouseout",function(){
                                        $(".position-dataRoom-list").css({
                                            display:"none"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "#707070 transparent transparent",
                                            top : "11px"
                                        })
                                    });
                                    $(".position-dataRoom-li").on("click",function(){
                                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                                    });
                                    $(".position-dataRowCol-label").on("mouseover",function(){
                                        $(".position-dataRowCol-list").css({
                                            display:"block"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "transparent transparent #707070",
                                            top : "3px"
                                        })
                                    });
                                    $(".position-dataRowCol-label").on("mouseout",function(){
                                        $(".position-dataRowCol-list").css({
                                            display:"none"
                                        });
                                        $(this).find(".arrowB").css({
                                            borderColor : "#707070 transparent transparent",
                                            top : "11px"
                                        })
                                    });
                                    $(".position-dataRowCol-li").on("click",function(){
                                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                                    })
                                },
                                btn:["确定"],
                                yes:function(index, layero){
                                    if($(".position-dataCenter").val() == ""){
                                        layer.alert("数据中心名称不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    if($(".position-dataRoom").val() == ""){
                                        layer.alert("机房名称不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    if($(".position-dataRowCol").val() == ""){
                                        layer.alert("行列不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    if($(".position-dataCab").val() == ""){
                                        layer.alert("机柜不能为空！",{
                                            icon:7,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        });
                                        return;
                                    }
                                    layer.close(index);
                                    //发送数据
                                    axios.get("../resource/datas/position.json",{
                                        params:{
                                            dataCenter:$(".position-dataCenter").val(),
                                            dataRoom:$(".position-dataRoom").val(),
                                            dataRowCol:$(".position-dataRowCol").val(),
                                            dataCab:$(".position-dataCab").val()
                                        }
                                    }).then(function(){
                                        layer.alert("新增位置成功！",{
                                            icon:6,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    },function(){
                                        layer.alert("新增位置失败！",{
                                            icon:5,
                                            skin: 'layui-layer-molv',
                                            closeBtn: false, //右上角的关闭按钮
                                            shade: 0.2,
                                            anim: 5
                                        })
                                    })
                                }
                            });
                        }//btn2
                    })//open
                })//layer.use
            },function(){
                console.log("获取位置失败")
            })
        })//点击业务系统事件结束

    }//componentDidMount

    //获取数据 下拉列表数据
    loadDatas(){

    }//loadDatas
}

export default Join;
