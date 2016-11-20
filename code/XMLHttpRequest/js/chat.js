        var btn = document.querySecletor('.btn');
        var messages = document.querySelector('.messages');

        var input = document.querySelector(text);

        var items = '';

        var xhr = new XMLHttpRequest;
        btn.onclick = function() {
            items.createaMessage('self', input.value);
            console.log(items);
            messages.appendChild(items);

            xhr.open('get', 'chat.php');
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    items = createaMessage('other', xhr.responseText)
                    console.log(items);
                    messages.appendChild(items);
                }
            }
            input.value = '';
        }



        function createaMessage(flag, text) {
            var item = document.createElement('div'),
                h5 = document.createElement('h5'),
                p = document.createElement('p');
            // 添加类    
            item.classList.add(flag);

            switch (flag) {
                case 'self':
                    h5.innerText = 'I say';
                case 'other':
                    h5.innerText = 'You say';
                    break;
            }
            p.innerText = text;
            item.appendChild(h5);
            item.appendChild(p);
            return item;
        }