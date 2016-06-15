Model = function(pathPrefix) {
  this.pathPrefix = pathPrefix;
};

Model.fetchOne = function(pathPrefix, id) {
  var constructor = this;

  return Ajax.get(pathPrefix + "/" + id).
    then(function(record) {
      return new constructor(record);
    });
};

Model.fetchAll = function(pathPrefix) {
  var constructor = this;

  return Ajax.get(pathPrefix).
    then(function(records) {
      return records.map(function(rec) {
        return new constructor(rec);
      });
    });

  // return Ajax.get(pathPrefix).
  //   then(records => records.map(r => new constructor(r)));
};

Model.prototype = {
  setProperties: function(record) {
    for (var p in record) this[p] = record[p];
  },

  // Create a new record if the `id' property is `undefined',
  // otherwise update an existing record.  Return a promise from the
  // Ajax library.  Don't forget to update the `this' object with
  // properties returned by the server (i.e. the new ID when
  // creating a record).
  save: function() {
    var promise = null;

    if (this.id) {
      // Update the existing record.
      promise = Ajax.patch(this.pathPrefix + "/" + this.id, this);
    } else {
      // Save new record.
      promise = Ajax.post(this.pathPrefix, this);
    }

    return promise.then(function(record) {
      this.setProperties(record);
      return this;
    }.bind(this));
  },

  // Optional: Write a `destroy' method that deletes the artist.
  // Return a promise.
  destroy: function() {
    return Ajax.destroy(this.pathPrefix + "/" + this.id).
      then(function() {
        Object.freeze(this);
        return true;
      }.bind(this));
  },
};
