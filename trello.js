function allowDrop(event) {
    event.preventDefault(); 
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add('dragging'); 
}

function drop(event) {
    event.preventDefault(); 
    var data = event.dataTransfer.getData("text/plain"); 
    var draggedElement = document.getElementById(data); 
    var dropZone = event.target;

    if (dropZone.classList.contains('lists') || dropZone.closest('.lists')) {
        dropZone = dropZone.closest('.lists'); 
        dropZone.appendChild(draggedElement); 
        draggedElement.classList.remove('dragging'); 
    }
}

function addTodo(listId) {
    var input = document.querySelector(`#${listId} ~ .input-container .inp`);
    var list = document.getElementById(listId);

    if (input.value.trim() !== "") {
        var li = document.createElement('li');
        li.id = `item-${Date.now()}`; // Unique ID for drag-and-drop
        li.draggable = true;
        li.classList.add('todo-item');
        li.innerHTML = `<input type="text" value="${input.value}" disabled>
                        <div class="icons">
                            <i class="fas fa-edit" onclick="updt(event)"></i>
                            <i class="fas fa-trash" onclick="delt(event)"></i>
                        </div>`;
        li.ondragstart = drag; // Attach drag event
        list.appendChild(li);
        input.value = "";
    }
}

function clickTodo(event) {
    if (event.keyCode === 13) {
        addTodo(event.target.closest('.col').querySelector('ul.lists').id);
    }
}

function delt(event) {
    event.target.closest('li').remove();
}

function updt(event) {
    var input = event.target.closest('li').querySelector('input[type="text"]');
    input.disabled = false;
    input.focus();
    input.onblur = function () {
        input.disabled = true;
    };
}

function deleteAll(listId) {
    var list = document.getElementById(listId);
    if (list.children.length === 0) {
        swal("Aapke paas delete karne ke liye kuch nahi hai!");
    } else {
        swal({
            title: "Kya aap sab delete karna chahenge?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
        }).then((willDelete) => {
            if (willDelete) {
                list.innerHTML = '';
                swal("Sab items delete kar diye gaye hain!", {
                    icon: "success",
                    buttons: "OK"
                });
            } else {
                swal("Deletion cancel kar diya gaya!");
            }
        });
    }
}

document.querySelectorAll('.inp').forEach(input => {
    input.addEventListener('keyup', clickTodo);
});
