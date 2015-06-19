Example = (function() {

  var go = function() {
    $("#the-input").on("keydown", function() {
      $("#the-output").text($(this).val());
    });
  };

  return {go: go};
})();
