var xhr = new XMLHttpRequest;
xhr.open('get', '01.php');
xhr.send(null);

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var result = xhr.responseXML;
        // console.log(result);
        var items = document.getElementsByTagName('item');

        for (var i = 0; i < items.length; i++) {
            var name = items[i].getElementsByTagName('name')[0]
                .firstChild.nodeValue;
            // var s = items[i].getElementsByTagName('name');
            // console.log(s);
            console.log(name);
        }
    }
}