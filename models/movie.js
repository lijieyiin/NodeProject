var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sd = require("silly-datetime");
// mongoose.connect('mongodb://192.168.31.147:27017/admin1916',{useNewUrlParser:true},function(err){
//     if(err) throw Error('请检查数据库的连接')
// })

//1.定义骨架
var MoviesSchema = mongoose.Schema({
    "movieId": String,//电影id
    "title": String,//电影名称
    "nailName": String,//电影别称
    "img": String,//图片
    "type": String,//类型
    "country": String,//国家
    "score": String,//电影评分
    "totalTime": String,//片长
    "date": String,//上映时间
    "content": String,//简介
})
//2.定义方法
//分页功能
MoviesSchema.statics.findDataAndCount = function (text, limit, page, callback) {
    var _this = this;
    const keyword = text;
    const reg = new RegExp(keyword, 'i');//不区分大小写

    var obj = {
        $or: [
            { movieId: { $regex: reg } },
            { type: { $regex: reg } },
            { title: { $regex: reg } },
            { score: { $regex: reg } },
            { nailName: { $regex: reg } },
            { totalTime: { $regex: reg } },
        ]
    }

    _this.find(obj).limit(limit).skip(page * limit).then(function (result) {
        //查找出总数据量
        _this.find(obj).countDocuments().then(function (count) {
            //返回数据
            callback(result, Math.ceil(count / limit))
        })
    })
}
//查找一条数据
MoviesSchema.statics.findOneData = function(id,callback){
    this.findOne({_id:id},(err,result)=>{
        var dateNow = sd.format(new Date(),"YYYY-MM-DD")
        callback(result,dateNow)
    })
}
//查找movieId是否存在
MoviesSchema.statics.findMovieId = function(id,callback){
    this.findOne({movieId:id},(err,result)=>{
        callback(result)
    })
}
//修改
MoviesSchema.statics.updateMovies = function (obj, callback) {
    this.findOne({ _id: obj.id }, (err, result) => {
        result.title = obj.title
        result.nailName = obj.nailName
        result.img = obj.img
        result.type = obj.type
        result.country = obj.country
        result.score = obj.score
        result.totalTime = obj.totalTime
        result.date = obj.date
        result.content = obj.content
        result.save(callback(result))
    })
}
//添加
MoviesSchema.statics.addMovies = function (arr, callback) {
    this.insertMany(arr, (err, result) => {
        if (err) {
            throw Error("添加失败！")
        }
        console.log("999")
        callback(1)
    })
}
//删除
MoviesSchema.statics.delMovies = function (id, callback) {
    this.deleteOne({ _id: id }, (err, result) => {
        callback(1)
    })
}
//3.暴露
module.exports = mongoose.model('movie', MoviesSchema);