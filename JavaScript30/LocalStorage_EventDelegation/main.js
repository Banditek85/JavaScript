const newTapas = document.getElementById("add_form");
const displayed_tapas = document.getElementById("displayed_tapas");
const div = document.querySelector(".tapas");
const stored_tapas = [];
const storage = window.localStorage;

newTapas.addEventListener("submit", submit);
div.addEventListener("click", boxChecked);

function submit(event) {
    event.preventDefault();
    // 'this' is a form itself, since we are inside handler event function.
    let newTapa = this.elements["tapa"].value;

    // input field must have some value
    if (!newTapa) alert("You can't enter empty tapa...");
    else {
        // tapa must not be already stored in an array
        if (!checkTapa(newTapa)) {
            let tapa = {
                value: newTapa,
                checked: false
            };

            stored_tapas.push(tapa);
            appendItem(newTapa);
            // resetting the inputs
            this.reset();
        }
    }
}

// Returns true if user tries to enter tapa that is already in an array
function checkTapa(value) {
    for (tapa of stored_tapas) {
        if (value === tapa.value) {
            alert("This tapa already stored!");
            return true;
        }
    }
    return false;
}

// Handler function for checkbox click which calls checkInArray function
function boxChecked(event) {
    if (event.target.type === "checkbox") {
        let parent = event.target.parentNode;
        checkInArray(parent.textContent);
        storeInLocalStorage();
    }
}

// Keep track of tapas and their status in an array
function checkInArray(value) {
    stored_tapas.forEach(tapa => {
        if (tapa.value === value) {
            tapa.checked = !tapa.checked;
        }
    });
}

function storeInLocalStorage() {
    for (tapa of stored_tapas) {
        storage.setItem(tapa.value, JSON.stringify(tapa));
        console.log(storage);
    }
}

// These tree lines below to display storage at page load. Also storage is saved on checkbox click, need to change that. Also button for delete all, check all.

function retrieveStorage() {
    let length = Object.keys(storage).length;
    console.log(`Currently ${length} items in storage.`);
}

function appendItem(value) {
    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" style="float: left;"><b>${value}</b>`;
    displayed_tapas.append(li);
}


retrieveStorage();
