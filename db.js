/* 封装api */
/* 操作数据库的基本步骤  */

// 加载数据库驱动
var mysql      = require('mysql');

exports.base = (sql,data,callback) => {
    // 创建数据库连接
    var connection = mysql.createConnection({
        host     : 'localhost',// 数据库所在的服务器的域名或者IP地址
        user     : 'root',// 登录数据库账号
        password : '',// 登录数据库密码
        database : 'a_book'
    });
    // 执行连接操作
    connection.connect();
    // 操作数据库（数据库操作也是异步的）异步的不能通过返回值来处理，只能通过回调函数
    connection.query(sql,data, function (error, results, fields) {
        if (error) throw error;
        callback(results);// 回调函数
    });
    // 关闭数据库
    connection.end();
}
