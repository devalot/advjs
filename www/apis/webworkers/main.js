$(function() {
  console.log("main: creating a web worker");
  var worker = new Worker("worker.js");

  console.log("main: listening for messages coming from the worker");
  worker.addEventListener("message", function(e) {
    console.log("main: incoming message from worker: ", e.data);
  });

  document.getElementById("go").addEventListener("click", function() {
    console.log("main: sending the worker a test value");
    worker.postMessage("Ping");
  });
});
