var mongoose = require('mongoose');

//1.定义骨架
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: String,
        default: false
    }
})
//2.定义方法
UserSchema.statics.isUserAndPwd = function (obj, callback) {
    //判断密码是否正确
    this.findOne({ username: obj.username }, (err, result) => {
        if (result != null && obj.password == result.password && result.isAdmin == "true") {
            callback(true)
        } else {
            callback(false)
        }
    })
}
//3.暴露
module.exports = mongoose.model('user', UserSchema);