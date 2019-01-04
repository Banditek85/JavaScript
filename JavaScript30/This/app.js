// 'this refers to the execution context object that is running the function'. You have access to 'this' inside every function (besides 'args' iterator).
// In below example setTimeout is not running inside declared object demonstrate, but later, so 'this' inside there is refering to the global object.

const demonstrate = {
    name: "some name",
    legs: 4,
    speak: function() {
        setTimeout(function() {
            console.log(this);
        }, 2000);
    },
    this: function() {
        console.log(`This is: ${this}`);
    }
};

console.log("started...");
demonstrate.speak();
demonstrate.this();

// Multiple constructors - avoiding code duplication
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

function Motorcycle(make, model, year) {
    // using call
    Car.call(this, make, model, year);

    // ..or apply
    // Car.apply(this, [make, model, year]);

    // ..or arguments
    Car.apply(this, arguments);
    this.numWheels = 2;
}
