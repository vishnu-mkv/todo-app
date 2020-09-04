let list = document.querySelector('#list');
let editor = document.querySelector('#editor');
let editWindow = document.querySelector('.edit-window');
let wrapper = document.querySelector('#wrapper');

let editON = false;
let onEditLI = null;

document.querySelector('#add').addEventListener('click', function(event) {

    let value = editor.value;
    editor.value = '';

    if (editON || value === '') return;

    let li = document.createElement('li');
    li.innerHTML = "<div class=\"text\">\n" +
        "                    </div>\n" +
        "                    <div class=\"buttons\">\n" +
        "                        <button class=\"edit\">Edit</button>\n" +
        "                        <button class=\"delete\">Delete</button>\n" +
        "                    </div>"
    let p = document.createElement('p');
    p.innerText = value;
    li.querySelector('.text').appendChild(p);
    list.insertBefore(li, list.firstElementChild);

    let alert = list.parentElement.querySelector('.alert');
    if (alert) {
        list.parentElement.removeChild(alert);
    }
});

let deleteItem = function(li) {
    list.removeChild(li);
    if (!list.firstElementChild) {
        let alert = document.createElement('p');
        alert.className = 'alert';
        alert.innerText = "Nothing to show!";
        list.parentElement.appendChild(alert);
    }
}

list.addEventListener('click', function (event) {

    let target = event.target;
    if (target.className === "delete") {
        if (editON) return;
        deleteItem(event.target.parentElement.parentElement);
    }
    if (target.className === "edit") {
        if (editON) return;

        wrapper.style.opacity = 0.5;
        editWindow.style.display = 'block';
        editON = true;
        editor.disabled = true;
        onEditLI = event.target.parentElement.parentElement;
        editWindow.firstElementChild.value = onEditLI.firstElementChild.firstElementChild.textContent;
    }
});

let returnToNormal = function(){
    editON = false;
    onEditLI = null;
    wrapper.style.opacity = 1;
    editWindow.firstElementChild.value = '';
    editWindow.style.display = 'none';
    editor.disabled = false;
}

editWindow.addEventListener('click', function (event) {

    if (event.target.className === "cancel") {
       returnToNormal();
    }

    if (event.target.className === "save"){
        let value = editWindow.firstElementChild.value;
        if (value === '') deleteItem(onEditLI);
        else {
            onEditLI.firstElementChild.firstElementChild.textContent = value;
        }
        returnToNormal();
    }
});