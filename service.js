/* 业务模块 */
const db = require('./db.js');

// 具体的业务模块

// 主登录页面
exports.login = (req, res) => {
    res.redirect('/www/welcome.html'); // 怎么样让/ 直接进入welcome.html？
}
// 管理员登录
exports.loginAdmin = (req, res) => {
    let param = req.body; // 获得参数
    let sql = 'select count(*) as total from manager where managerName =? and managerPassword =?';
    let data = [param.managerName, param.managerPassword];

    db.base(sql, data, (result) => {
        if (result[0].total == 1) {
            req.session.user = param;
            console.log(req.session.user);
            res.json({
                flag: 1,
                user: req.session.user
            }); // 给数据里添加一个标志位1
        } else {
            let sql = 'select count(managerName) as managerName from manager where managerName =?';
            let data = [param.managerName];
            db.base(sql, data, (result) => {
                // 用户名已存在
                if (result[0].managerName == 1) {
                    req.session.error = "用户名已存在，但是密码错误";
                    console.log(req.session.error);
                    res.json({
                        flag: 4,
                        warn: "用户名已存在，但是密码错误",
                        choice: "点击确认返回登录页，重新输入正确信息"
                    });
                } else {
                    res.json({
                        flag: 5,
                        warn: "你不是管理员！",
                        choice: "点击确认返回登录页，重新输入正确信息"
                    });
                }
            })
        }
    })
}
// 学生登录
exports.loginStu = (req, res) => {
    let param = req.body; // 获得参数
    //console.log(param);
    //res.send('abc');
    let sql = 'select count(*) as total from student where studentName =? and studentPassword =?';
    let data = [param.studentName, param.studentPassword];

    db.base(sql, data, (result) => {
        if (result[0].total == 1) {
            req.session.user = param; //  问题：怎样把user给学生查询那里？
            res.json({
                flag: 1,
                user: req.session.user
            }); // 给数据里添加一个标志位1
        } else {
            let sql = 'select count(studentName) as studentName from student where studentName =?';
            let data = [param.studentName];
            db.base(sql, data, (result) => {
                // 用户名已存在
                if (result[0].studentName == 1) {
                    req.session.error = "用户名已存在，但是密码错误";
                    console.log(req.session.error);
                    res.json({
                        flag: 4,
                        warn: "用户名已存在，但是密码错误",
                        choice: "点击确认返回登录页，重新输入正确信息"
                    });
                } else { // 新用户，要注册
                    req.session.error = "新用户，要注册";
                    console.log(req.session.error);
                    res.json({
                        flag: 5,
                        warn: "新用户，要注册",
                        choice: "点击确认进入注册页"
                    });
                }
            })
        }
    })
}

exports.failure = (req, res) => {
    // 登录失败
    res.json({
        flag: 6
    });
}

// 注册
exports.getRegister = (req, res) => {
    //跳转到注册页面
    res.json({
        flag: 3
    });
}
exports.register = (req, res) => {
    let param = req.body; // 获得参数
    let sql = 'select count(studentName) as studentName from student where studentName =?';
    let data = [param.studentName];
    db.base(sql, data, (result) => {
        // 用户名已存在
        if (result[0].studentName == 1) {
            req.session.error = "用户名已存在，要用新的用户名";
            console.log(req.session.error);
            res.json({
                flag: 4,
                warn: "用户名已存在，要用新的用户名",
                choice: "点击确认返回注册页，重新输入正确信息"
            });
        } else { // 新用户，可以注册
            let sql = 'insert into student set?';
            let data = param;
            db.base(sql, data, (result) => {
                console.log(result);
                if (result.affectedRows == 1) { // 插入操作成功，影响了一行
                    res.json({
                        flag: 1,
                        warn: "注册成功",
                        choice: "点击确认返回登录页"
                    }); // 给数据里添加一个标志位1
                } else {
                    res.json({
                        flag: 2
                    });
                }
            })
        }
    })
}

