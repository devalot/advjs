/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  var allowed = [ "id", "name", "website", "formation_year" ];
  var self = this;

  allowed.forEach(function(prop) {
    self[prop] = fields[prop];
  });
};

// Return an API path.
Artist.path = function(artist) {
  var base = "/api/artists";

  if (artist) {
    return base + "/" + artist.id;
  } else {
    return base;
  }
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
Artist.fetchOne = function(id) {
  return Ajax.get(Artist.path({id: id})).
    then(function(record) {
      return new Artist(record);
    });
};

/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
Artist.fetchAll = function() {
  return Ajax.get(Artist.path()).
    then(function(records) {
      return records.map(function(record) {
        return new Artist(record);
      });
    });

  // Using ES6 arrow functions:
  // return Ajax.get(Artist.path()).
  //   then(rs => rs.map(r => new Artist(r)));
};

/******************************************************************************/
Artist.prototype = {
  // Create a new remote record if the `id' property is `undefined',
  // otherwise update an existing remote record.
  //
  // Return a promise from the Ajax library.  Don't forget to update
  // the `this' object with properties returned by the server
  // (i.e. the newly generated remote ID when creating a record).
  save: function() {
    var self = this;

    if (self.id) {
      return Ajax.patch(Artist.path(self), self).
        then(function() { return self; });
    } else {
      return Ajax.post(Artist.path(), self).
        then(function(record) {
          self.id = record.id;
          return self;
        });
    }
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var self = this;

    return Ajax.destroy(Artist.path(self)).
      then(function() {
        delete self.id;
        return self;
      });
  },
};
