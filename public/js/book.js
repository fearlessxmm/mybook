/* 请求后台的接口数据，拿到之后进行前端的渲染工作 */
$(function () {
    // 渲染列表数据
    function initList() {
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function (data) {
                /* if(data.flag == 2){
                    //console.log(222);
                    // 直接输入http://localhost:3000/www/index.html 不能看到渲染的列表，跳转到登录失败页面，防止了直接输入地址看到我们的主页面
                    window.location.href = "http://localhost:3000/www/login-failure.html";
                }else{ */
                console.log(data);
                // 拿到数据之后渲染模板
                var html = template('indexTpl', {
                    list: data
                });
                // 填充数据给表格
                $("#dataList").html(html);

                // 必须在渲染完成之后才能操作列表里的标签(修改删除的按钮操作)
                $("#dataList").find('tr').each(function (index, element) { // 一个element就是一个tr,是DOM对象，要转成jq对象
                    // 找td
                    var td = $(element).find('td:eq(9)');
                    // 当前路径下的id
                    var ISBN = $(element).find('td:eq(0)').text(); // 也就是表格第一列的编号
                    // 找td里的a标签
                    // 绑定编辑图书的单击事件
                    td.find('button:eq(0)').click(function () {
                        //console.log(1);
                        editBook(ISBN);
                    })
                    // 绑定删除图书的单击事件
                    td.find('button:eq(1)').click(function () {
                        //console.log(2);
                        deleteBook(ISBN);
                    })

                    // 绑定添加图书信息的单击事件
                    addBook();
                    // 重置表单
                    var form = $('#addBookForm');
                    form.get(0).reset();
                    form.find('input[type=hidden]').val(''); // 隐藏域重置，因为reset对隐藏域不起作用
                })


            }
        })
    }
    initList(); // 页面一开始加载的时候渲染列表

    // 删除图书信息
    function deleteBook(ISBN) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + ISBN,
            dataType: 'json',
            success: function (data) {
                // 删除图书信息之后重新渲染数据列表
                if (data.flag == '1') {
                    initList();
                }
            }
        });
    }

    // （修改）编辑图书信息
    function editBook(ISBN) {
        var form = $('#addBookForm');
        // 根据得到的id查询相关图书信息，再来提交表单
        $.ajax({
            type: 'get',
            url: '/books/book/' + ISBN,
            dataType: 'json', // 响应的内容
            success: function (data) {
                // console.log(data);//  打印当前id对象的内容
                // 初始化弹窗
                /* var mark = new MarkBox(600, 400, '编辑图书', form.get(0));
                mark.init(); */
                // 填充表单数据
                form.find('input[name=ISBN]').val(data.ISBN);
                form.find('input[name=bookName]').val(data.bookName);
                form.find('input[name=bookAuthor]').val(data.bookAuthor);
                form.find('input[name=sortId]').val(data.sortId);
                form.find('input[name=bookMain]').val(data.bookMain);
                form.find('input[name=bookPrice]').val(data.bookPrice);
                form.find('input[name=bookState]').val(data.bookState);
                form.find('input[name=pubishDate]').val(data.pubishDate);
                form.find('input[name=addDate]').val(data.addDate);
                //页面层
                layer.open({
                    type: 1,
                    title: "修改信息",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '500px'], //宽高
                    content: form,
                    success: function (layero) {
                        var mask = $(".layui-layer-shade");
                        mask.appendTo(layero.parent());
                        //其中：layero是弹层的DOM对象
                        // 对表单提交按钮重新绑定单击事件
                        form.find('input[type=button]').unbind('click').click(function (e) {
                            console.log(e.currentTarget);
                            console.log('請求12');
                            // 编辑完成数据之后重新提交表单
                            $.ajax({
                                type: 'put',
                                url: '/books/book',
                                data: form.serialize(),
                                dataType: 'json',
                                success: function (data) {
                                    if (data.flag == 1) {
                                        //console.log(1);
                                        // 关闭弹窗                                        
                                        layer.closeAll();
                                        // 重新渲染数据列表
                                        initList();
                                    }
                                }
                            })
                        })
                    }
                })
            }
        })
    }


    // 添加图书信息（不需要跳转页面，使用弹窗）
    function addBook() {
        // 要解绑在绑定
        $('#addBookId').off("click").on("click", function (e) {
            console.log(e.currentTarget);
            console.log('请求添加');
            var form = $('#addBookForm');
            // 实例化弹窗对象
            /* var mark = new MarkBox(600, 400, '添加图书', form.get(0));
            mark.init(); */
            //页面层
            layer.open({
                type: 1,
                title: "添加图书",
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '500px'], //宽高
                content: form,
                success: function (layero) {
                    var mask = $(".layui-layer-shade");
                    mask.appendTo(layero.parent());
                    //其中：layero是弹层的DOM对象
                    form.find('input[type=button]').unbind("click").click(function (e) {
                        console.log(e.currentTarget);
                        console.log('添加成功');
                        $.ajax({
                            type: 'post',
                            url: '/books/book',
                            data: form.serialize(), // 表单的所有数据
                            dataType: 'json', // 返回的数据类型
                            success: function (data) {
                                // 因为获得的data是标志位
                                if (data.flag == 1) {
                                    // 关闭弹窗                                        
                                    layer.closeAll();
                                    // 重新渲染数据列表
                                    initList();
                                }
                            }
                        })
                    })
                }
            })
        })
    }

})