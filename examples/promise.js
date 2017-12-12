// <<: without
$.get("/a", function(data_a) {
  $.get("/b/" + data_a.id, function(data_b) {
    $.get("/c/" + data_b.id, function(data_c) {
      console.log("Got C: ", data_c);
    }, function() {
      console.error("Call failed");
    });
  }, function() {
    console.error("Call failed");
  });
}, function() {
  console.error("Call failed");
});
// :>>

// <<: with
$.get("/a").
  then(function(data) {
    return $.get("/b/" + data.id);
  }).
  then(function(data) {
    return $.get("/c/" + data.id);
  }).
  then(function(data) {
    console.log("Got C: ", data);
  }).
  catch(function(message) {
    console.error("Something failed:", message);
  });
// :>>
