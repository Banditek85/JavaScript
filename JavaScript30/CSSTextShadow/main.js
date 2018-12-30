const hero = document.querySelector(".hero");
const h1 = hero.querySelector("h1");
hero.addEventListener("mousemove", report);
const map = document.getElementById("map");

function report(event) {
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;
    const walk = 200;

    let x = event.offsetX;
    let y = event.offsetY;

    // this refers to hero div, event.target refers current parent of trigerring event. Since event.offsetX and event.offsetY will report offsets based on event parent element, we need to add parent offset to x and y variables when inside h1.
    if (this !== event.target) {
        x = x + event.target.offsetLeft;
        y = y + event.target.offsetTop;
    }

    const xWalk = (x / width * walk) - (walk / 2);
    const yWalk = (y / height * walk) - (walk / 2);

    h1.style.textShadow = `${xWalk}px 2px 3px black, 2px ${yWalk}px 3px black`;
}



const arr = ["first", "second", "third", "fourth", "fifth", "sixth"];

// Nice way to display the content of an array. You map it to a certain value, and join it to return a string, which you then set as a innerHtml of an certain element.
function displayArray(arr) {
    let content = arr.map((value)=>{
        return `<li>${value}</li>`
    }).join("");

    map.innerHTML = content;
}

displayArray(arr);

    // 
