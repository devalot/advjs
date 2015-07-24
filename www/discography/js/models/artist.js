Artist = (function(){

  // Should copy appropriate properties from `record' to `this'.
  var Artist = function(record) {
    for (var p in record) {
      this[p] = record[p];
    }
  };

  Artist.prototype = {
    // Create a new record if the `id' property is `null', or update
    // an existing record.  Invoke the callback after the server has
    // confirmed the save.  Callback should be optional.
    save: function(callback) {
      var req;

      if (this.id) {
        req = Ajax.patch("/api/artists/" + this.id, this);
      } else {
        req = Ajax.post("/api/artists", this);
      }

      req.then(function(record) {
        for (var p in record) this[p] = record[p];
        if (callback) callback(this);
      }).catch(function(message) {
        throw message;
      });
    },

    // Optional: Write a `destroy' method that deletes the artist.
    destroy: function(callback) {
      Ajax.destroy("/api/artists/" + this.id).
        then(function() {
          if (callback) callback();
        });
    },
  };

  // Should fetch a single artist via Ajax and then call the callback
  // with a single `Artist' instance.
  var fetchOne = function(id, callback) {
    Ajax.get("/api/artists/" + id).
      then(function(record) {
        callback(new Artist(record));
      });
  };

  // Should fetch all artists via Ajax and then call the callback with
  // an array of 'Artist' instances.
  var fetchAll = function(callback) {
    Ajax.get("/api/artists").
      then(function(records) {
        var artists = records.map(function(record) {
          return new Artist(record);
        });
        callback(artists);
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
