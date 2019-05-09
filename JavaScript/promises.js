// Promise is an object representing eventual completion or failure of asynchronous operation.
// Promise constuctor receives a callback function with two parameters - resolve and reject, which are 
// also callbacks. When a promise is being consumed (with .then and .catch), values passed to resolve and reject are mapped to 
// callback parameters of .then and .catch callbacks.

let result = new Promise(function(resolve, reject) {
  setTimeout(function() {
    if (1 === 3) {
      resolve('some value');
    } else {
      reject('ERROR');
    }
  }, 2000);
});

result.then(msg => {console.log(msg)}).catch(msg => {console.log(msg)});