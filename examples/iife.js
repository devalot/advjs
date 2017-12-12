/******************************************************************************/
// <<: short
(function() {
  var x = 1;
  return x;
})();
// :>>

/******************************************************************************/
// <<: long
(function() {  // (1) Anonymous function expression.

  var x = 1; // (2) Body of function.
  return x;

})();  // (3) Close function and call function.
// :>>

/******************************************************************************/
// <<: private
var helper = (function() {

  var x = 1;

  return {
    getX: function()  {return x;},
    setX: function(y) {x = y;},
  };

})();

helper.setX(3);
helper.getX(); // 3
// :>>


/******************************************************************************/
// <<: two-steps
function helper () {
  var x = 1;

  return {
    getX: function()  {return x;},
    setX: function(y) {x = y;   },
  };
}

var h = helper();
h.setX(3);
h.getX(); // 3
// :>>
