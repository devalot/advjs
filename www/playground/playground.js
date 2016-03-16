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


  var bind = function(f, lockedThis) {
    var lockedArgs = Array.from(arguments);
    lockedArgs.shift(); // Remove `f'
    lockedArgs.shift(); // Remove `lockedThis'

    return function() {
      var newArgs = Array.from(arguments);
      return f.apply(lockedThis, lockedArgs.concat(newArgs));
    };
  };

  var f = function() {
    console.log("this is: ", this);
    console.log("arguments is: ", arguments);
  };

  var g = bind(f, "hello", 1, 2);
  g(3); // Should print "hello, 1, 2, 3"



})();


(function() {
  Function.prototype.partial = function() {
    var argsOrig = Array.from(arguments);
    var func     = this;

    return function() {
      var argsNew = Array.from(arguments);
      return func.apply(this, argsOrig.concat(argsNew));
    };
  };

  var obj = {
    color: "red",
    add: function(x, y) {
      console.log("adding " + x + " and " + y);
      console.log("my color is: ", this.color);
      return x + y;
    },
  };

  obj.add10 = obj.add.partial(10); // Same as: obj.add.bind(obj, 10);
  obj.add10(2); // Should log "10 + 2" then "red".
})();
