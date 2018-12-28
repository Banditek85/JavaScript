const navbar = document.querySelector(".navbar");
const navbarTop = navbar.offsetTop;
const body = document.querySelector("body");

window.addEventListener("scroll", checkPosition);

function checkPosition(e) {
    if (window.scrollY > navbarTop) {
    body.style.paddingTop = navbar.offsetHeight + "px";   
    body.classList.add("under");
    } else {
        body.style.paddingTop = 0;  
        body.classList.remove("under");
    }
}