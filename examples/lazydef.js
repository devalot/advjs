/******************************************************************************/
// <<: slow
var digitName = function(n) {
  var names = ["zero", "one", "two", /* more elements */];
  return names[n] || "";
};
// :>>

/******************************************************************************/
// <<: fixed
var digitName = function(n) {
  var names = ["zero", "one", "two", /* more elements */];

  // No `var' here!
  digitName = function(n) {
    return names[n] || "";
  };

  return digitName(n);
};
// :>>
