$(function () {
    function initList() {
        $.ajax({
            type: 'get',
            url: '/booksorts',
            dataType: 'json',
            success: function (data) {
                // 拿到数据之后渲染模板
                var html = template('indexTpl', {
                    list: data
                });
                // 填充数据给表格
                $("#dataList").html(html);
                // 必须在渲染完成之后才能操作列表里的标签(修改删除的按钮操作)
                $("#dataList").find('tr').each(function (index, element) {
                    var td = $(element).find('td:eq(2)');
                    var id = $(element).find('td:eq(0)').text();
                    // 绑定编辑图书的单击事件
                    td.find('a:eq(0)').click(function () {
                        console.log("点击了操作按钮");
                    })
                    // 绑定返回图书信息的单击事件
                    backBook();
                    // 重置表单
                    var form = $('#addSortForm');
                    form.get(0).reset();
                    form.find('input[type=hidden]').val(''); // 隐藏域重置，因为reset对隐藏域不起作用
                })
            }
        })
    }
    initList();
    // 添加图书类别
    function backBook() {
        // 要解绑在绑定
        $('#addSortId').off("click").on("click", function (e) {
            console.log(e.currentTarget);
            console.log('请求');
        })
    }
})