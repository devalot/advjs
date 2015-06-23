var DeferredObject = function() {
  this.resolved = false;
  this.errored  = false;
  this.payload  = null;
  this.errorHandlers   = [];
  this.successHandlers = [];
};

DeferredObject.prototype = {
  resolve: function(payload) {
    this.resolved = true;
    this.errored  = false;
    this.payload = payload;

    this.successHandlers.forEach(function(cb) {
      cb(payload);
    });
  },

  failed: function(error) {
    this.resolved = false;
    this.errored  = true;
    this.payload  = error;

    this.errorHandlers.forEach(function(cb) {
      cb(payload);
    });
  },

  then: function(callback) {
    if (this.resolved) callback(this.payload);
    this.successHandlers.push(callback);
    return this;
  },

  error: function(callback) {
    if (this.errored) callback(this.payload);
    this.errorHandlers.push(callback);
    return this;
  },

  promise: function() {
    // Short way:
    //
    // return {
    //   then:  this.then.bind(this),
    //   error: this.error.bind(this),
    // };

    // Long way:
    var deferred = this;

    return {
      then: function(cb) {
        return deferred.then(cb);
      },
      error: function(cb) {
        return deferred.error(cb);
      }
    };
  },
};


var get = function(url) {
  var request = new XMLHttpRequest();
  var deferred = new DeferredObject();

  request.addEventListener("load", function() {
    deferred.resolve(request.responseText);
  });

  request.addEventListener("error", function() {
    deferred.failed("AJAX failed, WTF!");
  });

  request.open("GET", url);
  request.send(null);

  return deferred.promise();
};

get("/api/artists").then(function(response) {
  console.log("server said" + response);
}).error(function(message) {
  console.error(message);
});
