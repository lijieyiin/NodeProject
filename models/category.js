var mongoose = require('mongoose');

//1.定义骨架
var categorySchema = mongoose.Schema({
    username: String,
})
//2.定义方法
//分页功能
categorySchema.statics.findDataAndCount = function (limit,page, callback) {
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
categorySchema.statics.addCategory = function(obj,callback){
    this.insertMany(obj,(err,result)=>{
        if(err) throw Error("添加失败！")
        callback(result)
    })
}
//删除
categorySchema.statics.delCategory = function(id,callback){
    this.deleteOne({_id:id},(err,result)=>{
        callback(1)
    })
}
//3.暴露
module.exports = mongoose.model('person', categorySchema);