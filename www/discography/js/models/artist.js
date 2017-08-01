/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  var allowed = ['id', 'name', 'formation_year', 'website'];
  var self = this;

  allowed.forEach(function(field) {
    self[field] = fields[field];
  });

  // Using `bind':
  //
  // allowed.forEach(function(field) {
  //   this[field] = fields[field];
  // }.bind(this));

  // Using ES6 Arrow Function:
  //
  // allowed.forEach(field => this[field] = fields[field]);
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
Artist.fetchOne = function(id) {
  return Ajax.get('/api/artists/' + id).
    then(function(record) {
      return new Artist(record);
    });
};

/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
Artist.fetchAll = function() {
  return Ajax.get('/api/artists').
    then(function(records) {
      return records.map(function(record) {
        return new Artist(record);
      });
    });

  // Using ES6 Arrow Functions:
  //
  // return Ajax.get('/api/artists').
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
    var promise;

    if (self.id) {
      promise = Ajax.patch('/api/artists/' + self.id, self);
    } else {
      promise = Ajax.post('/api/artists', self);
    }

    return promise.then(function(record) {
      if (record) self.id = record.id;
      return self;
    });
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var self = this;

    return Ajax.destroy('/api/artists/' + self.id).
      then(function() {
        delete self.id;
        return true;
      });
  },
};
