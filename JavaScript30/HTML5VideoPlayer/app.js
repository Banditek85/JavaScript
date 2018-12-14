const time = document.querySelector("#time");
const video = document.getElementById("video");
const start_btn = document.getElementById("play");
const ranges = document.querySelectorAll("input[type='range']");

function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
}

function updatePlayBtn() {
    start_btn.textContent = video.paused ? '>>' : "||";
}

function updateTime() {
    time.textContent =  video.currentTime.toFixed(1);
}


// Event listeners
start_btn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("pause", updatePlayBtn);
video.addEventListener("play", updatePlayBtn);
video.addEventListener("timeupdate", updateTime)
ranges.forEach(range => range.addEventListener("change", function() {
    console.log("Value is " + this.value + ", Name is: " + this.name);
}));