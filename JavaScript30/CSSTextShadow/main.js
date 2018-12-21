const hero = document.querySelector(".hero");
const h1 = hero.querySelector("h1");
hero.addEventListener("mousemove", report);

function report(event) {
    let width = event.offsetX;
    let height = event.offsetY;
    /* console.log(width);
    console.log(height); */

    h1.style.textShadow = event.offsetX + "px " + event.offsetY + "px 0 red";

    console.log(event.clientX);
    console.log(event.clientY);
}
