/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
//
// - id
// - name
// - formation_year
// - website
Artist = function(fields) {
  var allowedFields = [ "id", "name", "formation_year", "website" ];
  var self = this;

  allowedFields.forEach(function(name) {
    self[name] = fields[name];
  });
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
    then(records => records.map(r => new Artist(r)));
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
    if (this.id) {
      return Ajax.patch("/api/artists/" + this.id, this);
    } else {
      return Ajax.post("/api/artists", this).
        then(record => {
          this.id = record.id;
          return this;
        });
    }
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    if (!this.id) return null;

    var self = this;

    return Ajax.destroy("/api/artists/" + this.id).
      then(function() {
        delete self.id;
        return true;
      });
  }
};
