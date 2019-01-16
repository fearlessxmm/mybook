$(function () {
    // 登录首页 角色选择
    $("#stu").click(function () {
        console.log(456);
        // 用户：学生
        window.location.href = "http://localhost:3000/www/login_index_stu.html";
    })
    $("#admin").click(function () {
        // 用户：管理员
        window.location.href = "http://localhost:3000/www/login_index.html";
    })
    // -----------------login_admin---------------------------------------   
    var formLogin_admin = $('#formLogin_admin');
    $("#btn").click(function () {
        var warnForm_login_admin = $('#warnForm_login_admin');
        $.ajax({
            url: '/loginAdmin',
            type: 'POST',
            //data:data,
            //dataType:'json',
            data: formLogin_admin.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.flag == 1) {
                    //console.log(data.user);
                    window.location.href = "http://localhost:3000/www/include.html";
                } else if (data.flag == 4) {
                    // 填充表单数据
                    console.log(data);
                    warnForm_login_admin.find('p:eq(0)').html(data.warn);
                    warnForm_login_admin.find('p:eq(1)').html(data.choice);
                    //页面层
                    layer.open({
                        type: 1,
                        title: "提示",
                        skin: 'layui-layer-rim', //加上边框
                        area: ['420px', '300px'], //宽高
                        content: warnForm_login_admin,
                        success: function (layero) {
                            var mask = $(".layui-layer-shade");
                            mask.appendTo(layero.parent());
                            //其中：layero是弹层的DOM对象
                            // 对表单提交按钮重新绑定单击事件
                            $("#btn1").unbind('click').click(function (e) {
                                // 点击确认按钮回到登录页
                                // 关闭弹窗                                        
                                layer.closeAll();
                                window.location.href = "http://localhost:3000/www/login_index.html";
                            })
                        }
                    })
                }
            }
        });
    })
    // -----------------login_stu-----------------------------------------
    // 登录
    var formlogin = $('#formLogin');
    $('#stu_btn').click(function () {
        var warnform_login = $('#warnForm_login');
        $.ajax({
            url: '/loginStu',
            type: 'POST',
            data: formlogin.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.flag == 1) {
                    console.log(1);
                    console.log(data.user);
                    window.location.href = "http://localhost:3000/www/include_stu.html";
                } else {
                    if (data.flag == 4) {
                        // 填充表单数据
                        console.log(data);
                        warnform_login.find('p:eq(0)').html(data.warn);
                        warnform_login.find('p:eq(1)').html(data.choice);
                        //页面层
                        layer.open({
                            type: 1,
                            title: "提示",
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '300px'], //宽高
                            content: warnform_login,
                            success: function (layero) {
                                var mask = $(".layui-layer-shade");
                                mask.appendTo(layero.parent());
                                //其中：layero是弹层的DOM对象
                                // 对表单提交按钮重新绑定单击事件
                                $('#stu_btn1').unbind('click').click(function (e) {
                                    console.log(e.currentTarget);
                                    console.log('請求4');
                                    // 点击确认按钮回到登录页
                                    // 关闭弹窗                                        
                                    layer.closeAll();
                                    window.location.href = "http://localhost:3000/www/login_index_stu.html";
                                })
                            }
                        })
                    } else if (data.flag == 5) {
                        // 填充表单数据
                        console.log(data);
                        warnform_login.find('p:eq(0)').html(data.warn);
                        warnform_login.find('p:eq(1)').html(data.choice);
                        //页面层
                        layer.open({
                            type: 1,
                            title: "提示",
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '300px'], //宽高
                            content: warnform_login,
                            success: function (layero) {
                                var mask = $(".layui-layer-shade");
                                mask.appendTo(layero.parent());
                                //其中：layero是弹层的DOM对象
                                // 对表单提交按钮重新绑定单击事件
                                $('#stu_btn1').unbind('click').click(function (e) {
                                    console.log(e.currentTarget);
                                    console.log('請求5');
                                    // 点击确认按钮进入注册页
                                    // 关闭弹窗                                        
                                    layer.closeAll();
                                    window.location.href = "http://localhost:3000/www/login_register.html";
                                })
                            }
                        })
                    }
                }
            }
        });
    });

    // 注册
    var formregister = $('#formRegister');
    formlogin.find('input[type=button]:eq(1)').click(function () {
        $.ajax({
            type: 'get',
            url: '/register',
            dataType: 'json', // 响应的内容
            success: function (data) {
                if (data.flag == 3) {
                    window.location.href = "http://localhost:3000/www/login_register.html";
                }
            }
        })
    });
    $("#reg_btn").click(function () {
        var warnform = $('#warnForm');
        $.ajax({
            type: 'post',
            url: '/register',
            data: formregister.serialize(),
            dataType: 'json', // 响应的内容
            success: function (data) {
                if (data.flag == 1) {
                    // 填充表单数据
                    console.log(data);
                    warnform.find('p:eq(0)').html(data.warn);
                    warnform.find('p:eq(1)').html(data.choice);
                    //页面层
                    layer.open({
                        type: 1,
                        title: "提示",
                        skin: 'layui-layer-rim', //加上边框
                        area: ['420px', '300px'], //宽高
                        content: warnform,
                        success: function (layero) {
                            var mask = $(".layui-layer-shade");
                            mask.appendTo(layero.parent());
                            //其中：layero是弹层的DOM对象
                            // 对表单提交按钮重新绑定单击事件
                            warnform.find('input[type=button]').unbind('click').click(function (e) {
                                console.log(e.currentTarget);
                                console.log('請求');
                                // 点击确认按钮回到登录页
                                // 关闭弹窗                                        
                                layer.closeAll();
                                window.location.href = "http://localhost:3000/www/login_index_stu.html";
                            })
                        }
                    })
                } else if (data.flag == 4) { //用戶名已存在，要用新的用戶名
                    warnform.find('p:eq(0)').html(data.warn);
                    warnform.find('p:eq(1)').html(data.choice);
                    //页面层
                    layer.open({
                        type: 1,
                        title: "提示",
                        skin: 'layui-layer-rim', //加上边框
                        area: ['420px', '300px'], //宽高
                        content: warnform,
                        success: function (layero) {
                            var mask = $(".layui-layer-shade");
                            mask.appendTo(layero.parent());
                            //其中：layero是弹层的DOM对象
                            // 对表单提交按钮重新绑定单击事件
                            $("#reg_btn1").unbind('click').click(function (e) {
                                console.log(e.currentTarget);
                                console.log('請求');
                                // 点击确认按钮回到注册页
                                // 关闭弹窗                                        
                                layer.closeAll();
                                window.location.href = "http://localhost:3000/www/login_register.html";
                            })
                        }
                    })
                }
            }
        })
    });
});