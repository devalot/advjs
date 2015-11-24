$(function() {
  var socket = io('http://localhost:3000');

  socket.on('log', function (data) {
    $("#log").prepend($("<li></li>").text(data));
  });
});
