const people = [
    {name: 'Keith', year_born: 1985},
    {name: 'Jason', year_born: 1983},
    {name: 'Tina', year_born: 1995},
    {name: 'Sharon', year_born: 2001},
    {name: 'Matt', year_born: 1994}
];

const comments = [
    {text: 'Love this!', id: 543233},
    {text: 'Super good!', id: 643221},
    {text: 'OMG!', id: 243287},
    {text: 'Nothing special!', id: 343256},
    {text: 'You are stupid', id: 534322},
    {text: 'I love turtles', id: 532164}
];

// Some and every check on arrays
// Array.prototype.some() - Returns true if at least one element in the array meets the condition
let isAdult = people.some(person => person.year_born > 2006);
console.log({isAdult});

// Array.prototype.every() - Returns true if every element in the array meets the condition
let areOlder = people.every(person => person.year_born > 1985);
console.log(areOlder);

// Array.prototype.find() - Returns first item in the array that meets the condition. It returns undefined if no elements meet the condition.
let young = people.find(person => person.name == 'Sharon');
console.log({young});

// Array.prototype.findIndex() - Returns index of the first element that meets the condition. Useful for deleting the elements, since you need a index for that. Returns -1 if no element meets the condition.
let index = people.findIndex(person => person.name == 'Keith');
console.log(index);

// Deleting element from an array
// Splice modifies the existing array (and returns the removed items). Can also be used for adding elements into the array.
people.splice(index, 1);
console.log(people);

// Slice does not modify the existing array but returns a copy of selected elements from start index (inclusive) to the end (exclusive).
// Interesting way to create new array with spread operators and slice
const newPeople = [
    ...people.slice(0, index),
    ...people.slice(index + 1)
]

console.log(newPeople);