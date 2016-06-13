Function.prototype.partial = function() {
  var f = this;  // The function to call.
  var initialArgs = Array.from(arguments); // ES6 Only.

  return function() {
    var allArgs = initialArgs.concat(Array.from(arguments));
    return f.apply(this, allArgs);
  };
};
