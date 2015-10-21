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

  var bind = function() {
    var args   = Array.prototype.slice.call(arguments);
    var inF    = args.shift();
    var inThis = args.shift();

    return function() {
      var args2 = Array.prototype.slice.call(arguments);
      inF.apply(inThis, args.concat(args2));
    };
  };

var f = function() {
  console.log("this is: ", this);
  console.log("args are: ", arguments);
};

var g = bind(f, 1, 2, 3);
g(4, 5, 6); // Same as 1.f(2, 3, 4, 5, 6);

// Function.prototype.bind = bind; BAD
})();

var Projector = (function() {
  var temp = 90;

  var checkTemp = function() {
    if (temp < 100) {
      return true;
    } else {
      return false;
    }
  };

  return {
    reset: function() {
      console.log("reset called");

      if (checkTemp()) {
        console.log("resetting!");
        temp = 90;
      } else {
        temp -= 10;
      }
    },
    off: function() {
      console.log("off called");

      if (checkTemp()) {
        console.log("turning off!");
        temp = 0;
      } else {
        this.reset();
      }
    }
  };
});

Projector.reset();
Projector.off();
