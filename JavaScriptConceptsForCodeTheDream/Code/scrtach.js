function doSomething(){}
console.log( doSomething.prototype );
// It does not matter how you declare the function, a
//  function in javascript will always have a default
//  prototype property.
var doSomething = function(){}; 
console.log( doSomething.prototype );