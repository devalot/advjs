/******************************************************************************/
/*
 * Promise objects.
 *
 * The Promise constructor is given a callback function known as an
 * executor.  The executor function is given two arguments, called
 * "resolve" and "reject".  Example usage:
 *
 *   var p = new Promise(function(resolve, reject) {
 *     if (somethingGood) {
 *       resolve(someGoodData);
 *     } else {
 *       reject(someErrorMessage);
 *     }
 *   });
 *
 * The two arguments to the executor function are functions
 * themselves.  Both functions take a single argument.
 *
 * If the executor function invokes its first argument (resolve) it
 * must provide the promised value.  This resolves the promise and
 * calls all of the success (then) callbacks with the promised value.
 *
 * If the executor function invokes its second argument (reject) it
 * must provide a reject value.  This rejects the promise and calls
 * all of the failure (catch) callbacks with the reject value.
 *
 * Look at the test file for more usages examples:
 *
 *   spec/promise.spec.js
 *
 */
Promise = function(executor) {
  // 1. Initialize state of the promise (pending, resolved, rejected).
  var resolved = false;
  var rejected = false;

  // 2. Need a place to store callbacks (success and error).
  var successHandlers = [];
  var errorHandlers   = [];

  // 3. Need a place to store the promised value.
  var resolvedValue = null;

  // 4. Need a place to store the rejected value.
  var rejectedValue = null;

  // Function to resolve a promise (success).
  var resolve = function(value) {
    if (rejected) return; // can't be resolved *and* rejected.

    resolved = true;
    resolvedValue = value;

    successHandlers.forEach(function(callback) {
      callback(resolvedValue);
    });
  };

  // Function to reject a promise (failure).
  var reject = function(value) {
    if (resolved) return; // Can't be resolved *and* rejected.

    rejected = true;
    rejectedValue = value;

    errorHandlers.forEach(function(callback) {
      callback(rejectedValue);
    });
  };

  // Add a "catch" callback.
  this.addCatch = function(callback) {
    errorHandlers.push(callback);
    if (rejected) callback(rejectedValue);
    return this; // Allow function chaining.
  };

  // Add a "then" callback to the successHandlers array.
  //
  // This function must return a new promise linked to the current
  // promise.  When the current promise is resolved or rejected then
  // the promise returned from this function will also be resolved or
  // rejected.
  this.addThen = function(callback) {
    // Record the current promise as "self" and in the notes bellow
    // we'll refer to the current promise as Promise-A.
    var self = this; // self === this === Promise-A

    // The "addThen" function *must* return a new promise.  We'll
    // refer to this promise as Promise-B.  If Promise-A is resolved
    // or rejected then Promise-B needs to be resolved or rejected.
    return new Promise(function(res, rej) { // return Promise-B.

      // We need to create a wrapper around the original callback (the
      // one given to the "addThen" function) in order to inspect its
      // return value.  The original callback is allowed to return a
      // new promise (we'll call that Promise-C).  If the callback
      // does indeed return a promise (Promise-C) then it needs to be
      // linked with Promise-B.
      //
      // This will successfully link Promise-A, Promise-B, and
      // Promise-C in a way that looks like this:
      //
      // +---+  resolve  +---+ resolve  +---+
      // | A |---------->| C |--------->| B |
      // +---+           +---+          +---+
      //   |               \   reject     /
      //   |               `-------------'
      //   |  reject             |
      //   `---------------------'
      //
      // The rules are:
      //
      //   1. If Promise-A *and* Promise-C resolve, then resolve Promise-B.
      //
      //   2. If Promise-A *or* Promise-C reject, then reject Promise-B.
      //
      // Our wrapper function will only be invoked when Promise-A is
      // resolved.  See below when "wrapper" is registered as a
      // success handler on Promise-A.
      var wrapper = function(value) {
        // Step 1: Call the original callback.
        var result = callback(value);

        // Step 2: If the original callback returned a promise
        // (Promise-C) then link it with Promise-B.
        if (result instanceof Promise) {
          // result is Promise-C.
          result.then(res);  // if Promise-C resolves then resolve Promise-B.
          result.catch(rej); // if Promise-C rejects  then reject  Promise-B.
        } else {
          // If the callback's return value isn't a promise then there
          // will be no Promise-C to work with.  Therefore,
          // immediately resolve Promise-B.
          res(value);
        }
      }; // End wrapper function definition.

      // If Promise-A rejects then reject Promise-B.
      self.addCatch(rej);

      // If Promise-A resolves then call the wrapper function which
      // has to deal with Promise-C.
      successHandlers.push(wrapper);
      if (resolved) wrapper(resolvedValue);

    }); // return Promise-B.
  };

  // Call the executor function which can resolve or reject Promise-A.
  executor(resolve, reject);
}; // End Promise-A.

Promise.prototype = {
  // Invoke callback when the promise is resolved.  Should return a
  // new promise.  Should chain promises if the callback returns a
  // promise.
  then: function(callback) {
    return this.addThen(callback);
  },

  // Invoke the callback when the promise is rejected.  Should return
  // a new promise.  Should chain promises if the callback returns a
  // promise.
  catch: function(callback) {
    return this.addCatch(callback);
  },
};
