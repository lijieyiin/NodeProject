//1.连接数据库
var mongoose = require('mongoose');

//2.定义骨架Schema 学生
var studentSchema = mongoose.Schema({
    username: String,
    age: Number,
    school:String,
    major:String
})
  
//定义方法
//查找
studentSchema.statics.findStudent = function(obj,callback){
    this.find(obj,(err,result)=>{
        callback(result)
    })
} 

//删除
studentSchema.statics.delStudent = function(id,callback){
    this.deleteOne({_id:id},(err,result)=>{
        callback(1)
    })
} 

//添加
studentSchema.statics.addStudent = function(obj,callback){
    this.insertMany(obj,(err,result)=>{
        if(err) throw Error("添加失败！")
        callback(result)
    })
}

//修改
studentSchema.statics.updateStudent = function(obj,callback){
   
    this.find({_id:obj._id},(err,result)=>{
        result[0].username = obj.username;
        result[0].age = obj.age;
        result[0].school = obj.school;
        result[0].major = obj.major;
        result[0].save();
        callback(1)
    })
    
}
  

//3.定义model
var studentModel = mongoose.model('student', studentSchema)

//暴露骨架
module.exports = studentModel;