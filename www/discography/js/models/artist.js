Artist = (function(){

  // Should copy appropriate properties from `record' to `this'.
  var Artist = function(record) {
  };

  Artist.prototype = {
    // Create a new record if the `id' property is `null', or update
    // an existing record.  Invoke the callback after the server has
    // confirmed the save.  Callback should be optional.
    save: function(callback) {
    },

    // Optional: Write a `destroy' method that deletes the artist.
    destroy: function(callback) {
    },
  };

  // Should fetch a single artist via Ajax and then call the callback
  // with a single `Artist' instance.
  var fetchOne = function(id, callback) {
  };

  // Should fetch all artists via Ajax and then call the callback with
  // an array of 'Artist' instances.
  var fetchAll = function(callback) {
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
