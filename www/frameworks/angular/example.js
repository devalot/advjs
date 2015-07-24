angular.module("example", [])
  .controller("ExampleController", function($http) {
    var self = this;
    self.items = [];

    $http.get("/api/artists").
      success(function(data) {
        data.forEach(function(e) {
          self.items.push(e);
        });
      }).
      error(function() {
        console.error("ajax call failed");
      });
  });
