//后台模块
var Controller = require('./controller')
var goodsApiModel = require('../models/GoodsApi')

class goodsApiController extends Controller {
    constructor() {
        super()
    }
    //API首页
    index(req,res){
        res.send("API首页")
    }
    //API列表页
    list(req,res){
        res.send("API列表")
    }
}

module.exports = new goodsApiController;