Artist = (function(){

  // Artist constructor.  Given an object describing an artist, copy
  // all of its local properties into `this'.
  var Artist = function(record) {
    for (var p in record) {
      this[p] = record[p];
    }
  };

  Artist.prototype = {
    // Create a new record if the `id' property is `undefined',
    // otherwise update an existing record.  Return a promise from the
    // Ajax library.
    save: function() {
      var self = this;

      if (self.id === undefined) {
        return Ajax.post("/api/artists", self).
          then(function(rec) {
            self.id = rec.id;
            return self;
          });
      } else  {
        return Ajax.patch("/api/artists/" + self.id, self).
          then(function() {return self;});
      }
    },

    // Optional: Write a `destroy' method that deletes the artist.
    // Return a promise.
    destroy: function() {
      return Ajax.destroy("/api/artists/" + this.id);
    },
  };

  // Should fetch a single artist via Ajax.  Return a promise that
  // resolves to an instance of the Artist function.
  var fetchOne = function(id) {
    return Ajax.get("/api/artists/" + id).
      then(function(rec) {
        return new Artist(rec);
      });
  };

  // Should fetch all artists via Ajax.  Return a promise that
  // resolves to an array of Artist objects.
  var fetchAll = function() {
    return Ajax.get("/api/artists").
      then(function(recs) {
        return recs.map(function(rec) {
          return new Artist(rec);
        });
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
