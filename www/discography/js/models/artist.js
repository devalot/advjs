Artist = (function(){

  // Should copy appropriate properties from `record' to `this'.
  var Artist = function(record) {
    this.id             = record.id
    this.name           = record.name;
    this.formation_year = record.formation_year;
    this.website        = record.website;
  };

  Artist.prototype = {
    // Create a new record if the `id' property is `null', or update
    // an existing record.  Invoke the callback after the server has
    // confirmed the save.  Callback should be optional.
    save: function(callback) {
      var self = this;

      if (self.id) {
        Ajax.patch("/api/artists/" + self.id, self, function() {
          callback && callback(self);
        });
      } else {
        Ajax.post("/api/artists", self, function(record) {
          self.id = record.id;
          callback && callback(self);
        });
      }
    },

    // Optional: Write a `destroy' method that deletes the artist.
    destroy: function(callback) {
      var self = this;

      Ajax.destroy("/api/artists/" + self.id, function() {
        callback && callback(self);
      });
    },
  };

  // Should fetch a single artist via Ajax and then call the callback
  // with a single `Artist' instance.
  var fetchOne = function(id, callback) {
    Ajax.get("/api/artists/" + id, function(record) {
      callback(new Artist(record));
    });
  };

  // Should fetch all artists via Ajax and then call the callback with
  // an array of 'Artist' instances.
  var fetchAll = function(callback) {
    Ajax.get("/api/artists", function(records) {
      callback(records.map(function(a) {
        return new Artist(a);
      }));
    });
  };

  // Public interface:
  return {
    fetchOne: fetchOne,

    fetchAll: fetchAll,

    create: function(record) {
      return new Artist(record);
    },
  };
})();