// ---------------------------------------图书管理--------------------------------------------
// 跳转到主页面
exports.allBooks = (req, res) => {
    let sql = 'select * from book';
    let data = null;
    db.base(sql, data, (result) => {
        console.log(result);
        let _result = result;
        let result1 = null;
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        // 借阅表中有ISBN记录，并且还书日期为空时，该ISBN对应的书籍状态为不可借
        let sql = 'select ISBN from borrow where ISBN in (select ISBN from book where ISBN=borrow.ISBN) and returnDate = "0000-00-00 00:00:00"'
        db.base(sql, data, (result) => {
            if (result != null) {
                result1 = result;
                for (var index in result1) {
                    // console.log(result1[index]);
                    //console.log(result1[index].ISBN);
                    //console.log(index);
                    arr.push(result1[index].ISBN)
                    //res.json(result1[index].ISBN)
                }
                for (var index in _result) {
                    arr1.push(_result[index].ISBN)
                    var c = arr.toString();
                    for (var i = 0; i < arr1.length; i++) {
                        if (c.indexOf(arr1[i].toString()) > -1) {
                            // 找到相同的ISBN的下标与全部图书里的ISBN对比，相同的就让全部图书里的图书状态为不可借
                            if (_result[index].ISBN == arr1[i]) {
                                //console.log(_result[index]);
                                _result[index].bookState = "不可借";
                                console.log(_result[index]);
                            }
                        }
                    }

                    if (_result[index].bookState != "不可借") {
                        _result[index].bookState = "可借";
                    }
                }

                // 返回全部图书信息
                res.json(_result);
            }
        })
    })
    console.log(req.session.user); // 拿得到user
    console.log("到这里");
};
// 添加图书提交表单
exports.addBook = (req, res) => {
    let info = req.body; // 表单里的数据
    let sql = 'insert into book set?';
    //let data = info;
    let data = {
        ISBN: info.ISBN,
        bookName: info.bookName,
        bookAuthor: info.bookAuthor,
        bookMain: info.bookMain,
        bookPubish: info.bookPubish,
        bookPrice: info.bookPrice,
        pubishDate: info.pubishDate,
        bookState: info.bookState,
        addDate: info.addDate,
        sortId: info.sortId,
        managerId: info.managerId
    }
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 插入操作成功，影响了一行
            res.json({
                flag: 1
            }); // 给数据里添加一个标志位1
        } else {
            res.json({
                flag: 2
            });
        }
    })
};
// 根据id跳转到编辑图书页面
exports.getBookById = (req, res) => {
    let ISBN = req.params.ISBN;
    let sql = 'select * from book where ISBN =?';
    let data = [ISBN];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
};
// 编辑图书并提交表单
exports.editBook = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update book set bookName =?,bookAuthor =?,sortId =?,bookMain =?,pubishDate =?,bookPrice =?,bookState =?,addDate =?,sortId =?,managerId =? where ISBN =?';
    let data = [info.bookName, info.bookAuthor, info.sortId, info.bookMain, info.pubishDate, info.bookPrice, info.bookState, info.addDate, info.sortId, info.managerId, info.ISBN];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
};
// 根据id删除图书信息
exports.deleteBook = (req, res) => {
    let id = req.params.ISBN;
    let sql = 'delete from book where ISBN = ?';
    let data = [id];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
};

// ----------------------------图书类别管理---------------------------------
exports.allBooksorts = (req, res) => {
    let sql = 'select * from booksorts';
    let data = null;
    db.base(sql, data, (result) => {
        res.json(result); // 将数据转换成json形式
    })
}

exports.addSort = (req, res) => {
    let info = req.body; // 表单里的数据
    let sql = 'insert into booksorts set?';
    //let data = info;
    let data = {
        sortId: info.sortId,
        sortName: info.sortName
    }
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 插入操作成功，影响了一行
            res.json({
                flag: 1
            }); // 给数据里添加一个标志位1
        } else {
            res.json({
                flag: 2
            });
        }
    })
};

exports.getSortById = (req, res) => {
    let sortId = req.params.sortId;
    let sql = 'select * from booksorts where sortId =?';
    let data = [sortId];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
};

exports.editSort = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update booksorts set sortName =? where sortId =?';
    let data = [info.sortName, info.sortId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
};

