Function.prototype.partial = function() {

  // Your code here.

  var args = Array.from(arguments);
  var context = args.shift();
  var func = this;

  return function() {
    var newArgs = Array.from(arguments);
    return func.apply(context, args.concat(newArgs));
  };

};
