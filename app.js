// 搭建web服务
const http = require('http');
const express = require('express');//第三方模块express
const app = express();
const server = http.createServer(app)//创建服务
server.listen(3000);//监听3000端口


const userRouter = require(__dirname + '/router/user.js')//引用usermo块请求

app.use('*', (req, res, next) => {//应用中间件处理跨域问题
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use("/user", userRouter)//使用express路由中间件