exports.deleteSort = (req, res) => {
    let sortId = req.params.sortId;
    let sql = 'delete from booksorts where sortId = ?';
    let data = [sortId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
};

// ----------------------------人员管理-------------------------------------
// ----------------------------学生管理-------------------------------------
exports.allStudents = (req, res) => {
    let sql = 'select * from student';
    let data = null;
    db.base(sql, data, (result) => {
        //console.log(result);
        res.json(result); // 将数据转换成json形式
    })
}

exports.addStudent = (req, res) => {
    let info = req.body; // 表单里的数据
    let sql = 'insert into student set?';

    let data = {
        studentName: info.studentName,
        studentSex: info.studentSex,
        studentAge: info.studentAge,
        studentGroup: info.studentGroup,
        studentSdept: info.studentSdept,
        studentId: info.studentId
    }
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 插入操作成功，影响了一行
            res.json({
                flag: 1
            }); // 给数据里添加一个标志位1
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

exports.getStudentById = (req, res) => {
    let studentId = req.params.studentId;
    let sql = 'select * from student where studentId =?';
    let data = [studentId];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
}

exports.editStudent = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update student set studentId =?,studentName =?,studentSex =?,studentAge =?,studentGroup =?,studentSdept =? where studentId =?';
    let data = [info.studentId, info.studentName, info.studentSex, info.studentAge, info.studentGroup, info.studentSdept, info.studentId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

exports.deleteStudent = (req, res) => {
    let studentId = req.params.studentId;
    let sql = 'delete from student where studentId = ?';
    let data = [studentId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

// -----------------------管理员管理----------------------------
exports.allManagers = (req, res) => {
    let sql = 'select * from manager';
    let data = null;
    db.base(sql, data, (result) => {
        res.json(result); // 将数据转换成json形式
    })
}

exports.addManager = (req, res) => {
    let info = req.body; // 表单里的数据
    // 先判断用户名是否已经存在
    let sql = 'select count(*) as managerName from manager where managerName =?';
    let data = [info.managerName];
    db.base(sql, data, (result) => {
        // 用户名已存在,不能再添加同样的
        if (result[0].managerName == 1) {
            req.session.error = "用户名已存在";
            res.json({
                flag: 3
            })
        } else {
            let sql = 'insert into manager set?';
            //let data = info;
            let data = {
                managerName: info.managerName,
                managerPassword: info.managerPassword,
                managerSex: info.managerSex,
                managerId: info.managerId,
                managerTel: info.managerTel
            }
            db.base(sql, data, (result) => {
                if (result.affectedRows == 1) { // 插入操作成功，影响了一行
                    res.json({
                        flag: 1
                    }); // 给数据里添加一个标志位1
                } else {
                    res.json({
                        flag: 2
                    });
                }
            })
        }
    })
}

exports.getManagerById = (req, res) => {
    let managerId = req.params.managerId;
    let sql = 'select * from manager where managerId =?';
    let data = [managerId];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
}

exports.editManager = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update manager set managerName =?,managerPassword =?,managerSex =?,managerTel =? where managerId =?';
    let data = [info.managerName, info.managerPassword, info.managerSex, info.managerTel, info.managerId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

exports.deleteManager = (req, res) => {
    let managerId = req.params.managerId;
    let sql = 'delete from manager where managerId = ?';
    let data = [managerId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

// =======================借书管理=========================
exports.allBorrow = (req, res) => {
    let sql = 'select * from borrow';
    let data = null;
    db.base(sql, data, (result) => {
        res.json(result); // 将数据转换成json形式
    })
}
exports.addBorrow = (req, res) => {
    let info = req.body; // 表单里的数据
    let sql = 'insert into borrow set?';
    //let data = info;
    let data = {
        studentId: info.studentId,
        ISBN: info.ISBN,
        borrowDate: info.borrowDate,
        returnDate: info.returnDate
    }
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 插入操作成功，影响了一行
            res.json({
                flag: 1
            }); // 给数据里添加一个标志位1
        } else {
            res.json({
                flag: 2
            });
        }
    })
}
exports.getBorrowById = (req, res) => {
    let studentId = req.params.studentId;
    let sql = 'select * from borrow where studentId =?';
    let data = [studentId];
    db.base(sql, data, (result) => {
        res.json(result[0]);
    })
}
exports.editBorrow = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update borrow set borrowDate =?,returnDate =? where studentId =? and ISBN =?';
    let data = [info.borrowDate, info.returnDate, info.studentId, info.ISBN];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) { // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}
exports.deleteBorrow = (req, res) => {
    let studentId = req.params.studentId;
    let sql = 'delete from borrow where studentId = ?';
    let data = [studentId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}
// -------------------学生查询-------------------------
exports.ownStudent = (req, res) => {
    res.json(req.session.user.studentName);
    console.log(req.session.user.studentName); // 拿到了user，怎样给前端呢？
}
// 学生个人信息
exports.myStudent = (req, res) => {
    let studentName = req.params.studentName;
    let sql = 'select * from student where studentName=?';
    let data = [studentName];
    db.base(sql, data, (result) => {
        res.json({
            "result": result
        })
    })
}

exports.editMyStudent = (req, res) => {
    let info = req.body; // 获得当前编辑的图书信息数据
    let sql = 'update student set studentPassword =? where studentId =?';
    let data = [info.studentPassword, info.studentId];
    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            console.log(req.session.user); // 更新成功就在数据中插入标志位1
            res.json({
                flag: 1
            });
        } else {
            res.json({
                flag: 2
            });
        }
    })
}

// 借阅信息学生
exports.getBorrow = (req, res) => {
    let studentName = req.session.user.studentName;
    let sql = 'select * from borrow where studentId in (select studentId from student where studentId = borrow.studentId and studentName=?)'
    let data = [studentName];
    db.base(sql, data, (result) => {
        res.json(result);
    })
}

// 注销
exports.logout = (req, res) => {
    console.log(req.session.user); // 这一步的user还是存在的，下一步就删除了
    req.session.destroy();
    res.json({
        flag: 1
    });
}