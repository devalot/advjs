/******************************************************************************/
// <<: simple
var x = {color: "red"};
var f = function() {console.log(this.color);};

x.f = f;

var g = f.bind(x);
var h = f.bind(x, 1, 2, 3);

g(); // Same as x.f();
h(); // Same as x.f(1, 2, 3);
// :>>

/******************************************************************************/
// <<: callback
// Call `x.f()` in one second:
setTimeout(f.bind(x), 1000);
// :>>

Function.prototype.myBind = function() {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  var lockedThis = args.shift();

  return function() {
    var args2 = Array.prototype.slice.call(arguments);
    self.apply(lockedThis, args.concat(args2));
  };
};

var f = function() {console.log(this);};
var g = f.myBind("hello", 1);
g(2); // f.call("hello", 1, 2);
