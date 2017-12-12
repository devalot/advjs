/******************************************************************************/
Circle = (function() {

  /****************************************************************************/
  var canvas, context;

  /****************************************************************************/
  var draw = function() {
    var path = new Path2D();

    path.arc(75, 75, 50, 0, Math.PI * 2, true);

    context.fillStyle = "#6C0";
    context.fill(path);

    context.strokeStyle = "#09F";
    context.lineWidth   = 4;
    context.stroke(path);
  };

  /****************************************************************************/
  var init = function() {
    canvas  = document.getElementById("circle");
    context = canvas.getContext("2d");
    draw();
  };

  /****************************************************************************/
  return {
    go: init,
  };
})();
