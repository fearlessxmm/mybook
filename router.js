/* 路由模块 */

/* 
    get http://localhost:3000/books 主页面
    get http://localhost:3000/books/book    跳转到添加图书页面
    post http://localhost:3000/books/book   添加图书，提交表单
    get http://localhost:3000/books/book/1  跳转到编辑图书页面
    put http://localhost:3000/books/book    编辑图书，提交表单
    delete http://localhost:3000/books/book/1 删除图书信息
*/
const express = require('express');
// 生成路由对象
const router = express.Router();
// 引入业务模块
const service = require('./service.js');

// 绑定路由

// ------------------登录管理--------------------------
// 主登录页面
router.get('/',service.login);
// 准备一个post路由:管理员登录
router.post('/loginAdmin',service.loginAdmin);

// 准备一个post路由:学生登录注册
router.post('/loginStu',service.loginStu);
router.get('/failure',service.failure);

// 注册用户
router.get('/register',service.getRegister);
router.post('/register',service.register);

//=========================图书管理===========================

//-------------------图书信息管理---------------------
// 提供所有的图书信息（路径，业务方法）
router.get('/books',service.allBooks);

// 添加图书时提交表单
router.post('/books/book',service.addBook);

// 编辑图书时根据相应的id查询图书信息
router.get('/books/book/:ISBN',service.getBookById);

// 提交编辑的数据
router.put('/books/book',service.editBook);

// 删除图书信息,根据相应的id
router.delete('/books/book/:ISBN',service.deleteBook);

//-------------------图书类别管理--------------------------
// 提供所有的图书类别信息
router.get('/booksorts',service.allBooksorts);

// 添加图书类别时提交表单
router.post('/booksorts/sort',service.addSort);

// 编辑图书类别时根据相应的id查询图书类别信息
router.get('/booksorts/sort/:sortId',service.getSortById);

// 提交编辑的数据
router.put('/booksorts/sort',service.editSort);

// 删除图书类别信息，根据相应的id
router.delete('/booksorts/sort/:sortId',service.deleteSort);



//==========================人员管理==================================

//----------------------学生信息管理------------------------
// 提供所有学生信息
router.get('/students',service.allStudents);

// 添加学生时提交表单
router.post('/students/student',service.addStudent);

// 编辑学生时根据相应的id查询学生信息
router.get('/students/student/:studentId',service.getStudentById);

// 提交编辑的数据
router.put('/students/student',service.editStudent);

// 删除学生信息,根据相应的id
router.delete('/students/student/:studentId',service.deleteStudent);

// --------------------------管理员管理----------------------------
// 提供所有管理员信息
router.get('/managers',service.allManagers);

 // 添加管理员时提交表单
router.post('/managers/manager',service.addManager);

// 编辑学生时根据相应的id查询管理员信息
router.get('/managers/manager/:managerId',service.getManagerById);

// 提交编辑的数据
router.put('/managers/manager',service.editManager);

// 删除管理员信息,根据相应的id
router.delete('/managers/manager/:managerId',service.deleteManager);

// =========================借书管理================================
// 提供所有借书信息
router.get('/borrows',service.allBorrow);
// 添加借书信息
router.post('/borrows/borrow',service.addBorrow);
// 修改借书信息
// 编辑借书信息时根据相应的id查询借书信息
router.get('/borrows/borrow/:studentId',service.getBorrowById);
// 提交编辑的数据
router.put('/borrows/borrow',service.editBorrow);
// 删除借书信息
router.delete('/borrows/borrow/:studentId',service.deleteBorrow);

// -------------------学生查询--------------------------------
router.get('/student',service.ownStudent);
// 查询学生自己的信息
router.get('/student/:studentName',service.myStudent);

// 提交编辑的数据
router.put('/students/mystudent',service.editMyStudent);

// 查阅借阅信息
router.get('/borrows/borrow',service.getBorrow);

// -------------------退出登录-------------------------
//注销页面
router.get('/logout',service.logout);

module.exports = router;// 导出router模块，这样index.js中才能调用