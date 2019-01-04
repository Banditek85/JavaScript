const container = document.querySelector(".container");
let isDragging = false;
let initialX;
let initialScroll;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  initialX = e.pageX - container.offsetLeft;
  initialScroll = container.scrollLeft;
});

container.addEventListener('mouseup', (e) => {
  isDragging = false;
});

container.addEventListener('mouseLeave', (e) => {
  isDragging = false;
});

container.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.pageX - container.offsetLeft;
    const walk = x - initialX;
    container.scrollLeft = initialScroll - walk;
  }
});