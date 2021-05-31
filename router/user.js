// 加载express模块
const express = require('express');
// 创建路由对象
let router = express.Router();

// 处理请求
//http://127.0.0.1:3000/user/login
router.get('/login', (req, res) => {
    res.send('login')
})
module.exports = router;