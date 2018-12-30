(function app() {
    // dom refs
    const form = document.getElementById("td_form");
    const ul = form.querySelector("ul");
    const input = document.querySelector("input[type='text']");
    const storage = window.localStorage;

    // variables
    let list_arr;

    // event listeners
    form.addEventListener("submit", submit);
    ul.addEventListener("click", toggleChecked);

    // functions
    function submit(e) {
        e.preventDefault();
        insert(input.value);
        arrayDisplay(list_arr);
        this.reset(); 
    }

    // Runs data integration check and inserts new values in the array and localStorage
    function insert(value) {
        if (!value) {
            alert("Can't insert empty value!");
            return;
        }

        else if (checkForDuplicates(value, list_arr)) {
            alert('Can\'t insert duplicates!');
            return;
        }

        let item = {
            value: value,
            done: false
        }

        // Push newly created object into the array and also update localStorage with entire array
        list_arr.push(item);
        storage.setItem('stored', JSON.stringify(list_arr));
    }

    // Reads the content of array and displays it in the ul element
    function arrayDisplay(arr) {
        ul.innerHTML = '';
        arr.forEach(function(value, index) {
            // Set checked attribute to checkbox element, if array item's done property is set to true
            ul.innerHTML += `<li><input type='checkbox' data-index=${index} ${value.done ? 'checked' : ''}> <b>${value.value}</b></li>`;
        });
    }

    // Checks if input value is already present in the array
    function checkForDuplicates(value, arr) {
        for (const item of arr) {
            if (item.value === value) {
                return true;
            }
        }
    }

    // Changes the done property of item in the array and updates localStorage
    function toggleChecked(e) {
        if (e.target.type === 'checkbox') {
            let index = e.target.dataset.index;
            list_arr[index].done = !list_arr[index].done;
            storage.setItem('stored', JSON.stringify(list_arr));
        }
    }

      // runtime
      // Get items from storage and display them (or set list_arr to empty array if there are no items in storage);
      list_arr = JSON.parse(storage.getItem('stored')) || [];
      arrayDisplay(list_arr);
      console.log(list_arr);
})();