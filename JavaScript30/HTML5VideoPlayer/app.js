const time = document.querySelector("#time");
const video = document.getElementById("video");
const start_btn = document.getElementById("play");
const ranges = document.querySelectorAll("input[type='range']");
const progress_f = document.querySelector(".progress-filled");

function togglePlay() {
    if (video.paused) video.play();
    else video.pause();
}

function updatePlayBtn() {
    start_btn.textContent = video.paused ? '>>' : "||";
}

function updateTime() {
    time.textContent = `${video.currentTime.toFixed(1)} / ${video.duration.toFixed(2)}`;
    let location = (video.currentTime.toFixed(0) * 100) / 117;
    progress_f.style.width = `${location}%`;
}

function updateRange() {
    // Since this is event handler function, 'this' refers to the specific input, that was interacted with.
    let name = this.name;
    video[name] = this.value;
}

// Event listeners
start_btn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("pause", updatePlayBtn);
video.addEventListener("play", updatePlayBtn);
video.addEventListener("timeupdate", updateTime)
// Attach event listeners to both range inputs at once
ranges.forEach(range => range.addEventListener("change", updateRange));