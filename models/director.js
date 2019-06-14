var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://192.168.31.147:27017/admin1916',{useNewUrlParser:true},function(err){
//     if(err) throw Error('请检查数据库的连接')
// })

//1.定义骨架
var DirectorSchema = mongoose.Schema({
    "directorId":String,//导演ID 
    "directorName":String,//导演姓名 
    "directorImg":String,//导演照片
})
//2.定义方法
//分页功能
DirectorSchema.statics.findDataAndCount = function (limit,page, callback) {
    var _this = this;
    _this.find({}).limit(limit).skip(page*limit).then(function(result){
        //查找出总数据量
        _this.find({}).countDocuments().then(function(count){
            //返回数据
            callback(result,Math.ceil(count/limit))
        })   
    })
}  
//添加
DirectorSchema.statics.addDirectors = function(arr,callback){
    this.insertMany(arr,(err,result)=>{
        if(err) {
            throw Error("添加失败！")
        }
        console.log("999")
        callback(1)
    })
}
//删除
// SingerSchema.statics.delSinger = function(id,callback){
//     this.deleteOne({artist_id:id},(err,result)=>{
//         callback(1)
//     })
// }
//3.暴露
module.exports = mongoose.model('director', DirectorSchema);