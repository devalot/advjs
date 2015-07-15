var x = {color: "red"};
var f = function() {console.log(this.color);};

f.apply(x); // this.color === "red"

var args = [1, 2, 3];
f.apply(x, args); // `this' + arguments.
