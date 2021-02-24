class todo {
    constructor(content, isDone) {
        this.content = content;
        this.isDone = isDone;
    }
}

let toDos = [];


window.onload = function () {
    let toDo = new todo("Buy presents", false);
    let toDo2 = new todo("Clean kitchen", false);

    toDos.push(toDo);
    toDos.push(toDo2);

    let showDoneCheckbox = document.getElementById("showDoneCheckbox");
    showDoneCheckbox.addEventListener("change", onShowDoneCheckboxClick);

    generateList(); 
};

function addToDo() {
    let newContent = document.getElementById("content").value;

    let toDoNew = new todo(newContent, false);

    toDos.push(toDoNew);

    addItemToList(toDoNew);
}

function generateList() {
    let restBox = document.getElementById("restBox");
    let showDoneCheckbox = document.getElementById("showDoneCheckbox");
    restBox.innerHTML = "";

    for (let i = 0; i < toDos.length; i++) {
        let toDoItem = toDos[i];
        if (!toDoItem.isDone || showDoneCheckbox.checked) {
            createDOMItemAndAddToList(toDoItem, restBox)
        }
    }
}

function addItemToList(toDoItem) {
    let restBox = document.getElementById("restBox");
    createDOMItemAndAddToList(toDoItem, restBox)
}


function onShowDoneCheckboxClick() {
    if (this.checked) {
        let restBox = document.getElementById("restBox");

        for (let i = 0; i < toDos.length; i++) {
            let toDoItem = toDos[i];

            if (toDoItem.isDone) {
                createDOMItemAndAddToList(toDoItem, restBox)
            }
        }

    } else {
        for (let i = 0; i < toDos.length; i++) {
            if (toDos[i].isDone) {
                let liContent = toDos[i].content;
                let liItem = document.getElementById(liContent);
                liItem.remove();
            }
        }
    }
}

function createItemEventListener(checkbox, toDoItemId) {

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            let liItem = document.getElementById(toDoItemId);
            let showDoneCheckbox = document.getElementById("showDoneCheckbox");

            if (showDoneCheckbox.checked) {
                checkbox.checked = true;
            } else {
                liItem.remove();
            }

            console.log(liItem.id + " " + " done");

            for (let i = 0; i < toDos.length; i++) {
                if (toDos[i].content === liItem.id) {
                    toDos[i].isDone = true;
                    console.log(toDos); 
                }
            }
        }

        else {
            for (let i = 0; i < toDos.length; i++) {
                let liItem = document.getElementById(toDoItemId);
                if (toDos[i].content === liItem.id) {
                    toDos[i].isDone = false;
                    console.log(toDos); 
                }
            }

        }


    });

}



function createDOMItemAndAddToList(toDoItem, restBox) {
    let toDoItemId = toDoItem.content;

    let checkbox = document.createElement("input");

    checkbox.setAttribute("type", "checkbox");

    if (toDoItem.isDone) {
        checkbox.checked = true;
    }

    let label = document.createElement("label");
    label.innerHTML = toDoItemId;

    let itemDiv = document.createElement("li");
    itemDiv.setAttribute("id", toDoItemId);

    createItemEventListener(checkbox, toDoItemId);


    itemDiv.appendChild(label);
    itemDiv.appendChild(checkbox);

    restBox.appendChild(itemDiv);

}



