console.log("worker: loaded");

console.log("worker: listening for messages");

onmessage = function(e) {
  console.log("worker: received message: ", e.data);
  console.log("worker: sending response");
  postMessage("Pong");
};
