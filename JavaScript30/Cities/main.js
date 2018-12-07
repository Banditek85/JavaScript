let endpoint = 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json';
const cities = [];
const suggestions = document.getElementById("suggestions");

// Measure how long code is running
let t0 = performance.now();
console.log(t0);

// Fetch cities data with ajax call
fetch(endpoint).then(result => result.json()).then(data => {
    console.log(data)
    let t1 = performance.now();
    console.log(t1);
    console.log('Cities fetched in ' + ((t1 - t0) / 1000) + ' seconds.');
    let portion = data.slice(0, 500);
    cities.push(...portion);
});

let input = document.getElementById("search");

// Attach event listener to fire a function every time a user types a new character
input.addEventListener("keyup", displayResults);

// display filtered array with the input value
function displayResults() {
    // result is filtered array of cities
    const result = findMatches(this.value, cities);
    // map the array to html formatted string for display. Map function returns another array, so we run the "join" function at the end to join it into a string.
    const html = result.map(obj => {
        const city = new RegExp(this.value, 'gi');
        const highlight = obj.name.replace(city, `<span style="color: red">${this.value}</span>`);
        return `<li>${highlight}</li>`
    }).join("");
    suggestions.innerHTML = html;
    console.log(html);
}

// find matched values from the cities array
function findMatches(word, cities) {
    // set searched value as regular expression
    const regex = new RegExp(word, 'gi');
    // filter objects in cities array based on whether their name property (individual city) matches input value
    return cities.filter(obj => {
        return obj.name.match(regex);
    })
}