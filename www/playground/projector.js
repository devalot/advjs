var Projector = (function() {
  // This anonymous function is called a "factory" function.

  var temp = 100;

  var tempIsOkay = function() {
    return (temp < 300 && temp > 90);
  };

  return {
    reset: function() {
      if (tempIsOkay()) {
        // reset the projector.
      }
    },
    off: function() {
      if (tempIsOkay()) {
        // Switch off the projector.
        temp = 0;
      }
    },
  };
})();


/*
 * Projector should only have two properties!
 */
