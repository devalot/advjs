Model = function(path, fields) {
  for (var p in fields) this[p] = fields[p];
  this.path = path;
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
    Model.call(self, self.path, updated);
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
