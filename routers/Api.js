//API模块
var express = require('express');
var rount = express.Router();
var goodsApiController = require('../controller/goodsApiController')

//API首页
rount.get('/',goodsApiController.index)
//API列表页
rount.get('/list',goodsApiController.list)

module.exports = rount;