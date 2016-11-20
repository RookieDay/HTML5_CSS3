var btn = document.querySelector('.btn');
btn.onclick = function() {
    $.ajax({
        url: 'stars.php',
        type: 'post',
        data: { name: "itcast", age: 10 },
        success: function(data) {
            console.log(data);
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html += '<td>' + data[i].name + '</td>';
                html += '<td>' + data[i].sex + '</td>';
                html += '<td>' + data[i].age + '</td>';
                html += '<td>' + data[i].ablum + '</td>';
                html += '</tr>';
            }
            document.querySelector('table').innerHTML = html;

        },
        error: function(err) {}
    });
}