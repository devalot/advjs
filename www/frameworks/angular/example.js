angular.module("example", [])
  .controller("ExampleController", function($http) {
    var self = this;
    self.artists = [];

    $http.get("/api/artists").
      success(function(data) {
        data.forEach(function(e) {
          self.artists.push(e);
        });
      }).
      error(function() {
        console.error("ajax call failed");
      });
  });
