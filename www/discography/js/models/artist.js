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
    // Ajax library.  Don't forget to update the `this' object with
    // properties returned by the server (i.e. the new ID when
    // creating a record).
    save: function() {
      var promise = null;

      if (this.id) {
        // Update the existing record.
        promise = Ajax.patch("/api/artists/" + this.id, this);
      } else {
        // Save new record.
        promise = Ajax.post("/api/artists", this);
      }

      return promise.then(function(record) {
        for (var p in record) {
          this[p] = record[p];
        }

        return this;
      }.bind(this));
    },

    // Optional: Write a `destroy' method that deletes the artist.
    // Return a promise.
    destroy: function() {
      return Ajax.destroy("/api/artists/" + this.id).
        then(function() {
          Object.freeze(this);
          return true;
        }.bind(this));
    },
  };

  // Should fetch a single artist via Ajax.  Return a promise that
  // resolves to an instance of the Artist function.
  var fetchOne = function(id) {
    return Ajax.get("/api/artists/" + id).
      then(function(record) {
        return new Artist(record);
      });
  };

  // Should fetch all artists via Ajax.  Return a promise that
  // resolves to an array of Artist objects.
  var fetchAll = function() {
    return Ajax.get("/api/artists").
      then(function(records) {
        return records.map(function(rec) {
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
