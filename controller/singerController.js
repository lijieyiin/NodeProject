var Controller = require('./controller')
var singerModel = require('../models/singer')
class SingerController extends Controller {
    constructor() {
        super()
    }
    //查找
    find(req, res) {
        var limit = 5
        singerModel.findDataAndCount(limit, req.query.page, (result, num) => {
            res.render("admin/singer", { data: result, num: num, username: req.session.username })
        })
    }
    //删除
    del(req, res) {
        singerModel.delSinger(req.query.id, (result) => {
            if (result == 1) res.redirect('/admin/singer')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/singer', timers: 3000 })
            }
        })
    }

    //API
    findApi(req, res) {
        apiModel.findApi(req.query.id, (result) => {
            if (result == 1) res.redirect('/admin/singer')
            else {
                res.render('admin/error', { msg: '数据操作失败', url: '/admin/singer', timers: 3000 })
            }
        })
    }
}

module.exports = new SingerController;