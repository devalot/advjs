Function.prototype.partial = function() {
  var origFunc = this;
  var origArgs = Array.from(arguments);

  return function() {
    var newArgs = Array.from(arguments);
    return origFunc.apply(this, origArgs.concat(newArgs));
  };
};
