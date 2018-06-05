/*
* Author: CoronetLiu   2018/6/1
*/

import axios from "axios"

//请求拦截器     设置loading动画显示
axios.interceptors.request.use(function(config){
    layui.use('layer', function() {
        var layer = layui.layer;
        var indexLoad = layer.load(1, {
            shade: [0.3, '#000']
            ,time:1000
        });
    });
    return config;
},function(error){    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//返回拦截器     把loading动画关掉
axios.interceptors.response.use(function(response){
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.closeAll("loading");
    });
    return response;
},function(error){
    //对返回的错误进行一些处理
    return Promise.reject(error);
});
