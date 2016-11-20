 var btn = document.querySelector('.btn');
 var xhr = new XMLHttpRequest;


 btn.onclick = function() {
     xhr.open('get', 'stars.php');

     xhr.send(null);

     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             // 转成一个JS能认识的对象
             var data = JSON.parse(xhr.responseText);

             console.log(data);

             var html = '';
             for (var i = 0; i < data.length; i++) {
                 html += '<tr>';
                 html += '<td>' + data[i].name + '</td>';
                 html += '<td>' + data[i].age + '</td>';
                 html += '<td>' + data[i].sex + '</td>';
                 html += '<td>' + data[i].ablum + '</td>';

                 html += '</tr>';

             }

             document.querySelector('table').innerHTML = html;
         }
     }
 }