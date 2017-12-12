(function() {

  /******************************************************************************/
  // Using the `arguments' property.
  var f = function() {
    console.log(arguments, arguments.pop);

    var args = Array.prototype.slice.call(arguments);
    console.log(args, args.pop);
  };

  // Invoke `f' with a bunch of arguments:
  f("Hello", "World", 1, 2, 3, "A", "B", "C");

})();
