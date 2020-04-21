var people = (function () {

    var nameInput;
    var addNameButton;
    var renderedListNames;
    var crossDeleter;
    var listField = document.getElementsByClassName('listField')[0];
    var oldList = document.getElementsByClassName('list');
    var listNames = ['Vasyl', 'Ivan', 'Petro', 'Oleksandr', 'Andriy', 'Bohdan'];


    function init() {
        render();
        cacheDom();
        bindEvent();

    };

    function cacheDom() {
        nameInput = document.getElementById('nameInput');
        addNameButton = document.getElementById('addNameButton');
        crossDeleter = document.getElementsByClassName('crossDeleter')
    };

    function bindEvent() {
        addNameButton.addEventListener('click', addPersonName);
        for (var i = 0; i < crossDeleter.length; i++) {
            crossDeleter[i].addEventListener('click', delPersonName);
        }
        console.log('start')

    };

    function render() {
        if (oldList.length > 0) {
            oldList[0].remove()

        }
        renderedListNames = document.createElement('ul');
        renderedListNames.className = 'list';
        var listLength = listNames.length;
        if (listLength > 0) {


            listNames.map((value) => {
                var listItem = document.createElement('li');
                crossDeleter = document.createElement('span');
                crossDeleter.setAttribute('class', 'crossDeleter');
                var listValue = document.createTextNode(value);
                listItem.appendChild(listValue);
                listItem.appendChild(crossDeleter);
                renderedListNames.appendChild(listItem);


            });

            listField.appendChild(renderedListNames);
        } else {
            var message = document.createElement('p');
            message.className = 'errorMessage';
            message.textContent = 'No Data To SHOW'
            listField.appendChild(message);
        }
        cacheDom();
        bindEvent();
    }

    function addPersonName() {

        var name = nameInput.value;
        if (name) {
            var error = document.getElementsByClassName('errorMessage');
            if (error.length > 0) {
                error[0].remove();
            }
            listNames.push(name);
            nameInput.value = '';
            render();
        }

    }

    function delPersonName(event) {
        var target = event.target;
        var stringItem = target.parentElement.textContent;
        listNames.splice(listNames.indexOf(stringItem), 1);
        render();
    }
    return {
        init: init
    }

})();
people.init();