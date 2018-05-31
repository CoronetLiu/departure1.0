/*
* Author: CoronetLiu   2018/4/17
*/

// 'use strict';

import Menu from "../menu/Menu.js"
import './MonitorModify.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";

let arr0 = []; //包装数据
let OBJ1 = {}; //数据一
let OBJ2 = {}; //数据二

class MonitorModify extends React.Component {
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
                <Menu content1="监控" content2="设备监控" content22="/monitor" content3="资源调整"/>
                <div id="main-right">
                    <div id="monitor-modify">
                        <div id="join-container">
                            <div className="join-body">
                                <div className="join-body-top">
                                    <p>{this.state.manageIP}的资源调整    >>></p>
                                </div>
                                <div className="join-body-bottom">
                                    <div className="step2-content">
                                        <div className="join-zero">
                                            <div className="updown"></div>
                                            <p>管理口信息</p>
                                            <label><span className="front-name"><span className="nece"></span>管理IP：</span>
                                                <input type="text" className="join-manageIP" name="join-manageIP" placeholder="请输入设备管理IP"/>
                                                <em className="join-tip" style={{display:"none"}}>管理IP不合法！</em>
                                            </label>
                                            <label><span className="front-name"><span className="nece"></span>用户名：</span>
                                                <input type="text" className="join-username" name="join-username" placeholder="请输入管理口用户名"/>
                                                <em className="join-tip" style={{display:"none"}}>用户名不能为空！</em>
                                            </label>
                                            <label><span className="front-name"><span className="nece"></span>密码：</span>
                                                <input type="password" className="join-password" name="join-password" placeholder="请输入管理口密码"/>
                                                <em className="join-tip" style={{display:"none"}}>密码不能为空！</em>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="step3-content">
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
                                                <input type="text" className="join-business-sys" placeholder="选择或新增业务系统"/>
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
                                        <button className="layui-btn layui-btn-normal modify-save">保存</button>
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
        let that = this;
        this.showData();
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
        $("#monitor-modify").on("mouseover",".fast-collect-div",function(){
            this.children[1].style.display = "block";
            this.lastChild.style.borderColor = "transparent transparent #707070";
            this.lastChild.style.top = "3px";
        });
        $("#monitor-modify").on("mouseout",".fast-collect-div",function(){
            this.children[1].style.display = "none";
            this.lastChild.style.borderColor = "#707070 transparent transparent";
            this.lastChild.style.top = "11px";
        });
        $("#monitor-modify").on("click",".fast-collect-li",function(){
            this.parentNode.previousSibling.value = this.innerHTML
        });

        //添加命令集
        $(".join-add-commands").on("click",function(){
            $($(".join-commands")[$(".join-commands").length-1]).after(`
                        <label class="join-commands"><span class="front-name">命令集：</span><input type="text" class="join-command1"/><input type="text" class="join-command2"/><span class="join-delete-commands">×</span></label>
                `)
        });
        //删除命令集
        $("#monitor-modify").on("click",".join-delete-commands",function(){
            $(this).parent().remove();
        });

        //添加 manageIP2
        $(".join-add-manageIP2s").on("click",function(){
            $($(".join-manageIP2s")[$(".join-manageIP2s").length-1]).after(`
                        <label class="join-manageIP2s"><span class="front-name">管理IP2：</span><input type="text" class="join-manageIP2" placeholder="输入备用管理IP"/><span class="join-delete-manageIP2s">×</span></label>
                `)
        });
        //删除 manageIP2
        $("#monitor-modify").on("click",".join-delete-manageIP2s",function(){
            $(this).parent().remove();
        });

        //添加 Us
        $("#monitor-modify").on("click",".join-add-Us",function(){
            $($(".join-Us")[$(".join-Us").length-1]).after(`
                        <label class="join-Us"><span class="front-name">位置：</span><input type="text" class="join-position" data-id="" placeholder="点击添加位置信息"/><span class="join-delete-Us">×</span><div style="margin-top:20px;"><span class="front-name">U位：</span><input type="text" class="join-U-start" placeholder="起始U位"/><input type="text" class="join-U-end" placeholder="结束U位"/></div></label>
                `)
        });
        //删除 Us
        $("#monitor-modify").on("click",".join-delete-Us",function(){
            $(this).parent().remove();
        });

