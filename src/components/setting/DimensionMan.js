/*
* Author: CoronetLiu   2018/5/14
*/

import Menu from "../menu/Menu.js"
import './DimensionMan.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link,hashHistory,browserHistory} from "react-router";


class DimensionMan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // console.log("render")
        return (
            <div id="warp">
                <Menu content1="配置" content2="维度管理" content22="/dimension" content3="按平台" ref="dimMenu"/>
                <div id="main-right">
                    <div id="dimension-man">
                        <div className="change-dir">
                            <ul>
                                <li className="plateform-dir">按平台</li>
                                <li className="position-dir">按位置
                                    <ul>
                                        <li className="listP" data-id="dataCenter">数据中心</li>
                                        <li className="listP" data-id="dataRoom">机房</li>
                                        <li className="listP" data-id="dataRowCol">行/列</li>
                                        <li className="listP" data-id="dataCab">机柜</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="dim-btns">
                                <button className="layui-btn layui-btn-normal layui-btn-sm add-dim">添加</button>
                                <button className="layui-btn layui-btn-danger layui-btn-sm delete-dim">删除</button>
                            </div>
                        </div>
                        <div id="dim-container"></div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let _this = this;
        this.loadData("plateform");
        //修改显示维度
        $(".plateform-dir").on("click",function(evt){
            let cont3 = "按平台";
           _this.refs.dimMenu.changeDimension(cont3);

            //渲染页面
            _this.loadData("plateform")
        });
        $(".position-dir").on("click",function(evt){
            if(evt.target.className.indexOf("listP") != -1){
                let cont3 = "按位置（" + evt.target.innerHTML + "）";
                _this.refs.dimMenu.changeDimension(cont3);

                //渲染页面
                _this.loadData($(evt.target).attr("data-id"))
            }
        });
        $(".position-dir").on("mouseover",function(){
            this.children[0].style.display = "block";
        });
        $(".position-dir").on("mouseout",function(){
            this.children[0].style.display = "none";
        });

        //添加维度
        $(".add-dim").on("click",function(){
            let str = `
                <label class="label-center" style="display:block;height:40px;line-height:50px;font-size:15px;margin-top:5px;position: relative;">
                <span class="dim-bef"><span class="nece"></span>数据中心</span>
                <input class="modify-center" type="text" readonly placeholder="请选择数据中心"/>
                <ul class="dim-dc-list">
                    <li class="dim-dc-li">集团</li>
                    <li class="dim-dc-li">测试</li>
                </ul>
                <span class="arrow-dim-dc"></span>
                </label>
                <label class="label-room" style="display:block;height:40px;line-height:50px;font-size:15px;position: relative;">
                <span class="dim-bef"><span class="nece"></span>机房</span>
                <input class="modify-room" type="text" readonly placeholder="请选择机房"/>
                <ul class="dim-dr-list">
                    <li class="dim-dr-li">Group-1</li>
                    <li class="dim-dr-li">Test-1</li>
                </ul>
                <span class="arrow-dim-dr"></span>
                </label>
                <label class="label-rowcol" style="display:block;height:40px;line-height:50px;font-size:15px;position: relative;">
                <span class="dim-bef"><span class="nece"></span>行/列</span>
                <input class="modify-rowcol" type="text" readonly placeholder="请选择行/列"/>
                <ul class="dim-drc-list">
                    <li class="dim-drc-li">H1</li>
                    <li class="dim-drc-li">T1</li>
                </ul>
                <span class="arrow-dim-drc"></span>
                </label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;;">
                <span class="dim-bef"><span class="nece"></span>机柜</span>
                <input class="modify-cab" type="text" placeholder="请填写机柜名称"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="dim-bef"><span class="nece"></span>U数</span>
                <input class="modify-unum" type="text" placeholder="请填写U数"/></label>
                <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                <span class="dim-bef"><span class="nece"></span>功率</span>
                <input class="modify-power" type="text" placeholder="请填写额定功率"/></label>`;
            var layerIndex = layer.open({
                title :'添加维度',
                type: 1,  //1 页面；2 frame
                move: false, //禁止拖动
                maxmin: false,   //允许最大化
                // closeBtn: false, //右上角的关闭按钮
                area:["400px","400px"],   //弹出层大小
                shade: 0.2,
                // shadeClose: true,
                // skin: 'layui-layer-molv',
                anim: 5,
                content: str,
                success:function(){
                    $(".label-center").on("mouseover",function(){
                        $(".dim-dc-list").css({
                            display:"block"
                        });
                        $(this).find(".arrow-dim-dc").css({
                            borderColor : "transparent transparent #707070",
                            top : "10px"
                        })
                    });
                    $(".label-center").on("mouseout",function(){
                        $(".dim-dc-list").css({
                            display:"none"
                        });
                        $(this).find(".arrow-dim-dc").css({
                            borderColor : "#707070 transparent transparent",
                            top : "20px"
                        })
                    });
                    $(".dim-dc-li").on("click",function(){
                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                    });
                    $(".label-room").on("mouseover",function(){
                        $(".dim-dr-list").css({
                            display:"block"
                        });
                        $(this).find(".arrow-dim-dr").css({
                            borderColor : "transparent transparent #707070",
                            top : "10px"
                        })
                    });
                    $(".label-room").on("mouseout",function(){
                        $(".dim-dr-list").css({
                            display:"none"
                        });
                        $(this).find(".arrow-dim-dr").css({
                            borderColor : "#707070 transparent transparent",
                            top : "20px"
                        })
                    });
                    $(".dim-dr-li").on("click",function(){
                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                    });
                    $(".label-rowcol").on("mouseover",function(){
                        $(".dim-drc-list").css({
                            display:"block"
                        });
                        $(this).find(".arrow-dim-drc").css({
                            borderColor : "transparent transparent #707070",
                            top : "10px"
                        })
                    });
                    $(".label-rowcol").on("mouseout",function(){
                        $(".dim-drc-list").css({
                            display:"none"
                        });
                        $(this).find(".arrow-dim-drc").css({
                            borderColor : "#707070 transparent transparent",
                            top : "20px"
                        })
                    });
                    $(".dim-drc-li").on("click",function(){
                        this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                    })
                },
                btn: ['确定'],  //按钮s
                yes: function(index, layero){  //第一个按钮的回调函数
                    // alert("发送数据")
                    if(!$(".modify-center").val() || !$(".modify-room").val() || !$(".modify-rowcol").val() || !$(".modify-cab").val() || !$(".modify-unum").val() || !$(".modify-power").val()){
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
                    axios.get("./assets/datas/dimensiondevices.json",{
                        params:{
                            dataCenter:$(".modify-center").val(),
                            dataRoom:$(".modify-room").val(),
                            dataRowCol:$(".modify-rowcol").val(),
                            dataCab:$(".modify-cab").val(),
                            Unum:$(".modify-unum").val(),
                            power:$(".modify-power").val()
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
        });//添加维度完成

        //批量删除维度
        $(".delete-dim").on("click",function(){
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
                                if($(maintr[j].children[k]).attr("data-field") == "dataCab"){
                                    let cabinetId = maintr[j].children[k].children[0].children[0].innerHTML;
                                    checkDatas.push(cabinetId)
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
                    axios.get("./assets/datas/dimensiondevices1.json",{
                        params:{
                            cabineId:item
                        }
                    }).then(function(res){
                        _this.initialTable(res.data)
                    },function(){
                        alert("全部删除时出错！")
                    })
                });
                layer.close(index);
            })
        })//批量删除维度完成

    }//componentDidMount

    loadData(dim){
        let _this = this;
        axios.get("./assets/datas/dimensiondevices.json",{
            params:{
                keyDim:dim
            }
        }).then(function(res){
            $("#dim-container").html(`
                    <table className="layui-hide" id="dim-table" lay-filter="demo"></table>
                    <script type="text/html" id="barDim">
                        <a class="layui-btn layui-btn-xs dim-modify"  lay-event="modify">修改</a>
                        <a class="layui-btn layui-btn-danger layui-btn-xs dim-delete"  lay-event="delete">删除</a>
                    </script>
                    <script type="text/html" id="barId">
                        <span class="cabinetId" style="display: none;">{{ d.cabinetId }}</span>
                        <span>{{ d.dataCab }}</span>
                    </script>
                `);
            _this.initialTable(res.data)
        },function(){
            alert("初始化失败！")
        }) //初次获取数据
    }//loadData

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
                elem: '#dim-table',
                cols: [[ //标题栏
                    {type:'checkbox',fixed: 'left',width:40},
                    {field: 'dataCenter', title: '数据中心', sort:true, minWidth: 150,style:"text-align:center;"},
                    {field: 'dataRoom', title: '机房', minWidth: 150,style:"text-align:center;"},
                    {field: 'dataRowCol', title: '行/列', minWidth: 100,style:"text-align:center;"},
                    {field: 'dataCab', title: '机柜', minWidth: 100,style:"text-align:center;",toolbar:"#barId"},
                    {field: 'Unum', title: 'U数', minWidth: 100,style:"text-align:center;"},
                    {field: 'deviceNum', title: '下属设备', minWidth: 100,style:"text-align:center;"},
                    {field: 'operate', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barDim'}
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
                        axios.get("./assets/datas/dimensiondevices1.json",{
                            params:{
                                cabineId:obj.data.cabinetId
                            }
                        }).then(function(res){
                            // console.log(res.data)
                            let delCurPage = $(".layui-laypage-curr")[0].children[1].innerHTML;
                            table.render({
                                elem: '#dim-table',
                                cols: [[ //标题栏
                                    {type:'checkbox',fixed: 'left',width:40},
                                    {field: 'dataCenter', title: '数据中心', sort:true, minWidth: 150,style:"text-align:center;"},
                                    {field: 'dataRoom', title: '机房', minWidth: 150,style:"text-align:center;"},
                                    {field: 'dataRowCol', title: '行/列', minWidth: 100,style:"text-align:center;"},
                                    {field: 'dataCab', title: '机柜', minWidth: 100,style:"text-align:center;",toolbar:"#barId"},
                                    {field: 'Unum', title: 'U数', minWidth: 100,style:"text-align:center;"},
                                    {field: 'deviceNum', title: '下属设备', minWidth: 100,style:"text-align:center;"},
                                    {field: 'operate', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barDim'}
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
                        <label class="label-center" style="display:block;height:40px;line-height:50px;font-size:15px;margin-top:5px;position: relative;">
                        <span class="dim-bef"><span class="nece"></span>数据中心</span>
                        <input class="modify-center" type="text" readonly placeholder="请选择数据中心"/>
                        <ul class="dim-dc-list">
                            <li class="dim-dc-li">集团</li>
                            <li class="dim-dc-li">测试</li>
                        </ul>
                        <span class="arrow-dim-dc"></span>
                        </label>
                        <label class="label-room" style="display:block;height:40px;line-height:50px;font-size:15px;position: relative;">
                        <span class="dim-bef"><span class="nece"></span>机房</span>
                        <input class="modify-room" type="text" readonly placeholder="请选择机房"/>
                        <ul class="dim-dr-list">
                            <li class="dim-dr-li">Group-1</li>
                            <li class="dim-dr-li">Test-1</li>
                        </ul>
                        <span class="arrow-dim-dr"></span>
                        </label>
                        <label class="label-rowcol" style="display:block;height:40px;line-height:50px;font-size:15px;position: relative;">
                        <span class="dim-bef"><span class="nece"></span>行/列</span>
                        <input class="modify-rowcol" type="text" readonly placeholder="请选择行/列"/>
                        <ul class="dim-drc-list">
                            <li class="dim-drc-li">H1</li>
                            <li class="dim-drc-li">T1</li>
                        </ul>
                        <span class="arrow-dim-drc"></span>
                        </label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;;">
                        <span class="dim-bef"><span class="nece"></span>机柜</span>
                        <input class="modify-cab" type="text" placeholder="请填写机柜名称"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="dim-bef"><span class="nece"></span>U数</span>
                        <input class="modify-unum" type="text" placeholder="请填写U数"/></label>
                        <label style="display:block;height:40px;line-height:50px;font-size:15px;">
                        <span class="dim-bef"><span class="nece"></span>功率</span>
                        <input class="modify-power" type="text" placeholder="请填写额定功率"/></label>`;
                    var layerIndex = layer.open({
                        title :'维度信息修改',
                        type: 1,  //1 页面；2 frame
                        move: false, //禁止拖动
                        maxmin: false,   //允许最大化
                        // closeBtn: false, //右上角的关闭按钮
                        area:["400px","400px"],   //弹出层大小
                        shade: 0.2,
                        // shadeClose: true,
                        // skin: 'layui-layer-molv',
                        anim: 5,
                        content: str,
                        success:function(){
                            $(".modify-center").val(obj.data.dataCenter);
                            $(".modify-room").val(obj.data.dataRoom);
                            $(".modify-rowcol").val(obj.data.dataRowCol);
                            $(".modify-cab").val(obj.data.dataCab);
                            $(".modify-unum").val(obj.data.Unum);
                            $(".modify-power").val(obj.data.power);
                            $(".label-center").on("mouseover",function(){
                            $(".dim-dc-list").css({
                                    display:"block"
                                });
                                $(this).find(".arrow-dim-dc").css({
                                    borderColor : "transparent transparent #707070",
                                    top : "10px"
                                })
                            });
                            $(".label-center").on("mouseout",function(){
                                $(".dim-dc-list").css({
                                    display:"none"
                                });
                                $(this).find(".arrow-dim-dc").css({
                                    borderColor : "#707070 transparent transparent",
                                    top : "20px"
                                })
                            });
                            $(".dim-dc-li").on("click",function(){
                                this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                            });
                            $(".label-room").on("mouseover",function(){
                                $(".dim-dr-list").css({
                                    display:"block"
                                });
                                $(this).find(".arrow-dim-dr").css({
                                    borderColor : "transparent transparent #707070",
                                    top : "10px"
                                })
                            });
                            $(".label-room").on("mouseout",function(){
                                $(".dim-dr-list").css({
                                    display:"none"
                                });
                                $(this).find(".arrow-dim-dr").css({
                                    borderColor : "#707070 transparent transparent",
                                    top : "20px"
                                })
                            });
                            $(".dim-dr-li").on("click",function(){
                                this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                            });
                            $(".label-rowcol").on("mouseover",function(){
                                $(".dim-drc-list").css({
                                    display:"block"
                                });
                                $(this).find(".arrow-dim-drc").css({
                                    borderColor : "transparent transparent #707070",
                                    top : "10px"
                                })
                            });
                            $(".label-rowcol").on("mouseout",function(){
                                $(".dim-drc-list").css({
                                    display:"none"
                                });
                                $(this).find(".arrow-dim-drc").css({
                                    borderColor : "#707070 transparent transparent",
                                    top : "20px"
                                })
                            });
                            $(".dim-drc-li").on("click",function(){
                                this.parentNode.previousSibling.previousSibling.value = this.innerHTML
                            })
                        },
                        btn: ['确定'],  //按钮s
                        yes: function(index, layero){  //第一个按钮的回调函数
                            // alert("发送数据")
                            if(!$(".modify-center").val() || !$(".modify-room").val() || !$(".modify-rowcol").val() || !$(".modify-cab").val() || !$(".modify-unum").val() || !$(".modify-power").val()){
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
                            axios.get("./assets/datas/dimensiondevices2.json",{
                                params:{
                                    cabineId:obj.data.cabinetId,
                                    dataCenter:$(".modify-center").val(),
                                    dataRoom:$(".modify-room").val(),
                                    dataRowCol:$(".modify-rowcol").val(),
                                    dataCab:$(".modify-cab").val(),
                                    Unum:$(".modify-unum").val(),
                                    power:$(".modify-power").val()
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
                                    elem: '#dim-table',
                                    cols: [[ //标题栏
                                        {type:'checkbox',fixed: 'left',width:40},
                                        {field: 'dataCenter', title: '数据中心', sort:true, minWidth: 150,style:"text-align:center;"},
                                        {field: 'dataRoom', title: '机房', minWidth: 150,style:"text-align:center;"},
                                        {field: 'dataRowCol', title: '行/列', minWidth: 100,style:"text-align:center;"},
                                        {field: 'dataCab', title: '机柜', minWidth: 100,style:"text-align:center;",toolbar:"#barId"},
                                        {field: 'Unum', title: 'U数', minWidth: 100,style:"text-align:center;"},
                                        {field: 'deviceNum', title: '下属设备', minWidth: 100,style:"text-align:center;"},
                                        {field: 'operate', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barDim'}
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
    }
}

export default DimensionMan;