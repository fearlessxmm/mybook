$(function () {
    function initList() {
        $.ajax({
            type: 'get',
            url: '/managers',
            dataType: 'json',
            success: function (data) {
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
                    var td = $(element).find('td:eq(5)');
                    // 当前路径下的id
                    var managerId = $(element).find('td:eq(0)').text(); // 也就是表格第一列的编号
                    // 找td里的a标签
                    // 绑定编辑图书的单击事件
                    td.find('button:eq(0)').click(function () {
                        //console.log(1);
                        editManager(managerId);
                    })
                    // 绑定删除图书的单击事件
                    td.find('button:eq(1)').click(function () {
                        //console.log(2);
                        deleteManager(managerId);
                    })

                    // 绑定添加图书信息的单击事件
                    addManager();
                    // 重置表单
                    var form = $('#addManagerForm');
                    form[0].reset();
                    form.find('input[type=hidden]').val(''); // 隐藏域重置，因为reset对隐藏域不起作用
                })
            }
        })
    }
    initList();

    // 删除管理员信息
    function deleteManager(managerId) {
        $.ajax({
            type: 'delete',
            url: '/managers/manager/' + managerId,
            dataType: 'json',
            success: function (data) {
                // 删除管理员信息之后重新渲染数据列表
                if (data.flag == '1') {
                    initList();
                }
            }
        });
    }

    // （修改）编辑管理员信息
    function editManager(managerId) {
        var form = $('#addManagerForm');
        // 根据得到的id查询相关图书信息，再来提交表单
        $.ajax({
            type: 'get',
            url: '/managers/manager/' + managerId,
            dataType: 'json', // 响应的内容
            success: function (data) {
                // console.log(data);//  打印当前id对象的内容
                // 初始化弹窗
                /* var mark = new MarkBox(600, 400, '编辑图书', form.get(0));
                mark.init(); */
                // 填充表单数据
                form.find('input[name=managerId]').val(data.managerId);
                form.find('input[name=managerName]').val(data.managerName);
                form.find('input[name=managerPassword]').val(data.managerPassword);
                form.find('input[name=managerSex]').val(data.managerSex);
                form.find('input[name=managerTel]').val(data.managerTel);
                //页面层
                layer.open({
                    type: 1,
                    title: "修改信息",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '380px'], //宽高
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
                                url: '/managers/manager',
                                data: form.serialize(),
                                dataType: 'json',
                                success: function (data) {
                                    if (data.flag == 1) {
                                        // 关闭弹窗                                        
                                        layer.closeAll();
                                        // 重新渲染页面
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

    // 添加
    function addManager() {
        $('#addManagerId').off("click").on("click", function (e) {
            console.log(e.currentTarget);
            console.log('请求添加');
            var form = $('#addManagerForm');
            // 实例化弹窗对象
            /* var mark = new MarkBox(600, 400, '添加管理员', form.get(0));
            mark.init(); */
            //页面层
            layer.open({
                type: 1,
                title: "添加信息",
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '380px'], //宽高
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
                            url: '/managers/manager',
                            data: form.serialize(), // 表单的所有数据
                            dataType: 'json', // 返回的数据类型
                            success: function (data) {
                                console.log(data);
                                // 因为获得的data是标志位
                                if (data.flag == 1) {
                                    // 关闭弹窗                                        
                                    layer.closeAll();
                                    // 重新渲染页面
                                    initList();
                                } else if (data.flag == 3) {
                                    form.find('b').css('display', 'block');
                                }
                            }
                        })
                    })
                }
            })
        })
    }

})