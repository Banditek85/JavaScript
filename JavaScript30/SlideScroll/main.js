// Debounce function which will call the specific function only after a certain amount of miliseconds and not all the time. Useful with scrolling events and similar.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const images = document.getElementsByTagName('img');

window.addEventListener('scroll', debounce(checkSlide));

function checkSlide(event) {
    console.log('Y position is: ' + window.scrollY);
    for (const image of images) {
        // Window bottom Y position is window.scrollY (top of the window) + window.innerHeight (height of the viewport)
        const slideInAt = (window.scrollY + window.innerHeight) - image.height/2;
        console.log(slideInAt);

    }
}