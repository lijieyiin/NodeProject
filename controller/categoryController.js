//后台模块
var Controller = require('./controller')
var categoryModel = require('../models/category')

class CategoryController extends Controller {
    constructor() {
        super()
    }
    //查找
    find(req, res) {
        var limit = 5
        var page = 1;
        var no = 1
        if(req.query.page != undefined){
           page = req.query.page;
           no = (req.query.page-1)*limit+limit+1
        }
        categoryModel.findDataAndCount(limit, page, (result, num) => {
            res.render("admin/category", {no:no,data: result, num: num, username: req.session.username })
        })
    }
    //添加
    add(req, res) {
        res.render("admin/categoryAdd", req.session)
    }
    addPost(req, res) {
        console.log("==", req.body)
        categoryModel.addCategory(req.body, (result) => {
            if (result != null) res.redirect('/admin/category')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/category', timers: 3000 })
            }
        })
    }

    //删除
    del(req, res) {
        categoryModel.delCategory(req.query.id, (result) => {
            if (result == 1) res.redirect('/admin/category')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/category', timers: 3000 })
            }
        })
    }
    //修改
    // update(req, res) {
    //     studentModel.updateStudent(req.body, (result) => {
    //         if (result == 1) res.redirect('/admin/category')
    //     })
    // }
    //===========

}

module.exports = new CategoryController;