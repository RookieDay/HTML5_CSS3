	var btn = document.querySelector('.btn');
	var xhr = new XMLHttpRequest;

	btn.onclick = function() {

	    xhr.open('post', 'stars.php');

	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	    xhr.send();

	    xhr.onreadystatechange = function() {
	        if (xhr.readyState == 4 && xhr.status == 200) {
	            // ?responseXML

	            console.log(xhr.responseXML);
	            // console.log(xhr.responseText);
	            // doucment
	            var doc = xhr.responseXML;

	            // 获取所有的items
	            var items = doc.getElementsByTagName('item');

	            var html = '';
	            // 循环获取每个items下的内容并生成html
	            for (var i = 0; i < items.length; i++) {
	                var name = items[i].getElementsByTagName('name')[0].firstChild.nodeValue;
	                var album = items[i].getElementsByTagName('album')[0].firstChild.nodeValue;
	                var age = items[i].getElementsByTagName('age')[0].firstChild.nodeValue;
	                var sex = items[i].getElementsByTagName('sex')[0].firstChild.nodeValue;

	                // 拼凑字符串
	                html += '<tr>';

	                html += '<td>' + name + '</td>';
	                html += '<td>' + album + '</td>';
	                html += '<td>' + age + '</td>';
	                html += '<td>' + sex + '</td>';

	                html += '</tr>';

	                // 追加
	                document.querySelector('table').innerHTML = html;

	            }
	        }
	    }
	}