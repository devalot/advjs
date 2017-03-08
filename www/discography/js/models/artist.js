/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  var allowed = ["id", "name", "formation_year", "website"];
  var self = this;

  // 1: Alias `this':
  allowed.forEach(function(f) {
    self[f] = fields[f];
  });

  // 2: `bind':
  allowed.forEach(function(f) {
    this[f] = fields[f];
  }.bind(this));

  // 3: Arrow functions:
  allowed.forEach(f => this[f] = fields[f]);
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
// Artist.fetchOne :: Number -> Promise Artist
Artist.fetchOne = function(id) {
  return Ajax.get("/api/artists/" + id).
    then(function(record) {
      // Turn a bare object into an `Artist':
      return new Artist(record);
    });
};

/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
// Artist.fetchAll :: Promise [Artist]
Artist.fetchAll = function() {
  return Ajax.get("/api/artists").
    then(function(records) {
      return records.map(function(record){
        return new Artist(record);
      });
    });

  // return Ajax.get("/api/aritsts").
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

    if (this.id) {
      return Ajax.patch("/api/artists/" + this.id, this).
        then(function() {
          return self;
        });
    } else {
      return Ajax.post("/api/artists", this).
        then(function(response) {
          Artist.call(self, response);
          return self;
        });
    }
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var self = this;

    return Ajax.destroy("/api/artists/" + id).
      then(function() {
        delete self.id;
        return true;
      });
  },
};
