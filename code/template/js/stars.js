var btn = document.querySelector('.btn');
btn.onclick = function() {
    var xhr = new XMLHttpRequest;
    xhr.open('get', 'stars.php');
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var info = {
                dat: data
            }

            var html = template('tpl', info);
            console.log(html);
            document.querySelector('table').innerHTML = html;
        }
    }
}