$(function(){
     // 借阅信息
     $.ajax({
        type: 'get',
        url: '/borrows/borrow',
        dataType: 'json', // 返回的数据类型
        success: function (data) {
            // 拿到数据之后渲染模板
            var html = template('indexTpl', {
                list: data
            });
            // 填充数据给表格
            $("#dataList").html(html);
        }
    })
})