var Controller = require('./controller')
var cinemasModel = require('../models/cinema')
var cinemasMoviesModel = require('../models/cinemaMovies')

class cinemasController extends Controller {
    constructor() {
        super()
    }
    //查找

    find(req, res) {
        if (req.query.search_text1 != undefined) {
            req.session.search_text1 = req.query.search_text1;
        }
        var limit = 5
        var page = 0;
        var no = 1
        if (req.query.page != undefined) {
            page = req.query.page;
            no = (req.query.page - 1) * limit + limit + 1
        }
        cinemasModel.findDataAndCount(req.session.search_text1, limit, page, (result, num) => {
            res.render("admin/cinemas", { no: no, data: result, num: num, username: req.session.username, search_text1: req.session.search_text1 })
        })
    }
    //删除
    del(req, res) {
        cinemasModel.delCinemas(req.query.id, (result) => {
            if (result == 1) res.redirect('/admin/cinemas')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/cinemas', timers: 3000 })
            }
        })
    }
    //烽和影院
    cinemaMovies(req, res){
        res.render('admin/cinemaMovies',{username: req.session.username})
    }

    //详情
    detail(req, res) {
        var cinemaId = req.query.cinemaId;
        cinemasMoviesModel.findOneData(cinemaId, function (result) {
            res.render("admin/cinemaMovies", {"data": result, username: req.session.username, search_text1: req.session.search_text1 })
        })
    }
    //某个电影信息
    findMoviesInfo(req,res){
        var index = req.query.index;
        var cinemaId = req.query.cinemaId;
        cinemasMoviesModel.findOneData(cinemaId, function (result) {
            res.json({"data": result,"index":index})
        })
    }
   
}
module.exports = new cinemasController;