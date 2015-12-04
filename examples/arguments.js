var foo = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
};
