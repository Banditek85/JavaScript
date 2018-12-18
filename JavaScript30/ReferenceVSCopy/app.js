// With strings, numbers and booleans value is copied.
let age = 100;
let age2 = age;
console.log(age, age2);

// Has no effect on age2 variable, since that one has it's own copy of the value
age = 200;
console.log(age, age2);

// ARRAYS are passed by REFERENCE
const players = ['Wes', 'Sarah', 'Ryan', 'Poopy'];

// We want to make a copy of the array
const team = players;
console.log(players);
console.log(team);

// This does not work
team[2] = 'Zlatan';

// Creating a proper copy
const team2 = team.slice();
// or
const team3 = [].concat(team2);
// or ES6 spread way
const team4 = [...players];
// or
const team5 = Array.from(players);


// OBJECTS
const person = {
    name: 'Wes Bos',
    age: 80
};

// Object also passed by REFERENCE
const captain = person;
captain.number = 5;

console.log(person);
console.log(captain);

// Making a proper copy of the objects. Object.asign creates a shallow copy which means it will go only ONE LEVEL deep. Inner objects are still passed by reference.
const captain2 = Object.assign({}, person, {number: 99});
console.log(captain2);

const wes = {
    name: 'Wes',
    age: 100,
    social: {
        twitter: '@wesbos',
        facebook: '@facebook'
    }
}

const dev = Object.assign({}, wes);
console.log('Printing dev object: ');
console.log(dev);

// Workaround with JSON functions
const dev2 = JSON.parse(JSON.stringify(dev));
console.log(dev2);