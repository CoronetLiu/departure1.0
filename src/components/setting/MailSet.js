/*
* Author: CoronetLiu   2018/5/14
*/

import Menu from "../menu/Menu.js"
import './MailSet.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class MailSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="配置" content2="邮件配置" content22="/mailset"/>
                <div id="main-right">
                    <div id="mail-set">
                        <div className="mail-top">
                            <div className="mail-noti active">邮件通知</div>
                            <div className="mail-base">基本配置</div>
                        </div>
                        <div className="mail-bottom">
                            <div className="base-content">
                                <label><span>SMTP主机</span><input className="smtp-host" type="text"/></label>
                                <label><span>SMTP端口</span><input className="smtp-port" type="text"/></label>
                                <label><span>SMTP账号</span><input className="smtp-user" type="text"/></label>
                                <label>
                                    <span>SMTP密码</span>
                                    <input className="smtp-pass" type="password"/>
                                    <span className="smtp-tip">一些邮件提供商需要输入的是Token</span>
                                </label>
                                <label>
                                    <span>使用SSL</span>
                                    <input className="smtp-ssl" type="checkbox"/>
                                    <span className="smtp-tip">如果SMTP端口是465，通常需要启用SSL</span>
                                </label>
                                <label>
                                    <span>使用TLS</span>
                                    <input className="smtp-tls" type="checkbox"/>
                                    <span className="smtp-tip">如果SMTP端口是587，通常需要启用TLS</span>
                                </label>
                                <label className="smtp-btns">
                                    <button className="layui-btn layui-btn-primary smtp-reset">重置</button>
                                    <button className="layui-btn smtp-save">保存</button>
                                </label>
                            </div>
                            <div className="noti-content">
                                <div className="mail-operator clearfix">
                                    <button className="layui-btn layui-btn-danger layui-btn-sm delete-mail">删除</button>
                                    <button className="layui-btn layui-btn-normal layui-btn-sm add-mail">添加</button>
                                </div>
                                <div id="mail-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        this.loadData();
        //切换
        $(".mail-base").on("click",function(){
           $(this).addClass("active");
           $(".mail-noti").removeClass("active");
           $(".base-content").css({
               display:"block"
           });
            $(".noti-content").css({
                display:"none"
            })
        });
        $(".mail-noti").on("click",function(){
           $(this).addClass("active");
           $(".mail-base").removeClass("active");
           $(".noti-content").css({
               display:"block"
           });
            $(".base-content").css({
                display:"none"
            })
        });

        //保存配置
        $(".smtp-save").on("click",function(){
            if($(".smtp-host").val() == ""){
                layer.alert("请填写主机名！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            if($(".smtp-port").val() == ""){
                layer.alert("请填写端口号！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            if($(".smtp-user").val() == ""){
                layer.alert("请填写账号！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            if($(".smtp-pass").val() == ""){
                layer.alert("请填写密码！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            let arr = [];
            let obj = {};
            obj.host = $(".smtp-host").val();
            obj.port = $(".smtp-port").val();
            obj.account = $(".smtp-user").val();
            obj.password = $(".smtp-pass").val();
            if($(".smtp-ssl").checked){
                obj.ssl = "1"
            }else{
                obj.ssl = "0"
            }
            if($(".smtp-tls").checked){
                obj.tls = "1"
            }else{
                obj.tls = "0"
            }
            arr.push(obj);
            axios.get("./assets/datas/mailset.json",{
                params:{
                    data:JSON.stringify(arr)
                }
            }).then(function(res){
                layer.alert("保存成功！",{
                    icon:6,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
            },function(){
                layer.alert("保存失败！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
            })

        });

        //添加mail
        $(".add-mail").on("click",function(){
           hashHistory.push({
               pathname: '/home'
           })
        });
        //批量删除mail
        $(".delete-mail").on("click",function(){
            let checkDatas = [];
            for(var i = 0;i < $(".layui-table-fixed .layui-form-checkbox").length;i ++){  // 循环所有的chekbox
                if($(".layui-table-fixed .layui-form-checkbox")[i].previousSibling.checked == true){  // 如果选中了
                    //获取选中父级的tr的data-index
                    let index = $($(".layui-table-fixed .layui-form-checkbox")[i]).parent().parent().parent().attr("data-index");
                    //在layui-table-main里面寻找与data-index对应的tr
                    let maintr = $(".layui-table-main tr");
                    for(var j = 0; j < maintr.length;j ++){
                        if($(maintr[j]).attr("data-index") == index){
                            for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找dataCab
                                if($(maintr[j].children[k]).attr("data-field") == "name"){
                                    let id = maintr[j].children[k].children[0].children[0].innerHTML;
                                    checkDatas.push(id)
                                }
                            }
                        }
                    }
                }
            }
            // console.log(checkDatas)
            if(!checkDatas.length){
                layer.alert("请至少选择一条数据！",{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                });
                return;
            }
            layer.confirm('真的删除选中的么？',{
                    icon:7,
                    move:false,
                    skin: 'layui-layer-molv',
                    anim: 4
                }, function(index){
                checkDatas.map((item)=>{
                    axios.get("./assets/datas/mail1.json",{
                        params:{
                            id:item
                        }
                    }).then(function(res){
                        _this.initialTable(res.data)
                    },function(){
                        alert("全部删除时出错！")
                    })
                });
                layer.close(index);
            })
        })//批量删除mail完成

    }//componentDidMount



    loadData(){
        let _this = this;
        axios.get("./assets/datas/mailset.json").then(function(res){
            console.log(res.data);
            $(".smtp-host").val(res.data[0].host);
            $(".smtp-port").val(res.data[0].port);
            $(".smtp-user").val(res.data[0].account);
            $(".smtp-pass").val(res.data[0].password);
            if(res.data[0].ssl == "1"){
                $(".smtp-ssl")[0].checked = true;
            }else{
                $(".smtp-ssl")[0].checked = false;
            }
            if(res.data[0].tls == "1"){
                $(".smtp-tls")[0].checked = true;
            }else{
                $(".smtp-tls")[0].checked = false;
            }
        },function(){
            console.log("初始化失败")
        });
        axios.get("./assets/datas/mail.json").then(function(res){
            $("#mail-container").html(`
                    <table className="layui-hide" id="mail-table" lay-filter="demo"></table>
                    <script type="text/html" id="barMail">
                        <a class="layui-btn layui-btn-xs mail-modify"  lay-event="modify">修改</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs mail-delete"  lay-event="delete">删除</a>
                    </script>
                    <script type="text/html" id="barId">
                        <span class="cabinetId" style="display: none;">{{ d.id }}</span>
                        <span>{{ d.name }}</span>
                    </script>
                `);
            _this.initialTable(res.data)
        },function(){
            alert("初始化失败！")
        }) //初次获取数据
    } //loadData

    initialTable(data){
        let curPage = "";
        if($(".layui-laypage-curr")[0]){
            curPage = $(".layui-laypage-curr")[0].children[1].innerHTML
        }else{
            curPage = 1
        }
        layui.use('table', function(){
            var table = layui.table,form = layui.form;
            //展示数据
            table.render({
                elem: '#mail-table',
                cols: [[ //标题栏
                    {type:'checkbox',fixed: 'left',width:40},
                    {field: 'name', title: '规则名称', sort:true, width: 200,style:"text-align:center;",toolbar:"#barId"},
                    {field: 'people', title: '告警收件人', width: 200,style:"text-align:center;"},
                    {field: 'title', title: '告警标题', width: 200,style:"text-align:center;"},
                    {field: 'content', title: '告警内容', width: 200,style:"text-align:center;"},
                    {field: 'operate', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barMail'}
                ]],
                data: data,
                // skin: 'line',//表格风格
                even: true,
                page: true, //是否显示分页
                limits: [1,5,10,20,50],
                limit: 10 //每页默认显示的数量
            });

            //监听工具条
            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'delete'){
                    layer.confirm('真的删除么？',{
                        icon:7,
                        move:false,
                        skin: 'layui-layer-molv',
                        anim: 4
                    }, function(index){
                        // obj.del();
                        axios.get("./assets/datas/mail1.json",{
                            params:{
                                id:obj.data.id
                            }
                        }).then(function(res){
                            // console.log(res.data)
                            let delCurPage = $(".layui-laypage-curr")[0].children[1].innerHTML;
                            table.render({
                                elem: '#mail-table',
                                cols: [[ //标题栏
                                    {type:'checkbox',fixed: 'left',width:40},
                                    {field: 'name', title: '规则名称', sort:true, width: 200,style:"text-align:center;",toolbar:"#barId"},
                                    {field: 'people', title: '告警收件人', width: 200,style:"text-align:center;"},
                                    {field: 'title', title: '告警标题', width: 200,style:"text-align:center;"},
                                    {field: 'content', title: '告警内容', width: 200,style:"text-align:center;"},
                                    {field: 'operate', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barMail'}
                                ]],
                                data: res.data,
                                // skin: 'line',//表格风格
                                even: true,
                                page: true, //是否显示分页
                                limits: [1,5,10,20,50],
                                limit: 10 //每页默认显示的数量
                            });
                            $(".layui-laypage-skip")[0].children[0].value = delCurPage;
                            $(".layui-laypage-btn").click();
                        },function(){
                            alert("删除失败！")
                        });
                        layer.close(index);
                    });
                } else if(obj.event === 'modify') {
                    hashHistory.push({
                        pathname: '/home',
                        query: {
                            id: obj.data.id,
                        }
                    })
                }
            });
        }); // use table
        if($(".layui-laypage-skip")[0]){
            $(".layui-laypage-skip")[0].children[0].value = curPage;
            $(".layui-laypage-btn").click();
        }
    } //initialTable
}

export default MailSet;