var mongoose = require('mongoose');

//1.定义骨架
var SingerSchema = mongoose.Schema({
    "artist_id":String,//id
    "avatar_small": String,//图片
    "name": String,//组合名称
    "gender": String,//性别
    "country": String, //国家
    "songs_total": String//歌曲数目
})
//2.定义方法
SingerSchema.statics.findDataAndCount = function (limit,page,callback) {
    var _this = this;
    _this.find({}).limit(limit).skip(page*limit).then(function(result){
        //查找出总数据量
        _this.find({}).countDocuments().then(function(count){
            //返回数据
            callback(result,Math.ceil(count/limit))
        })   
    })
}
//删除
SingerSchema.statics.delSinger = function(id,callback){
    this.deleteOne({artist_id:id},(err,result)=>{
        callback(1)
    })
}
//3.暴露
module.exports = mongoose.model('singer', SingerSchema);