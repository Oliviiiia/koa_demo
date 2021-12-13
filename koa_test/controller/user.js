
const path = require('path');
const fs = require('fs');


let userPath = path.join(__dirname, '../data/user.json');

let userData = JSON.parse(fs.readFileSync(userPath, 'utf8'));



//user处理逻辑
class User {
    //登陆验证处理
    login(ctx) {
        let { username, password } = ctx.request.body;//拿到post请求数据

        if (!username || !password) {
            return ctx.response.body = {
                code: 0,
                message: "用户名或密码不能为空"
            };
        };

        let user = userData.find((user) => username === user.username && password === user.password);
        if (!user) {
            return ctx.response.body = {
                code: 0,
                message: "用户名或密码错误"
            };
        }

        return ctx.response.body = {
            code: 1,
            message: "登录成功",
            data: user
        };
    }

    //注册验证处理
    register(ctx) {
        let { username, password, email} = ctx.request.body;//拿到post请求数据

        if (!username || !password || !email) {
            return  ctx.response.body = {
                code:0, 
                message: "用户信息请填写完整"
            }
        };

        let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

        if (!reg.test(password)) {
            return ctx.response.body = {
                code:0, 
                message:"密码格式不正确"
            }
        };

        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
            return ctx.response.body = {
                code:0, 
                message:"请填写正确的邮箱"
            }
        }
        let user = userData.find((user) => username === user.username);
        if (user) {
            return ctx.response.body = {
                code:0, 
                message:"用户名已经存在！"
            }
        };

        //注册成功
        userData.push({username,password, email});
        fs.writeFileSync(userPath, JSON.stringify(userData));
        return ctx.response.body = {
            code:1, 
            message:"注册成功",
            data:user
        }
    }
};

module.exports = new User();

 
 


 