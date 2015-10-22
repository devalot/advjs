Artist = (function(){

  // Should copy appropriate properties from `record' to `this'.
  var Artist = function(record) {
    this.reset(record);
  };

  Artist.prototype = {
    reset: function(record) {
      for (var p in record) {
        if (record.hasOwnProperty(p)) {
          this[p] = record[p];
        }
      }
    },

    // Create a new record if the `id' property is `undefined',
    // otherwise update an existing record.  Invoke the callback after
    // the server has confirmed the save.  Callback should be
    // optional.
    save: function(callback) {
      var self = this, p;

      if (this.id instanceof Number) {
        p = Ajax.patch("/api/artists/" + this.id, this);
      } else {
        p = Ajax.post("/api/artists", this);
      }

      p.then(function(updated) {
        self.reset(updated);
        if (callback) callback(self);
      });
    },

    // Optional: Write a `destroy' method that deletes the artist.
    destroy: function(callback) {
      var self = this;

      Ajax.destroy("/api/artists/" + this.id).
        then(function() {
          delete self.id;
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
