Model = function() {};

Model.create = function(attrs) {
  var ctor = function() {
    var args = Array.from(arguments);
    var fields = args.pop();

    for (var p in fields) this[p] = fields[p];
    this._path = attrs.path.bind(this, args);
  };

  Object.setPrototypeOf(ctor, Model.prototype);
  ctor.attrs = attrs;
  ctor.prototype = Object.create(Model.instanceMethods);

  return ctor;
};

Model.prototype.fetchOne = function() {
  var args = Array.from(arguments);
  var id   = args.pop();
  var ctor = this;

  return Ajax.get(this.attrs.path(args, id)).
    then(function(record) {
      return new ctor(record);
    });
};

Model.prototype.fetchAll = function() {
  var args = Array.from(arguments);
  var ctor = this;

  return Ajax.get(this.attrs.path(arguments)).
    then(function(records) {
      return records.map(function(record) {
        return new ctor(record);
      });
    });
};

Model.instanceMethods = {
  // Create a new remote record if the `id' property is `undefined',
  // otherwise update an existing remote record.
  //
  // Return a promise from the Ajax library.  Don't forget to update
  // the `this' object with properties returned by the server
  // (i.e. the newly generated remote ID when creating a record).
  save: function() {
    var method = this.id ? Ajax.patch : Ajax.post;
    var promise = method(this._path(this.id), this);
    var self = this;

    return promise.then(function(record) {
      if (record) self.id = record.id;
      return self;
    });
  },

  // Optional: Write a `destroy' method that deletes the artist from
  // the remote server.  Return a promise.
  destroy: function() {
    var self = this;

    return Ajax.destroy(this._path(this.id)).
      then(function() {
        delete self.id;
        return self;
      });
  },
};
