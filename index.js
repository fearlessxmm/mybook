/* 入口文件 利用后台实现接口 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
// 路由模块
const router = require('./router');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
    }
}));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    //console.log('err');
    var err = req.session.error;
    res.locals.message = '';
    if (err) {
        res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
        console.log("我是入口文件index.js的" + res.locals.message);
    }
    next();
});

// 引入静态资源
app.use('/www', express.static('public')); // www 虚拟路径 , 要记得加/

// 挂载参数处理中间件（post提交）
// parse application/x-www-form-urlencoded解析application/x-www-form-urlencoded这种格式的数据(这种格式就是表单post默认提交格式)
app.use(bodyParser.urlencoded({
    extended: false
}));

// 使用路由模块
app.use(router);

// 端口
app.listen(3000, () => {
    console.log('running...');
})