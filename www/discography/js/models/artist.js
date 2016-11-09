/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  this.id             = fields.id
  this.name           = fields.name;
  this.formation_year = fields.formation_year;
  this.website        = fields.website;
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
Artist.fetchOne = function(id) {
  return Ajax.get("/api/artists/" + id).
    then(function(record) {
      return new Artist(record);
    });
};

/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
Artist.fetchAll = function() {
  return Ajax.get("/api/artists").
    then(function(records) {
      return records.map(function(record) {
        return new Artist(record);
      });
    });

  // ES6:
  // return Ajax.get("/api/artists").
  //   then(records => {
  //     return records.map(r => new Artist(r));
  //   });
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
    var artist = this;

    if (artist.id) {
      return Ajax.patch("/api/artists/" + id, artist).
        then(function() { return artist; });
    } else {
      return Ajax.post("/api/artists", artist).
        then(function(other) {
          artist.id = other.id;
          return artist;
        });
    }
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var artist = this;

    return Ajax.destroy("/api/artists/" + id).
      then(function() {
        delete artist.id;
        return artist;
      });

    // ES6
    // return Ajax.destroy("/api/artists/" + id).
    //   then(() => {
    //     delete this.id;
    //     return this;
    //   });
  },
};
