$(function() {
  var log = function(data) {
    $("#log").prepend($("<li></li>").text(data));
  };

  var ws = new WebSocket("ws://localhost:3000/");

  ws.onopen = function() {
    log("connected to WebSocket server");
  };

  ws.onclose = function() {
    log("connection to WebSocket server closed");
  };

  ws.onerror = function() {
    log("a WebSocket error occurred");
  };

  ws.onmessage = function(e) {
    log("incoming message: " + e.data);
  };

  $("button").click(function() {
    log("sending PING to server");
    ws.send("PING");
  });
});
