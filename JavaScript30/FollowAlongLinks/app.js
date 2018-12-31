const spany = document.createElement("span");
document.querySelector("body").append(spany);
spany.classList.add("highlighted");

const links = document.querySelectorAll("a");
const coords = {
    x: "",
    y: "",
    width: 0,
    height: 0
};

links.forEach(function(link) {
link.addEventListener("mouseenter", paint)
});

function paint() {
    const position = this.getBoundingClientRect();
    coords.x = position.x;
    coords.y = position.y;
    coords.width = position.width;
    coords.height = position.height;
    spany.style.width = Math.floor(coords.width) + "px";
    spany.style.height = Math.floor(coords.height) + "px";

    // We need to adjust current scrolled offset of Y axis, because getBoundingClientRect function returns coordinates based on current viewport, not the entire page.
    const offsetTop = window.scrollY;

     // Transform property has benefits for animations:
    spany.style.transform = `translate(${coords.x}px, ${offsetTop + coords.y}px)`;

}