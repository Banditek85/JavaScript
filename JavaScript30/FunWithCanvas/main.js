const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// Variable to track if we are inside the canvas with mouse button pressed
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offSetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mouseup', () => { isDrawing = false });
canvas.addEventListener('mouseleave', () => { isDrawing = false });
canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!isDrawing) return
    else {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
        hue++;
    }
}
