Model = function() {};

Model.prototype = {
  // Copy properties from the given record into `this'.
  set: function(record) {
    for (var p in record) {
      this[p] = record[p];
    }

    return this;
  },

  // If the record has an ID then update the database.  Otherwise
  // create a new record in the database.  Returns a promise.
  save: function() {
    var method;

    if (this.id === undefined) {
      method = Ajax.post.bind(null, this.prefix);
    } else  {
      method = Ajax.patch.bind(null, this.prefix + "/" + this.id);
    }

    return method(this).then(this.set.bind(this));
  },

  // Remove the record from the database.  Returns a promise.
  destroy: function() {
    return Ajax.destroy(this.prefix + "/" + this.id);
  }
};

// Should fetch a single record via Ajax.  Return a promise that
// resolves to an instance of the constructor.
Model.fetchOne = function() {
  var args = Array.prototype.slice.call(arguments),
      ctor   = args.shift(),
      base   = args.shift(),
      id     = args.shift(),
      prefix = Model.makePrefix(base, ctor.mappings, args);

  return Ajax.get(prefix + "/" + id).
    then(function(rec) {
      return new ctor(rec);
    });
};

// Should fetch all records via Ajax.  Return a promise that resolves
// to an array of constructor instances.
Model.fetchAll = function() {
  var args = Array.prototype.slice.call(arguments),
      ctor   = args.shift(),
      base   = args.shift(),
      prefix = Model.makePrefix(base, ctor.mappings, args);

  return Ajax.get(prefix).
    then(function(recs) {
      return recs.map(function(rec) {
        return new ctor(rec);
      });
    });
};

Model.create = function() {
  var args   = Array.prototype.slice.call(arguments),
      ctor   = args.shift(),
      record = args.shift();

  return new ctor(record, args);
};

// Using a base prefix string, variable mappings, and dependency
// records, create a prefix string with all variables rendered.
Model.makePrefix = function(base, mappings, records) {
  if (mappings && records) {
    var vars = {};

    for (var i; i<mappings.length; ++i) {
      for (var p in mappings[i]) {
        vars[mappings[i][p]] = records[i][p];
      }
    }

    return Mustache.render(base, vars);
  } else {
    return base;
  }
};

// Create a new model given a URL prefix and an optional variable
// mapping used to interpolate any variables in the prefix string.
Model.makeModel = function(prefix, mappings) {
  var ctor = function(record) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    this.prefix = Model.makePrefix(prefix, mappings, args);
    this.set(record);
  }

  ctor.mappings  = mappings;
  ctor.prototype = Model.prototype;

  return {
    fetchOne: Model.fetchOne.bind(null, ctor, prefix),
    fetchAll: Model.fetchAll.bind(null, ctor, prefix),
    create:   Model.create.bind(null,   ctor),
  };
};
