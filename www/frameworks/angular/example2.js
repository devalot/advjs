angular.module("example", [])
  .controller("ExampleController", function($scope, $http) {
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

    self.removeItem = function(id) {
      var index = 0;
      self.items.forEach(function(e, i) {
        if (e.id == id) index = i;
      });

      self.items.splice(index, 1);
      $http.delete("/api/artists/" + id);
    };

    self.save = function() {
      self.items.forEach(function(e) {
        $http.patch("/api/artists/" + e.id, e);
      });
    };

    self.add = function(name) {
      $http.post("/api/artists", {name: name})
        .then(function(artist) {
          self.items.push(artist.data);
        });
    };
  });
