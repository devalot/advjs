Artist = (function(){

  // Artist constructor.  Given an object describing an artist, copy
  // all of its local properties into `this'.
  var Artist = function(record) {
  };

  Artist.prototype = {
    // Create a new record if the `id' property is `undefined',
    // otherwise update an existing record.  Return a promise from the
    // Ajax library.
    save: function() {
    },

    // Optional: Write a `destroy' method that deletes the artist.
    // Return a promise.
    destroy: function() {
    },
  };

  // Should fetch a single artist via Ajax.  Return a promise that
  // resolves to an instance of the Artist function.
  var fetchOne = function(id) {
  };

  // Should fetch all artists via Ajax.  Return a promise that
  // resolves to an array of Artist objects.
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
