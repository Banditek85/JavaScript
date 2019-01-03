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
