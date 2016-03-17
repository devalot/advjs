Model = function(baseURL, record) {
  this.baseURL = baseURL;

  for (var p in record) {
    this[p] = record[p];
  }
};

Model.prototype = {
  save: function() {
    var self = this;
    var promise;

    if (this.id) {
      promise = Ajax.patch(this.baseURL + "/" + this.id, this);
    } else {
      promise = Ajax.post(this.baseURL, this);
    }

    return promise.then(function(record) {
      for (var p in record) self[p] = record[p];
      return self;
    });
  },
  destroy: function() {
    return Ajax.destroy(this.getURL([this.id]));
  },
  getURL: function() {
    var parts = Array.from(arguments);
    return this.baseURL + "/" + parts.join("/");
  },
};

Model.fetchOne = function(baseURL, id) {
  return Ajax.get(baseURL + "/" + id).
    then(function(record) {
      return new Model(baseURL, record);
    });
};

Model.fetchAll = function(baseURL) {
  return Ajax.get(baseURL).then(function(records) {
    return records.map(function(record) {
      return new Model(baseURL, record);
    });
  });
};
