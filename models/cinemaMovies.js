var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sd = require("silly-datetime");
// mongoose.connect('mongodb://127.0.0.1:27017/admin1916', { useNewUrlParser: true }, function (err) {
//     if (err) throw Error('请检查数据库的连接')
// })

//1.定义骨架
var cinemaMoviesSchema = mongoose.Schema({
    "cinemaId": String,//电影院id
    "cinemaName": String,//电影院名
    "cinemaAddress": String,//电影院地址
    "cinemaTel": String,//电影院电话
    "movieId": {//电影id
        type: Array,
        default: ""
    },
    "movieImg": {//电影海报
        type: Array,
        default: ""
    },
    "movieName": {//电影名称
        type: Array,
        default: ""
    },
    "movieScore": {//电影评分
        type: Array,
        default: ""
    },
    "movieTime": {//电影时长
        type: Array,
        default: ""
    },
    "movieType": {//电影类型
        type: Array,
        default: ""
    },
    "movieActor": {//电影主演
        type: Array,
        default: ""
    },
    "movieShow": {//电影观影时间
        type: Array,
        default: ""
    },
    "movieWatchTime": {//电影观影具体时间
        type: Array,
        default: ""
    }

})
//2.定义方法
//查找一条数据
cinemaMoviesSchema.statics.findOneData = function(id,callback){
    this.findOne({cinemaId:id},(err,result)=>{
        callback(result)
    })
}

//添加
cinemaMoviesSchema.statics.addcinemaMovies = function (arr, callback) {
    this.insertMany(arr, (err, result) => {
        if (err) {
            throw Error("添加失败！")
        }
        console.log("999")
        callback(1)
    })
}
//删除
cinemaMoviesSchema.statics.delcinemaMovies = function (id, callback) {
    this.deleteOne({ _id: id }, (err, result) => {
        callback(1)
    })
}
//3.暴露
module.exports = mongoose.model('cinemaMovie', cinemaMoviesSchema);