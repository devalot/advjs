// Function.prototype.partial = Function.prototype.bind;

Function.prototype.partial = function() {
  var origArgs = Array.from(arguments);
  var receiver = origArgs.shift();
  var f = this;

  return function() {
    var newArgs = Array.from(arguments);
    return f.apply(receiver, origArgs.concat(newArgs));
  };
};
