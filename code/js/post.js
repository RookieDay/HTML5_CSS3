var xhr = new XMLHttpRequest;
xhr.open('post', 'post.php');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoued');
xhr.send('a=10');

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // xhr.responseText;

        // console.log(xhr.statusText);

        // console.log(xhr.getResponseHeader('Content-Type'));
        // console.log(xhr.getAllResponseHeaders());

        // document.write(xhr.responseText);
        // document.getElementById('result').innerHTML = xhr.responseText;

        // console.log(xhr.responseText);

        // document.getElementById('result').innerHTML = '<h1>ddd</h1>';
    }
}