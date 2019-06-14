//前台模块
var express = require('express');
var rount = express.Router();

rount.get('/',(req,res)=>{
    res.send("前台首页")
})

rount.get('/list',(req,res)=>{
    res.send("前台列表")
})

rount.get('/xq',(req,res)=>{
    res.send("前台详情页")
})

module.exports = rount;