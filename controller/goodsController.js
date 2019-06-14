//后台模块
var Controller = require('./controller')
var goodsModel = require('../models/Goods')
var uploadImg = require('../function/upload')

class GoodsController extends Controller {
    constructor() {
        super()
    }
    //查找
    find(req, res) {
        var limit = 5
        var page = 0;
        var no = 1
        if(req.query.page != undefined){
           page = req.query.page;
           no = (req.query.page-1)*limit+limit+1
        }
        goodsModel.findDataAndCount(limit, page,(result,num)=>{
            res.render("admin/goods", {no:no,data: result, num: num, username: req.session.username })
        })
    }
    //添加
    add(req, res) {
        res.render("admin/goodsAdd", req.session)
    }
    //提交添加的数据
    addPost(req, res) {
        goodsModel.addGoods(req.body, (result) => {
            if (result != null) res.redirect('/admin/goods')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/goods', timers: 3000 })
            }
        })
    }
    //删除
    del(req, res) {
        goodsModel.delGoods(req,function(result){
            if(result.code == 200){
                res.redirect('/admin/goods')
            }else{
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/goods', timers: 3000 })
            }
        })
    }
    //上传图片
    upload(req, res) {
        uploadImg(req,function(result){
            if(result.code == 201){
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/goods', timers: 3000 })
            }else{
                res.json({ "url": result.url })
            }

        })
    }
    //删除图片
    deleteImg(req, res) {
        goodsModel.deleteImgs(req,function(result){
            if(result.code == 200){
                res.json({ "data": "1" })
            }else{
                res.render('admin/error', { msg: '图片删除失败', url: '/admin/goods', timers: 3000 })
            }
        })
    }
    //修改
    update(req, res) {
        goodsModel.findGoods(req.query.id, (result) => {
            res.render("admin/goodsUpdate", { "data": result, username: req.session.username })
        })
    }
    updatePost(req, res) {
        goodsModel.updateGoods(req.body, (result) => {
            res.redirect('/admin/goods')
        })
    }
}

module.exports = new GoodsController;