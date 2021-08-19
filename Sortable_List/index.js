function renderList(p_list) {
    return p_list.map((el) => {
        return `<li class="draggable dropzone" draggable="true" data-id = ${el.id}><p>${el.name}</p></li>`
    }).join("")
};

const list = [{ name: "Apples" },
{ name: "Onions" },
{ name: "Carrots" },
{ name: "Plums" }];

list.forEach((obj, i) => {
    obj.id = i;
})

const my_list = document.querySelector("#my_list");
my_list.innerHTML = renderList(list);

my_list.addEventListener("dragstart", onDragStart); // on dragged element

my_list.addEventListener("drop", onDragDrop); // on dropped target

my_list.addEventListener("dragover", onDragOver); // on dropped target

my_list.addEventListener("dragenter", onDragEnter);

my_list.addEventListener("dragend", onDragEnd);

my_list.addEventListener("dragleave", onDragLeave);

function onDragStart(e) {
    if (e.target.classList.contains("draggable")) {
        e.target.classList.add("dragged");
        e.dataTransfer.setData('text/plain', e.target.id);
    }
}

function onDragEnd(e) {
    if (e.target.classList.contains("dragged")) {
        e.target.classList.remove("dragged");

        console.log("Dragged element " + e.target.dataset.id)
    }
}

function onDragDrop(e) {
    e.preventDefault();
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.remove("drag_target");

        console.log("Dropped on element " + e.target.dataset.id)
    }
}

function onDragLeave(e) {
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.remove("drag_target");
    }
}

// Both dragenter and dragover default events must be canceled in order to allow dropping on custom targets
function onDragEnter(e) {
    e.preventDefault();

    if (e.target.classList.contains("dropzone")) {
        e.target.classList.add("drag_target");
    }
}

function onDragOver(e) {
    e.preventDefault();
}