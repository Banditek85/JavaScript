const list = [
    { id: 1, name: "Apples" },
    { id: 2, name: "Onions" },
    { id: 3, name: "Carrots" },
    { id: 4, name: "Plums" }
];

Array.prototype.swap = function (x, y) {
    const temp = this[x];
    this[x] = this[y];
    this[y] = temp;
}

function render_list(p_list) {
    let my_list = document.querySelector("#my_list");

    my_list.innerHTML = p_list.map((el) => {
        return `<li class="draggable dropzone" draggable="true" id=${el.id}><p>${el.name}</p></li>`
    }).join("");
};

function animate_swap(dragged_id, dropzone_id) {
    const dragged = document.getElementById(dragged_id);
    const dropzone = document.getElementById(dropzone_id);

    const dragged_box = dragged.getBoundingClientRect();
    const dropzone_box =  dropzone.getBoundingClientRect();

    const dragged_travelY = -(dragged_box.top - dropzone_box.top);
    const dropzone_travelY = -(dropzone_box.top - dragged_box.top);

    dragged.style.transform = "translateY(" + dragged_travelY + "px)";
    dropzone.style.transform = "translateY(" + dropzone_travelY + "px)";
}

function onDragStart(e) {
    if (e.target.classList.contains("draggable")) {
        e.target.classList.add("dragged");
        e.dataTransfer.setData('text/id', e.target.id);
    }
}

function onDragEnd(e) {
    if (e.target.classList.contains("dragged")) {
        e.target.classList.remove("dragged");
    }
}

function onDragDrop(e) {
    e.preventDefault();
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.remove("drag_target");

        const dragged_id = parseInt(e.dataTransfer.getData("text/id"), 10);
        let index1 = list.findIndex(item => item.id == dragged_id);
        let index2 = list.findIndex(item => item.id == e.target.id);

        animate_swap(dragged_id, e.target.id);
        
        list.swap(index1, index2);

        setTimeout(function() {
            render_list(list);
        }, 510); 
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


// Setup
render_list(list);

my_list.addEventListener("dragstart", onDragStart); // on dragged element
my_list.addEventListener("drop", onDragDrop); // on dropped target
my_list.addEventListener("dragover", onDragOver); // on dropped target
my_list.addEventListener("dragenter", onDragEnter);
my_list.addEventListener("dragend", onDragEnd);
my_list.addEventListener("dragleave", onDragLeave);

const items = document.getElementsByClassName("draggable");
console.log(items);

for (const item of items) {
    item.addEventListener("click", function() {
        console.log("animation end");
    });
}