        //添加 transferports
        $(".join-add-transferports").on("click",function(){
            $($(".join-transferports")[$(".join-transferports").length-1]).after(`
                        <label class="join-transferports"><span class="front-name">端口转发：</span><input type="text" class="join-port1" placeholder="本地端口"/><input type="text" class="join-port2" placeholder="要映射的端口"/><span class="join-delete-transferports">×</span></label>
                `)
        });
        //删除 transferports
        $("#monitor-modify").on("click",".join-delete-transferports",function(){
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
        $("#monitor-modify").on("click",".join-delete-fasts",function(){
            $(this).parent().remove();
        });

        //step3展开折叠事件
        $(".updown").on("click",function(){
            if(this.parentNode.style.maxHeight == "40px"){
                this.parentNode.style.maxHeight = "none";
                this.style.backgroundImage = "url('./assets/images/up.png')"
            }else{
                this.parentNode.style.maxHeight = "40px";
                this.style.backgroundImage = "url('./assets/images/down.png')"
            }
        });

        //联系人点击事件
        $(".join-concat").on("click",function(evt){
            axios.get("./assets/datas/concat.json").then(function(res){
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
                                    axios.get("./assets/datas/concat.json",{
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
            axios.get("./assets/datas/businesssys.json").then(function(res){
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
                                    axios.get("./assets/datas/businesssys.json",{
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
        $("#monitor-modify").on("click",".join-position",function(evt){
            let that = this;
            axios.get("./assets/datas/position.json").then(function(res){
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
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataRoom").html());
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataRowCol").html());
                                    arr2.push($($(".position-list")[i]).parent().parent().find(".dataCab").html());
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
                                    axios.get("./assets/datas/position.json",{
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
        });//点击业务系统事件结束

        //保存事件
        $(".modify-save").on("click",function(){
            if($(".join-manageIP").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请填写管理IP！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
            if($(".join-username").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请填写用户名！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
            if($(".join-password").val() == ""){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("请填写密码！",{
                        icon:7,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                });
                return;
            }
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
            that.packData(); //包装数据
            console.log(arr0)
            axios.get("./assets/datas/modify.json",{
                params:{
                    modifyMessage:JSON.stringify(arr0)
                }
            }).then(function(res){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("修改成功",{
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
                })
            },function(){
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.alert("修改失败！",{
                        icon:5,
                        skin: 'layui-layer-molv',
                        closeBtn: false, //右上角的关闭按钮
                        shade: 0.2,
                        anim: 5
                    })
                })
            })
        })//保存事件结束

    }//componentDidMount

    packData(){
        // OBJ1["deviceType"] = $(".type-selected").siblings("span").html();
        OBJ1["manageIP"] = $(".join-manageIP").val();
        // OBJ1["businessIP"] = $(".join-businessIP").val();
        // OBJ1["collector"] = $(".join-collector").val();
        OBJ1["manageUsername"] = $(".join-username").val();
        OBJ1["managePassword"] = $(".join-password").val();
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
        //包装完成
        arr0.push(OBJ1);
        arr0.push(OBJ2);
    }

    //回显数据
    showData(){
        axios.get("./assets/datas/modify.json").then(function(res){
            console.log(res.data);
            let obj1 = res.data[0];
            let obj2 = res.data[1];
            //管理口
            $(".join-manageIP").val(obj1.manageIP);
            $(".join-username").val(obj1.manageUsername);
            $(".join-password").val(obj1.managePassword);
            //采集
            $(".collect-type").val(obj2.collectType);
            let str1 = '';
            for(var key in obj2.collectPort){
                str1 += `<label><span class="front-name">${key.split("Port")[0]}端口：</span><input type="text" class="collect-port ${key}Port" value="${obj2.collectPort[key]}" placeholder="填写${key.split("Port")[0]}端口"/></label>`
            }
            $(".collect-port-container").html(str1);
            $(".join-factory").val(obj2.joinFactory);
            $(".join-type").val(obj2.joinType);
            $(".join-symbol").val(obj2.joinSymbol);
            if(obj2.command.length){
                $($(".join-commands")[0]).find(".join-command1").val(obj2.command[0].command1);
                $($(".join-commands")[0]).find(".join-command2").val(obj2.command[0].command2);
                for(let i = 1;i < obj2.command.length;i ++){
                    $($(".join-commands")[$(".join-commands").length-1]).after(`
                        <label class="join-commands"><span class="front-name">命令集：</span><input type="text" class="join-command1" value="${obj2.command[i].command1}"/><input type="text" class="join-command2" value="${obj2.command[i].command2}"/><span class="join-delete-commands">×</span></label>
                        `)
                }
            }
            //属性
            if(obj2.manageIP2.length){
                $($(".join-manageIP2s")[0]).find(".join-manageIP2").val(obj2.manageIP2[0]);
                for(let i = 1;i < obj2.manageIP2.length;i ++){
                    $($(".join-manageIP2s")[$(".join-manageIP2s").length-1]).after(`
                        <label class="join-manageIP2s"><span class="front-name">管理IP2：</span><input type="text" class="join-manageIP2" value="${obj2.manageIP2[i]}" placeholder="输入备用管理IP"/><span class="join-delete-manageIP2s">×</span></label>
                        `)
                }
            }
            $(".join-master").val(obj2.master);
            $(".join-father-manageIP").val(obj2.fatherManageIP);
            $(".join-father-businessIP").val(obj2.fatherBusinessIP);
            $(".join-concat").val(obj2.concat);
            $(".join-repair").val(obj2.repair);
            $(".join-end-date").val(obj2.endDate);
            $(".join-business-sys").attr("data-id",obj2.businessSys);
            if(obj2.businessSys){
                axios.get("./assets/datas/businesssys.json").then(function(res){
                    res.data.map((item,index) => {
                        if(item.bussinessId == obj2.businessSys){
                            $(".join-business-sys").val(item.name)
                        }
                    })
                },function(){
                    console.log("读取业务系统信息时失败")
                })
            }
            if(obj2.position.length){
                axios.get("./assets/datas/position.json").then(function(res){
                    res.data.map((item,index) => {
                        if(item.cabinetId == obj2.position[0].cabinetId){
                            let arr = [];
                            arr.push(item.dataRoom);
                            arr.push(item.dataRowCol);
                            arr.push(item.dataCab);
                            $($(".join-Us")[0]).find(".join-position").val(arr.join(">"));
                            $($(".join-Us")[0]).find(".join-position").attr("data-id",obj2.position[0].cabinetId);
                            $($(".join-Us")[0]).find(".join-U-start").val(obj2.position[0].start);
                            $($(".join-Us")[0]).find(".join-U-end").val(obj2.position[0].end);
                        }
                        for(let i = 1;i < obj2.position.length;i ++){
                            if(item.cabinetId == obj2.position[i].cabinetId){
                                let arr = [];
                                arr.push(item.dataRoom);
                                arr.push(item.dataRowCol);
                                arr.push(item.dataCab);
                                let di = arr.join(">")
                                $($(".join-Us")[$(".join-Us").length-1]).after(`
                                <label class="join-Us"><span class="front-name">位置：</span><input type="text" class="join-position" value="${di}" data-id="${obj2.position[i].cabinetId}" placeholder="点击添加位置信息"/><span class="join-delete-Us">×</span><div style="margin-top:20px;"><span class="front-name">U位：</span><input type="text" class="join-U-start" value="${obj2.position[i].start}" placeholder="起始U位"/><input type="text" class="join-U-end" value="${obj2.position[i].end}" placeholder="结束U位"/></div></label>
                                `)
                            }
                        }
                    })
                },function(){
                    console.log("读取位置信息时失败")
                });


            }
            $(".join-if-manage").val(obj2.ifManage);
            //desk
            $(".join-if-desk").val(obj2.ifDesk);
            $(".KVM-port").val(obj2.KVMPort);
            $(".desk-collector").val(obj2.deskCollector);
            //WEB
            $(".join-if-web").val(obj2.ifWeb);
            $(".web-collector").val(obj2.webCollector);
            $(".join-URL").val(obj2.manageURL);
            $(".join-localport").val(obj2.localport);
            if(obj2.transferport.length){
                $($(".join-transferports")[0]).find(".join-port1").val(obj2.transferport[0].port1);
                $($(".join-transferports")[0]).find(".join-port2").val(obj2.transferport[0].port2);
                for(let i = 1;i < obj2.transferport.length;i ++){
                    $($(".join-transferports")[$(".join-transferports").length-1]).after(`
                        <label class="join-transferports"><span class="front-name">端口转发：</span><input type="text" class="join-port1" value="${obj2.transferport[i].port1}" placeholder="本地端口"/><input type="text" class="join-port2" value="${obj2.transferport[i].port2}" placeholder="要映射的端口"/><span class="join-delete-transferports">×</span></label>
                        `)
                }
            }
            //fast
            $(".join-if-fast").val(obj2.ifFast);
            if(obj2.fast.length){
                $($(".join-fasts")[0]).find(".join-fast-collect").val(obj2.fast[0].fastCollect);
                $($(".join-fasts")[0]).find(".join-fast-name").val(obj2.fast[0].fastName);
                $($(".join-fasts")[0]).find(".join-fast-command").val(obj2.fast[0].fastCommand);
                for(let i = 1;i < obj2.fast.length;i ++){
                    $($(".join-fasts")[$(".join-fasts").length-1]).after(
                        '<label class="join-fasts"><span class="front-name">指令：</span>'+
                        '<div class="fast-collect-div"><input type="text" class="join-fast-collect" value="'+obj2.fast[i].fastCollect+'" placeholder="采集方式"/>'+
                        '<ul class="fast-collect-list">'+
                        '<li class="fast-collect-li">IPMI</li>'+
                        '</ul>'+
                        '<a class="join-arrow"></a>'+
                        '</div>'+
                        '<input type="text" class="join-fast-name" value="'+obj2.fast[i].fastName+'" placeholder="指令名称"/>'+
                        '<input type="text" class="join-fast-command" value="'+obj2.fast[i].fastCommand+'" placeholder="指令"/>'+
                        '<span class="join-delete-fasts">×</span>'+
                        '</label>'
                    )
                }
            }
        },function(){
            console.log("获取当前设备信息失败")
        })
    }//回显数据

    //加载数据
    loadData(){

    }//加载数据
}

export default MonitorModify;