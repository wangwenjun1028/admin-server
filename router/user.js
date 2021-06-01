// 加载express模块
const express = require('express');
// 创建路由对象
let router = express.Router();

// 处理请求
//http://127.0.0.1:3000/user/login

const tokens = {//请求请求成功,携带roken，存在客户端
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

router.post('/login', (req, res) => {
    // 处理登录请求
    console.log(111)
    let data = '';
    req.on('data', chunk => {
        // chunk默认是个二进制数据，和data拼接自动转化为字符串
        data += chunk;
    })
    req.on('end', () => {
        let { username } = JSON.parse(data);
        console.log(data)
        let token = tokens[username].token;
        console.log(username)
        if (token) {
            res.json({
                code: 20000,
                data: token
            })
        } else {
            res.json({
                code: 60204,
                message: 'Account and password are incorrect.'
            })
        }
    })
})
router.get('/text', (req, res) => {
    res.json({
        code: 20000,
        meg: 'text请求成功'
    })
})
module.exports = router;