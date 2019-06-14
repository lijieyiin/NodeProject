var Controller = require('./controller')
var moviesModel = require('../models/movie')
var uploadImg = require('../function/upload')
var sd = require('silly-datetime');
class MoviesController extends Controller {
    constructor() {
        super()
    }
    //查找

    find(req, res) {
        if (req.query.search_text != undefined) {
            req.session.search_text = req.query.search_text;
        }
        var limit = 5
        var page = 0;
        var no = 1
        if (req.query.page != undefined) {
            page = req.query.page;
            no = (req.query.page - 1) * limit + limit + 1
        }
        moviesModel.findDataAndCount(req.session.search_text, limit, page, (result, num) => {
            res.render("admin/movies", { no: no, data: result, num: num, username: req.session.username, search_text: req.session.search_text })
        })
    }
    //删除
    del(req, res) {
        moviesModel.delMovies(req.query.id, (result) => {
            if (result == 1) res.redirect('/admin/movies')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/movies', timers: 3000 })
            }
        })
    }
    //修改
    update(req, res) {
        var id = req.query.id;
        moviesModel.findOneData(id, function (result) {
            res.render("admin/moviesUpdate", {"data": result, username: req.session.username, search_text: req.session.search_text })
        })
    }
    //提交修改的信息
    updatePost(req, res) {
        moviesModel.updateMovies(req.body, (result) => {
            res.redirect('/admin/movies')
        })
    }
    //上传图片
    upload(req, res) {
        uploadImg(req, function (result) {
            if (result.code == 201) {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/movies', timers: 3000 })
            } else {
                res.json({ "url": result.url })
            }

        })
    }
    //添加
    add(req, res) {
        var nowDate = sd.format(new Date(),'YYYY-MM-DD');
        req.session.nowDate = nowDate;
        res.render("admin/moviesAdd", req.session)
    }
    //提交添加的数据
    addPost(req, res) {
        moviesModel.addMovies(req.body, (result) => {
            if (result != null) res.redirect('/admin/movies')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/movies', timers: 3000 })
            }
        })
    }
    //查找movieId是否存在
    findMovieId(req, res){
        moviesModel.findMovieId(req.body.movieId, (result) => {
            if (result != null) res.json({code:201})
            else {
                res.json({code:200})
            }
        })
    }
}
module.exports = new MoviesController;