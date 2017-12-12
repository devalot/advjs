var Deferred = function() {
  var successHandlers = [];
  var errorHandlers   = [];
  var isRejected      = false;
  var isResolved      = false;
  var resolveData     = null;
  var rejectData      = null;

  var then = function(callback) {
    if (isResolved) callback(resolveData);
    successHandlers.push(callback);
    return this;
  };

  var fail = function(callback) {
    if (isRejected) callback(rejectData);
    errorHandlers.push(callback);
    return this;
  };

  var resolve = function(data) {
    isResolved = true;
    resolveData = data;
    successHandlers.forEach(function(callback) {
      callback(data);
    });
  };

  var reject = function(data) {
    isRejected = true;
    rejectData = data;
    errorHandlers.forEach(function(callback) {
      callback(data);
    });
  };

  return {
    then: then,
    fail: fail,
    resolve: resolve,
    reject: reject,

    promise: function() {
      return {
        then: then,
        fail: fail,
      };
    }
  };
};

var promise = Deferred().promise();

promise.then(function(data) {
  // Here for success.
}).fail(function(data) {
  // Here for failure.
});
