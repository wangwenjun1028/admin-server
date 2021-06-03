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

const userInfos = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

router.post('/login', (req, res) => {
    // 处理登录请求
    let data = '';
    req.on('data', chunk => {
        // chunk默认是个二进制数据，和data拼接自动转化为字符串
        data += chunk;
    })
    req.on('end', () => {
        let { username } = JSON.parse(data);
        let token = tokens[username].token;
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

router.get('/getUserInfos', (req, res) => {//获取已经登录的用户信息
    const { role } = req.query;
    if (role && userInfos[role]) {
        res.json(userInfos[role])
    } else {
        res.json({
            code: 40400,
            message: '该用户信息不存在'
        })
    }
})
module.exports = router;