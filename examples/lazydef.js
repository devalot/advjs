/******************************************************************************/
// <<: slow
var digitName = function(n) {
  var names = ["zero", "one", "two"];
  return names[n] || "";
};
// :>>

/******************************************************************************/
// <<: fixed
var digitName = function(n){
  var names = ["zero", "one", "two"];

  // No `var' here!
  digitName = function(n) {
    return names[n] || "";
  };

  return digitName(n);
};
// :>>
