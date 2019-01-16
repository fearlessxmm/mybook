$(function () {

    function initList() {
        $.ajax({
            type: 'get',
            url: '/student',
            dataType: 'json',
            success: function (data1) {
                console.log('我是第一层data：' + data1);
                console.log(typeof (data1));
                console.log(data1);
                $.ajax({
                    type: 'get',
                    url: '/student/' + data1,
                    dataType: 'json',
                    success: function (data) {
                        console.log('我是第二层data：' + data); // 这里的data要的是数组而不是对象
                        // 拿到数据之后渲染模板
                        var html = template('indexTpl', {
                            list: data.result
                        });
                        // 填充数据给表格
                        $("#dataList").html(html);
                        var studentId = data.result[0].studentId;
                        console.log("studentId:" + studentId);
                        // 必须在渲染完成之后才能操作列表里的标签(修改删除的按钮操作)
                        $("#dataList").find('tr').each(function (index, element) {
                            var td = $(element).find('td:eq(4)');
                            // 绑定编辑图书的单击事件
                            td.find('button:eq(0)').click(function (e) {
                                console.log(e.currentTarget);
                                console.log('請求1');
                                editStudent(studentId);
                            })
                            // 重置表单
                            var form = $('#addStudentForm');
                            form.get(0).reset();
                            form.find('input[type=hidden]').val(''); // 隐藏域重置，因为reset对隐藏域不起作用
                        })
                    }
                })
            }
        })

    }
    initList();


    // （修改）编辑图书信息
    function editStudent(studentId) {
        var form = $('#addStudentForm');
        // 根据得到的id查询相关图书信息，再来提交表单
        $.ajax({
            type: 'get',
            url: '/students/student/' + studentId,
            dataType: 'json', // 响应的内容
            success: function (data) {
                // 填充表单数据
                form.find('input[name=studentId]').val(data.studentId);
                form.find('input[name=studentName]').val(data.studentName);
                form.find('input[name=studentSex]').val(data.studentSex);
                form.find('input[name=studentPassword]').val(data.studentPassword);
                //页面层
                layer.open({
                    type: 1,
                    title: "修改信息",
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '300px'], //宽高
                    content: form,
                    success: function (layero) {
                        var mask = $(".layui-layer-shade");
                        mask.appendTo(layero.parent());
                        //其中：layero是弹层的DOM对象
                        // 对表单提交按钮重新绑定单击事件
                        form.find('input[type=button]').unbind('click').click(function (e) {
                            // 编辑完成数据之后重新提交表单
                            $.ajax({
                                type: 'put',
                                url: '/students/mystudent',
                                data: form.serialize(),
                                dataType: 'json',
                                success: function (data) {
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
            }
        })
    }

})