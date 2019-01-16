$(function(){
    $.ajax({
        type: 'get',
        url: '/books',
        dataType: 'json',
        success: function (data) {
            console.log(111111);
            // 拿到数据之后渲染模板
            var html = template('indexTpl',{list:data});
            // 填充数据给表格
            $("#dataList").html(html);
        }
    })
})