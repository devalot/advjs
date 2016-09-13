Function.prototype.partial = function() {
  var func = this;
  var origArgs = Array.from(arguments);
  var lockedThis = origArgs.shift();

  return function() {
    var newArgs = Array.from(arguments);
    return func.apply(lockedThis, origArgs.concat(newArgs));
  };
};
