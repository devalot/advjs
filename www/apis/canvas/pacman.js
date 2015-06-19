Pacman = (function() {

  /****************************************************************************/
  var canvas, context;

  /****************************************************************************/
  var draw = function() {
    var time = new Date();

    context.clearRect(0, 0, 300, 100);
    context.beginPath();
    context.fillStyle = "yellow";

    if (time.getMilliseconds() % 250 > 100) {
      context.arc(37, 37, 13, Math.PI/7, -Math.PI/7, false);
      context.lineTo(31, 37);
    } else {
      context.arc(37, 37, 13, 0, Math.PI * 2, false);
    }

    context.fill();
    window.requestAnimationFrame(draw);
  };

  /****************************************************************************/
  var init = function() {
    canvas  = document.getElementById("pacman");
    context = canvas.getContext("2d");

    canvas.style.background = "#000000";
    window.requestAnimationFrame(draw);
  };

  /****************************************************************************/
  return {
    go: init,
  };
})();
