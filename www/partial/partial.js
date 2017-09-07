Function.prototype.partial = function() {
  var f = this;
  var origArgs = Array.from(arguments);
  var receiver = origArgs.shift();

  return function() {
    var newArgs = Array.from(arguments);
    return f.apply(receiver, origArgs.concat(newArgs));
  };
};
