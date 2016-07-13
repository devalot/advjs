Model = function() {};

Model.create = function(properties) {
  var model = function() {
    var args   = Array.from(arguments);
    var fields = args.pop();
    var path   = model.makePath(args);

    for (var p in fields) this[p] = fields[p];

    if (properties.constructor) {
      properties.constructor.apply(this, args);
    }

    this.model = model;
  };

  model.makePath = function(args) {
    if (properties.path instanceof Function) {
      return properties.path.apply(this, args);
    } else {
      return properties.path;
    }
  };

  model.factory = function(args) {
    return function(fields) {
      var obj = Object.create(model.prototype);
      model.apply(obj, args.concat([fields]));
      return obj;
    };
  };

  model.fetchOne = function() {
    var args = Array.from(arguments);
    var id   = args.pop();
    var path = model.makePath(args);
    return Model.fetchOne(path, model.factory(args), id);
  };

  model.fetchAll = function() {
    var args = Array.from(arguments);
    var path = model.makePath(args);
    return Model.fetchAll(path, model.factory(args));
  };

  model.prototype = Model.prototype;
  return model;
};



// Model.fetchOne :: Path -> (Object -> Instance) -> Promise Instance
Model.fetchOne = function(path, factory, id) {
  return Ajax.get("/api/" + path + "/" + id).
    then(function(record) {
      return factory(record);
    });
};

// Model.fetchAll :: Path -> (Object -> Instance) -> Promise [Instance]
Model.fetchAll = function(path, factory) {
  return Ajax.get("/api/" + path).
    then(function(records) {
      return records.map(function(record) {
        return factory(record);
      });
    });
};

Model.prototype.save = function() {
  // Save `this' for callbacks.  Or use `bind(this)` on the
  // callbacks below to preserve the current context.
  var promise;

  if (this.id) {
    // Artist exists on remote server, update it.
    promise = Ajax.patch("/api/" + this.path + "/" + this.id, this);
  } else {
    // Need to create the artist on the remote server.
    promise = Ajax.post("/api/" + this.path, this);
  }

  var self = this;

  return promise.then(function(updated) {
    self.model.call(self, updated);
    return self;
  });
};

Model.prototype.destroy = function() {
  var self = this;

  Ajax.destroy("/api/" + this.path + "/" + self.id).
    then(function() {
      delete self.id;
      return true;
    });
};
