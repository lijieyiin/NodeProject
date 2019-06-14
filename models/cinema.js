var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sd = require("silly-datetime");
// mongoose.connect('mongodb://192.168.31.147:27017/admin1916',{useNewUrlParser:true},function(err){
//     if(err) throw Error('请检查数据库的连接')
// })

//1.定义骨架
var cinemaSchema = mongoose.Schema({
    "cinemaId": String,//电影院id
    "img": String,//图片
    "name": String,//影城名
    "address": String,//影城地址
    "tel": String,//影城电话
    "glasses": String,//3D眼镜收费
    "children": String,//儿童优惠
    "carParking": String,//可停车
})
//2.定义方法
//分页功能
cinemaSchema.statics.findDataAndCount = function (text, limit, page, callback) {
    var _this = this;
    const keyword = text;
    const reg = new RegExp(keyword, 'i');//不区分大小写

    var obj = {
        $or: [
            { name: { $regex: reg } },
            { address: { $regex: reg } },
            { tel: { $regex: reg } },
            { glasses: { $regex: reg } },
            { children: { $regex: reg } },
            { carParking: { $regex: reg } },
        ]
    }

    _this.find(obj).limit(limit).skip(page * limit).then(function (result) {
        //查找出总数据量
        _this.find(obj).countDocuments().then(function (count) {
            //返回数据
            callback(result, Math.ceil(count/limit))
        })
    })
}
//查找一条数据
cinemaSchema.statics.findOneData = function(id,callback){
    this.findOne({_id:id},(err,result)=>{
        callback(result,dateNow)
    })
}
//添加
cinemaSchema.statics.addCinemas = function (arr, callback) {
    this.insertMany(arr, (err, result) => {
        if (err) {
            throw Error("添加失败！")
        }
        console.log("999")
        callback(1)
    })
}
//删除
cinemaSchema.statics.delCinemas = function (id, callback) {
    this.deleteOne({ _id: id }, (err, result) => {
        callback(1)
    })
}
//3.暴露
module.exports = mongoose.model('cinema', cinemaSchema);