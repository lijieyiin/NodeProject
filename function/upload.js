var formidable = require('formidable')
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");

//上传图片
module.exports = function (req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = './tupianhuancun';
    form.parse(req, function (err, field, files) {
        if (err) throw Error(err);
        //判断图片大小
        var size = files.file.size / 1024 / 1024;
        if (size > 5) {
            fs.unlink("./" + files.file.path, function (err) {
                if (err) {
                    callback({ code: 201 })
                    return;
                }
            })
        }
        //如果更换过缩略图，将原来存储在本地的图片删除
        // if (field.oldThumbnail) {
        //     fs.unlink("." + field.oldThumbnail, function (err) {
        //         if (err) {
        //             callback({ code: 201 })
        //             return;
        //         }
        //     })
        // }
        var tt = sd.format(new Date(), 'YYYYMMDDHHmmss');// 时间戳
        var ran = parseInt(Math.random() * 89999 + 10000);  //随机数
        var ext = path.extname(files.file.name); //后缀名 .jpg

        var oldPath = "./" + files.file.path; //旧路径
        var newPath = path.normalize(__dirname + "/../uploads/" + tt + ran + ext)

        // 修改文件名称
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                throw Error("图片修改失败");
            }
            var imgurl = "/uploads/" + tt + ran + ext;
            callback({ code: 200,"url": imgurl })
        })
    })
}