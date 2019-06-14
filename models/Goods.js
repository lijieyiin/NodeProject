var mongoose = require('mongoose');
var fs = require("fs");
//1.定义骨架
var GoodsSchema = mongoose.Schema({
    // 分类id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: "Category"
    },
    //标题
    "title": {
        type: String,
        default: ""
    },
    //地址
    "address": {
        type: String,
        default: ""
    },
    //价格
    "price": {
        type: String,
        default: ""
    },
    //旧价格
    "oldPrice": {
        type: String,
        default: ""
    },
    //收藏
    "isCollect": {
        type: Boolean,
        default: false
    },
    //简介
    "description": {
        type: String,
        default: ""
    },
    //介绍
    "content": {
        type: String,
        default: ""
    },
    //缩略图
    "thumbnail": {
        type: String,
        default: ""
    },
    //多图片
    "imgs": {
        type: Array,
        default: ""
    },
    //添加时间
    "addTime": {
        type: Date,
        default: new Date()
    }
})
//2.定义方法  
GoodsSchema.statics.findDataAndCount = function (limit, page, callback) {
    var _this = this;
    _this.find({}).sort({ '_id': -1 }).limit(limit).skip(page * limit).then(function (result) {
        //查找出总数据量
        _this.find({}).countDocuments().then(function (count) {
            //返回数据
            callback(result, Math.ceil(count / limit))
        })
    })
}
//添加
GoodsSchema.statics.addGoods = function (obj, callback) {
    this.insertMany(obj, (err, result) => {
        if (err) throw Error("添加失败！")
        callback(result)
    })
}
//删除
GoodsSchema.statics.delGoods = function (req, callback) {
    var _this = this;
    //查找数据
    _this.findOne({ _id: req.query.id }, (err, result) => {
        result.imgs.push(result.thumbnail);
        //删除数据库中的数据
        _this.deleteOne({ _id: req.query.id }, (err) => {
            if (err) {
                callback({ code: 201 })
                return;
            }
            else {
                //删除图片
                if (result.imgs.length > 0) {
                    (function delImg(i) {
                        if (i == result.imgs.length) {
                            callback({ code: 200 })
                            return;
                        }
                        fs.unlink("./" + result.imgs[i], function (err) {
                            if (err) {
                                callback({ code: 201 })
                                return;
                            } else {
                                delImg(i + 1)
                            }
                        })
                    })(0)
                }
            }
        })
    })
}
//删除图片
GoodsSchema.statics.deleteImgs = function (req, callback) {
    fs.unlink("./" + req.body.url, function (err) {
        if (err) {
            callback({code:201})
            return;
        }
        callback({code:200})
    })
}
//修改
GoodsSchema.statics.findGoods = function (id, callback) {
    this.findOne({ _id: id }, (err, result) => {
        callback(result)
    })
}
GoodsSchema.statics.updateGoods = function (obj, callback) {
    this.findOne({ _id: obj.id }, (err, result) => {
        result.title = obj.title
        result.address = obj.address
        result.price = obj.price
        result.oldPrice = obj.oldPrice
        result.isCollect = obj.isCollect
        result.description = obj.description
        result.content = obj.content
        result.thumbnail = obj.thumbnail
        result.imgs = obj.imgs
        result.save(callback(result))
    })
}
//3.暴露
module.exports = mongoose.model('goods', GoodsSchema);