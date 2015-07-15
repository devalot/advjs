var Car = (function() {
  // Private variable.
  var speed = 0;

  // Private method.
  var setSpeed = function(x) {
    if (x > 0 && x < 100) {speed = x;}
  };

  // Return the public interface.
  return {
    stop: function() {setSpeed(0);},
    inc:  function() {setSpeed(speed + 10);},
  };
})();
