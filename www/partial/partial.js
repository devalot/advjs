/*jshint esversion: 6 */

// Function.prototype.partial = Function.prototype.bind;

Function.prototype.partial = function() {
  let origArgs = Array.from(arguments);
  let lockedThis = origArgs.shift();
  let func = this;

  return function() {
    let newArgs = Array.from(arguments);
    let allArgs = origArgs.concat(newArgs);
    return func.apply(lockedThis, allArgs);
  };
};
