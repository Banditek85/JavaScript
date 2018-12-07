const canvas = document.getElementById("canvas");

canvas.addEventListener("mousemove", emit);

function emit(event) {
    console.log("X position of mouse is: " + event.clientX);
}