// Ways of creating objects in JavaScript
// Object instantiation
let obj = {
  name: "Simple",
  breed: "Plain"
};

// Using Object constructor creates an empty object
let obj2 = new Object();
obj2.name = "Coins";
console.log(obj2);

// factory function 
function createDog(name, breed, color) {
  return {
    name: name,
    breed: breed,
    color: color,
    speak: function(sound) {
      console.log(name + " says " + sound);
    }
  }
}

/* With factory functions every instance has it's own copy of speak function. Choosing between factory and constructor functions is based on the demands. 
 Factory functions hides API implementation from the caller. */
let fido = createDog("Fido", "Bulldog", "black");
console.log(fido);
fido.speak("IKE!");

// constructor function 
function Dog(name, breed, color) {
  this.name = name;
  this.breed = breed;
  this.color = color;
}

/* Because of JavaScript prototypal inheritance, functions declared on the prototype property (which is an object) of the constructor function are 
 stored in memory only once and are accesed by instance objects by reference (pointer). */
Dog.prototype.speak = function() {
  console.log(this.name + " says hello");
}

let fluffy = new Dog("Fluffy", "German sheppard", "brown");
console.log(fluffy);
console.log(fluffy.speak());

let eros = new Dog("Eros", "mixed", "light_brown");
console.log(eros.speak());

/* Object.create() - Creates an object with prototype property set to the object passed as parameter. Can be extended with second object 
parameter, which has objects as it's key values  */
let some_dog = Object.create(fluffy, {
  ability: {
    writable: true,
    configurable: true,
    value: "High jump"
  }
});
some_dog.name = "From Oject.create";
console.log(some_dog.speak());
console.log(some_dog.ability);