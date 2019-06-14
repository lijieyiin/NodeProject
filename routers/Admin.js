//后台模块
var express = require('express');
var rount = express.Router();

var adminController = require('../controller/adminController');
var categoryController = require('../controller/categoryController')
var singerController = require('../controller/singerController')
var goodsController = require('../controller/goodsController')
var moviesController = require('../controller/moviesController')
var cinemasController = require('../controller/cinemasController')

//登录功能
rount.get('/login',adminController.login)
rount.get('/logout',adminController.logout)
rount.post('/login',adminController.loginPost)

//后台路由过滤   
rount.use(adminController.isLogin)  

//首页  
rount.get('/',adminController.index)

//分类功能
rount.get('/category',categoryController.find)
rount.get('/category/del',categoryController.del)
rount.get('/category/add',categoryController.add)
rount.post('/category/add',categoryController.addPost)

// 歌手列表
rount.get('/singer',singerController.find)
rount.get('/singer/del',singerController.del)

// 商品列表
rount.get('/goods',goodsController.find)
rount.get('/goods/add',goodsController.add)
rount.post('/goods/add',goodsController.addPost)
rount.get('/goods/del',goodsController.del)
rount.post('/goods/upload',goodsController.upload)
rount.post('/goods/deleteImg',goodsController.deleteImg)
rount.get('/goods/update',goodsController.update)
rount.post('/goods/update',goodsController.updatePost)


//电影列表
rount.get('/movies',moviesController.find)
rount.get('/movies/del',moviesController.del)
rount.get('/movies/update',moviesController.update)
rount.post('/movies/update',moviesController.updatePost)
rount.post('/movies/upload',moviesController.upload)
rount.get('/movies/add',moviesController.add)
rount.get('/movies/add',moviesController.add)
rount.post('/movies/add',moviesController.addPost)
rount.post('/movies/findMovieId',moviesController.findMovieId)

//影院列表 findMoviesInfo
rount.get('/cinemas',cinemasController.find)
rount.get('/cinemas/del',cinemasController.del)
rount.get('/cinemas/cinemaMovies',cinemasController.cinemaMovies)
rount.get('/cinemas/detail',cinemasController.detail)
rount.get('/cinemas/findMoviesInfo',cinemasController.findMoviesInfo)

module.exports = rount;    