/*
* @Author:  CoronetLiu
* @Date:    2018-04-03 17:16:45
* @Last Modified by:    CoronetLiu
* @Last Modified time:  2018-04-27 09:18:03
* @Email:   liu86931@163.com
*/

// 'use strict';
import Menu from "../menu/Menu.js"
import './User.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="用户信息"/>
                <div id="main-right">
                    <div id="user">
                        <div className="user-title">
                            <p>授权管理</p>
                            <div className="user-btns">
                                <button className="layui-btn layui-btn-normal layui-btn-sm adduser">添加</button>
                                <button className="layui-btn layui-btn-danger layui-btn-sm deleteuser">删除</button>
                            </div>
                        </div>
                        <div id="user-container"></div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        this.load();
        //添加用户
        $(".adduser").on("click",function(){
            let str = `
                <label style="display:block;height:40px;line-height:50px;font-size:15px;margin-top:5px;">
                <span class="user-bef"><span class="nece"></span>登录名</span>
                <input class="modify-user" type="text" placeholder="请输入登录名"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="user-bef"><span class="nece"></span>密码</span>
                <input class="modify-password" type="text" placeholder="请输入密码"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="user-bef"><span class="nece"></span>维护密码</span>
                <input class="modify-protect-password" type="text" placeholder="请输入维护密码"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;;">
                <span class="user-bef"><span class="nece"></span>姓名</span>
                <input class="modify-name" type="text" placeholder="请输入姓名"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="user-bef"><span class="nece"></span>电话</span>
                <input class="modify-tel" type="text" placeholder="请输入电话"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="user-bef"><span class="nece"></span>邮箱</span>
                <input class="modify-email" type="text" placeholder="请输入邮箱"/></label>
                <p style="font-size:12px;color:#fbb321;padding:10px 0 0 30px;"><span class="nece"></span>请认真填写手机号码及邮箱，否则可能无法收到告警通知</p>
                <label class="modify-if-login-label" style="display:block;height:40px;line-height:50px;font-size:15px;position:relative;">
                <span class="user-bef"><span class="nece"></span>是否登录</span>
                <input class="modify-if-login" readonly="readonly" type="text"/>
                <ul class="if-login-list">
                    <li class="if-login-li">是</li>
                    <li class="if-login-li">否</li>
                </ul>
                <span class="arrow-if-login"></span>
                </label>`;
            var layerIndex = layer.open({
                title :'添加用户',
                type: 1,  //1 页面；2 frame
                move: false, //禁止拖动
                maxmin: false,   //允许最大化
                // closeBtn: false, //右上角的关闭按钮
                area:["400px","480px"],   //弹出层大小
                shade: 0.2,
                // shadeClose: true,
                // skin: 'layui-layer-molv',
                anim: 5,
                content: str,
                success:function(){
                    $(".modify-if-login").val("否");
                    $(".modify-if-login-label").on("mouseover",function(){
                        $(".if-login-list").css({
                            display:"block"
                        });
                        $(this).find(".arrow-if-login").css({
                            borderColor : "transparent transparent #707070",
                            top : "10px"
                        })
                    });
                    $(".modify-if-login-label").on("mouseout",function(){
                        $(".if-login-list").css({
                            display:"none"
                        });
                        $(this).find(".arrow-if-login").css({
                            borderColor : "#707070 transparent transparent",
                            top : "20px"
                        })
                    });
                    $(".if-login-li").on("click",function(){
                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                    })
                },
                btn: ['确定'],  //按钮s
                yes: function(index, layero){  //第一个按钮的回调函数
                    // alert("发送数据")
                    if(!$(".modify-user").val() || !$(".modify-password").val() || !$(".modify-protect-password").val() || !$(".modify-name").val() || !$(".modify-tel").val() || !$(".modify-email").val()){
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
                    }
                    axios.get("./assets/datas/users2.json",{
                        params:{
                            user:$(".modify-user").val(),
                            password:$(".modify-password").val(),
                            protectPassword:$(".modify-protect-password").val(),
                            name:$(".modify-name").val(),
                            tel:$(".modify-tel").val(),
                            email:$(".modify-email").val(),
                            isLogin:$(".modify-if-login").val()
                        }
                    }).then(function(res){
                        console.log(res.data);
                        layer.alert("添加成功！",{
                            icon:6,
                            skin: 'layui-layer-molv',
                            closeBtn: false, //右上角的关闭按钮
                            shade: 0.2,
                            anim: 5
                        });
                        _this.initialTable(res.data)
                    },function(){
                        layer.alert("修改失败！",{
                            icon:5,
                            skin: 'layui-layer-molv',
                            closeBtn: false, //右上角的关闭按钮
                            shade: 0.2,
                            anim: 5
                        })
                    });
                    layer.close(index)
                }
            });
        });//添加用户完成

        //批量删除用户
        $(".deleteuser").on("click",function(){
            let checkDatas = [];
            for(var i = 0;i < $(".layui-table-fixed .layui-form-checkbox").length;i ++){  // 循环所有的chekbox
                if($(".layui-table-fixed .layui-form-checkbox")[i].previousSibling.checked == true){  // 如果选中了
                    //获取选中父级的tr的data-index
                    let index = $($(".layui-table-fixed .layui-form-checkbox")[i]).parent().parent().parent().attr("data-index");
                    //在layui-table-main里面寻找与data-index对应的tr
                    let maintr = $(".layui-table-main tr");
                    for(var j = 0; j < maintr.length;j ++){
                        if($(maintr[j]).attr("data-index") == index){
                            for(var k = 0; k < maintr[j].children.length;k ++){ // 在tr里面寻找user
                                if($(maintr[j].children[k]).attr("data-field") == "user"){
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
                layer.alert("请至少选择一位用户！",{
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
                    axios.get("./assets/datas/users1.json",{
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
        })//批量删除用户完成
    }//componentDidMount

    load(){
        let _this = this;
        axios.get("./assets/datas/users.json").then(function(res){
            $("#user-container").html(`
                    <table className="layui-hide" id="user-table" lay-filter="demo"></table>
                    <script type="text/html" id="barUser">
                        <a class="layui-btn layui-btn-normal layui-btn-xs user-empower"  lay-event="empower">授权</a>
                        <a class="layui-btn layui-btn-xs user-modify"  lay-event="modify">修改</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs user-delete"  lay-event="delete">删除</a>
                    </script>
                    <script type="text/html" id="barId">
                        <span class="userId" style="display:none;">{{ d.id }}</span>
                        <span>{{ d.user }}</span>
                    </script>
                `);
            _this.initialTable(res.data)
        },function(){
            alert("初始化失败！")
        }) //初次获取数据
    }//load

    // 初始化表格
    initialTable(data){
        let curPage = "";
        if($(".layui-laypage-curr")[0]){
            curPage = $(".layui-laypage-curr")[0].children[1].innerHTML
        }else{
            curPage = 1
        }
        layui.use('table', function(){
            var table = layui.table,form = layui.form;
            // //监听表格复选框选择
            // table.on('checkbox(demo)', function(obj){
            //     console.log("已选中："+obj)
            // });

            //展示数据
            table.render({
                elem: '#user-table',
                cols: [[ //标题栏
                    {type:'checkbox',fixed: 'left',width:40},
                    {field: 'user', title: '登录名', sort:true, width: 153,style:"text-align:center;", toolbar: '#barId'},
                    {field: 'name', title: '姓名', width: 140,style:"text-align:center;"},
                    {field: 'tel', title: '电话', width: 160,style:"text-align:center;"},
                    {field: 'email', title: '邮箱', width: 250,style:"text-align:center;"},
                    {field: 'operate', title: '操作',fixed: 'right', width:200, align:'center', toolbar: '#barUser'}
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
                if(obj.event === 'empower'){
                    // layer.msg('ID：'+ data.id + ' 的详情操作');
                    let str = ``;
                    var layerIndex = layer.open({
                        title :'用户授权',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["600px","500px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        success:function(){

                        },
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){
                            layer.close(index);
                        }
                    })
                } else if(obj.event === 'delete'){
                    layer.confirm('真的删除么？',{
                        icon:7,
                        move:false,
                        skin: 'layui-layer-molv',
                        anim: 4
                    }, function(index){
                        // obj.del();
                        axios.get("./assets/datas/users1.json",{
                            params:{
                                user:obj.data.user
                            }
                        }).then(function(res){
                            // console.log(res.data)
                            let delCurPage = $(".layui-laypage-curr")[0].children[1].innerHTML;
                            table.render({
                                elem: '#user-table',
                                cols: [[ //标题栏
                                    {type:'checkbox',fixed: 'left',width:40},
                                    {field: 'user', title: '登录名', sort:true, width: 153,style:"text-align:center;",toolbar: '#barId'},
                                    {field: 'name', title: '姓名', width: 140,style:"text-align:center;"},
                                    {field: 'tel', title: '电话', width: 160,style:"text-align:center;"},
                                    {field: 'email', title: '邮箱', width: 250,style:"text-align:center;"},
                                    {field: 'operate', title: '操作',fixed: 'right', width:200, align:'center', toolbar: '#barUser'}
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
                } else if(obj.event === 'modify'){
                    let str = `
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;margin-top:5px;">
                        <span class="user-bef"><span class="nece"></span>登录名</span>
                        <input class="modify-user" type="text" readonly placeholder="请输入登录名"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="user-bef"><span class="nece"></span>密码</span>
                        <input class="modify-password" type="text" placeholder="请输入密码"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="user-bef"><span class="nece"></span>维护密码</span>
                        <input class="modify-protect-password" type="text" placeholder="请输入维护密码"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;;">
                        <span class="user-bef"><span class="nece"></span>姓名</span>
                        <input class="modify-name" type="text" placeholder="请输入姓名"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="user-bef"><span class="nece"></span>电话</span>
                        <input class="modify-tel" type="text" placeholder="请输入电话"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="user-bef"><span class="nece"></span>邮箱</span>
                        <input class="modify-email" type="text" placeholder="请输入邮箱"/></label>
                        <p style="font-size:12px;color:#fbb321;padding:10px 0 0 30px;"><span class="nece"></span>请认真填写手机号码及邮箱，否则可能无法收到告警通知</p>
                        <label class="modify-if-login-label" style="display:block;height:40px;line-height:50px;font-size:15px;position:relative;">
                        <span class="user-bef"><span class="nece"></span>是否登录</span>
                        <input class="modify-if-login" readonly="readonly" type="text"/>
                        <ul class="if-login-list">
                            <li class="if-login-li">是</li>
                            <li class="if-login-li">否</li>
                        </ul>
                        <span class="arrow-if-login"></span>
                        </label>`;
                    var layerIndex = layer.open({
                        title :'用户信息修改',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","480px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        success:function(){
                            $(".modify-user").val(obj.data.user);
                            $(".modify-password").val(obj.data.password);
                            $(".modify-protect-password").val(obj.data.protectPassword);
                            $(".modify-name").val(obj.data.name);
                            $(".modify-tel").val(obj.data.tel);
                            $(".modify-email").val(obj.data.email);
                            $(".modify-if-login").val(obj.data.isLogin);
                            $(".modify-if-login-label").on("mouseover",function(){
                                $(".if-login-list").css({
                                    display:"block"
                                });
                                $(this).find(".arrow-if-login").css({
                                    borderColor : "transparent transparent #707070",
                                    top : "10px"
                                })
                            });
                            $(".modify-if-login-label").on("mouseout",function(){
                                $(".if-login-list").css({
                                    display:"none"
                                });
                                $(this).find(".arrow-if-login").css({
                                    borderColor : "#707070 transparent transparent",
                                    top : "20px"
                                })
                            });
                            $(".if-login-li").on("click",function(){
                                this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                            })
                        },
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            if(!$(".modify-user").val() || !$(".modify-password").val() || !$(".modify-protect-password").val() || !$(".modify-name").val() || !$(".modify-tel").val() || !$(".modify-email").val()){
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
                            }
                            axios.get("./assets/datas/users2.json",{
                                params:{
                                    id:obj.data.id,
                                    user:$(".modify-user").val(),
                                    password:$(".modify-password").val(),
                                    protectPassword:$(".modify-protect-password").val(),
                                    name:$(".modify-name").val(),
                                    tel:$(".modify-tel").val(),
                                    email:$(".modify-email").val(),
                                    isLogin:$(".modify-if-login").val()
                                }
                            }).then(function(res){
                                console.log(res.data);
                                layer.alert("修改成功！",{
                                    icon:6,
                                    skin: 'layui-layer-molv',
                                    closeBtn: false, //右上角的关闭按钮
                                    shade: 0.2,
                                    anim: 5
                                });
                                let delCurPage = $(".layui-laypage-curr")[0].children[1].innerHTML;
                                table.render({
                                    elem: '#user-table',
                                    cols: [[ //标题栏
                                        {type:'checkbox',fixed: 'left',width:40},
                                        {field: 'user', title: '登录名', sort:true, width: 153,style:"text-align:center;",toolbar: '#barId'},
                                        {field: 'name', title: '姓名', width: 140,style:"text-align:center;"},
                                        {field: 'tel', title: '电话', width: 160,style:"text-align:center;"},
                                        {field: 'email', title: '邮箱', width: 250,style:"text-align:center;"},
                                        {field: 'operate', title: '操作',fixed: 'right', width:200, align:'center', toolbar: '#barUser'}
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
                                layer.alert("修改失败！",{
                                    icon:5,
                                    skin: 'layui-layer-molv',
                                    closeBtn: false, //右上角的关闭按钮
                                    shade: 0.2,
                                    anim: 5
                                })
                            });
                            layer.close(index)
                        }
                    });
                }
            });
        }); // use table
        if($(".layui-laypage-skip")[0]){
            $(".layui-laypage-skip")[0].children[0].value = curPage;
            $(".layui-laypage-btn").click();
        }
    }//initialTable
}

export default User;
