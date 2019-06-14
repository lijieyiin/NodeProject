//项目入口文件只做配置

var express = require('express');
var bodyParser = require('body-parser')
var ejs = require('ejs');
var mongoose = require('mongoose')
var session = require('express-session')
var app = express();

//seesion配置
app.use(session({
    secret:"love home",
    resave:false,
    saveUninitialized:true
}))

app.engine('html', ejs.__express);
app.set('view engine','html');

app.use(express.static('./public'))
app.use("/uploads",express.static('./uploads'))

//解析post请求的数据body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//第一模块 前台模块 Main
app.use('/',require('./routers/Main'))  
  
//第二模块 后台模块 Admin   
app.use('/admin',require('./routers/Admin'))

//第三模块 API模块 Api
app.use('/api',require('./routers/Api'))


//数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/admin1916',{useNewUrlParser:true},function(err){
    if(err) throw Error('请检查数据库的连接')
    else{
        app.listen(3000, '127.0.0.1',(err, data)=>{ console.log('开启服务成功,请访问 http://127.0.0.1:3000')})
    }
})