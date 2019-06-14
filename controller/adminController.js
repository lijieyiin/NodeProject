//后台模块
var Controller = require('./controller')
var md5 = require('../function/md5')
var User = require('../models/User')

class MainController extends Controller {
    constructor() {
        super()
    }

    //首页
    index(req, res) {
        req.session.login = 1;
        req.session.username = "LJY";

        res.render('admin/index',req.session)
    }
    //登录
    login(req, res) {
        res.render('admin/login')
    }
    //退出
    logout(req, res){
        req.session.login = 0;
        req.session.username = null;
        res.render('admin/login');
    }
    //验证登录
    loginPost(req, res) {
        //1. 进行登录数据验证 通过---密码加密后的obj；不通过---false
        var fields = md5(req.body)
        
        if (!fields) {//1.1跳转到error页面 
            res.render('admin/error', { msg: '请输入正确的用户信息', url: '/admin/login', timers: 3000 })
        } else {
            //1.2 进行数据库的验证 将返回的obj 与数据库中的信息对比
            User.isUserAndPwd(fields, (result) => { 
                if (result) {//成功
                    //存入session值
                    req.session.login = 1;  
                    req.session.username = fields.username;
                    res.render('admin/',req.session)
                } else {
                    res.render('admin/error', { msg: '请输入正确的用户信息', url: '/admin/login', timers: 3000 })
                }
          })
        }
    }
    //路由是否过滤
    isLogin(req,res){
        if(req.session.login == 1){
            req.next();
        }else{
            res.render('admin/login');
        }
    }
}

module.exports = new MainController;