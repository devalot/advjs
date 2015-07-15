/******************************************************************************/
// <<: mixin
Function.prototype.mixin = function() {
  var i, prop;

  for (i=0; i<arguments.length; ++i) {
    for (prop in arguments[i].prototype) {
      this.prototype[prop] =
        arguments[i].prototype[prop];
    }
  }
};
// :>>

/******************************************************************************/
// <<: usage
var A = function() {};
A.prototype.isA = function() {return true};

var B = function() {};
B.prototype.isB = function() {return true};

var C = function() {};
C.prototype.isC = function() {return true};

C.mixin(A, B);
var obj = new C();

console.log(obj.isA()); // true
console.log(obj.isB()); // true
console.log(obj.isC()); // true
// :>>
