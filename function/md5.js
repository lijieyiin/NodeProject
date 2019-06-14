var md5 = require('md5');

module.exports = function(obj){
    var bool = true;
    //1. 遍历obj 的对象进行验证
    for(var val in obj){
        //1.1 用户名验证
        if(val == 'username'){
            if(obj[val].length < 2 || obj[val].length >12){
                bool = false;
            }
        }else if(val == 'password'){//1.2密码验证
            var req = /^[a-zA-Z0-9]\w{5,17}$/;//正则
            if(!req.test(obj[val])) bool = false;
        }
    }

    //2.通过 -- obj
    if(bool){ 
        //2.1 对密码进行加密
        var pwd = md5(md5(obj['password']).substr(5,8) + md5(obj['password']).substr(9,12))
        obj['password'] = pwd
        return obj;    
    }else{
        return bool;
    }
}