/* jshint esversion: 6 */

/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  var allowedFields = ["id", "name", "formation_year", "website"];

  allowedFields.forEach(function(name) {
    this[name] = fields[name];
  }.bind(this));
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
Artist.fetchOne = function(id) {
  // Using ES5:
  return Ajax.get("/api/artists/" + id).
    then(function(record) {
      return new Artist(record);
    });

  // Using ES2015 arrow functions:
  return Ajax.get(`/api/artists/${id}`).
    then(r => new Artist(r));
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

  return Ajax.get("/api/artists").
    then(rs => rs.map(r => new Artist(r)));
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
    var p;

    if (self.id) {
      p = Ajax.patch("/api/artists/" + self.id, self);
    } else {
      p = Ajax.post("/api/artists", self);
    }

    return p.then(function(record) {
      self.id = record.id;
      return self;
    });
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var self = this;

    return Ajax.destroy("/api/artists/" + self.id).
      then(function() {
        delete self.id;
        return self;
      });
  },
};
