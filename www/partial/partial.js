Function.prototype.partial = function() {
  var origArgs = Array.from(arguments);
  var origThis = origArgs.shift();
  var origFunc = this;

  return function() {
    var newArgs = Array.from(arguments);
    var allArgs = origArgs.concat(newArgs);
    return origFunc.apply(origThis, allArgs);
  };
};
