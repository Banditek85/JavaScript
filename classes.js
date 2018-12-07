// Class declaration
class Person {
    constructor(name, year_born) {
        this.name = name;
        this.year_born = year_born;
    }

    // static methods are called without instantiating a class
    static arms() {
        return 2;
    }

    what() {
        console.log(this.name + ' is a Person.')
    }

    // getter decorator
    get age() {
        return this.calcAge();
    }

    calcAge() {
        return new Date().getFullYear - this.year_born;
    }
}

let human = new Person('John Doe', 1985);
console.log(human.name + ' was born in ' + human.year_born);
console.log('Person has ' + Person.arms() + ' arms.');
console.log(human.what());


// Inheritance
class Juggler extends Person {
    constructor(name, year_born, speak) {
        // Calling constructor of a parent class
        super(name, year_born);
        this.speak = speak;
    }

    what() {
        console.log(this.name + ' is a juggler.');
    }

    ParentWhat() {
        super.what();
    }
}