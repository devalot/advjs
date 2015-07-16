// <<: without
$.get("/a", function(data) {
  $.get("/b/" + data.id, function(data_b) {
    $.get("/c/" + data.id, function(data_c) {
      console.log("Got C: ", data_c);
    }, function() {
      console.error("Call to C failed");
    });
  }, function() {
    console.error("Call to B failed");
  });
}, function() {
  console.error("Call to A failed");
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
