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

var Projector = (function() {
  var isOn = true;
  var temp = 100;

  var checkTemp = function() {
    if (temp > 90 && temp < 300) {
      return true;
    } else {
      return false;
    }
  };

  return {
    reset: function() {
      if (checkTemp()) {
        isOn = true;
        temp = 0;
      }
    },
    off: function() {
      if (checkTemp()) {
        isOn = false;
        temp = 0;
      }
    },
  };

})();
