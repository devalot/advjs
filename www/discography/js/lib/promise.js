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
 * calls all of the fulfillment (then) callbacks with the promised
 * value.
 *
 * If the executor function invokes its second argument (reject) it
 * must provide a reject value.  This rejects the promise and calls
 * all of the rejection (catch) callbacks with the reject value.
 *
 * Look at the test file for more usages examples:
 *
 *   spec/promise.spec.js
 *
 */
Promise = function(executor) {
  // 1. Initialize state of the promise (pending, resolved, rejected).
  var fulfilled = false, rejected = false;

  // 2. A place to store callbacks (success and error).
  var fulfillmentHandlers = [], rejectionHandlers = [];

  // 3. A place to store the promised value.
  var fulfilledValue = null, rejectedValue = null;

  // 4. The "resolve" function given to the executor function.  The
  // executor function will call this function with the promised value
  // if the asynchronous computation was successful.
  var resolveFunc = function(value) {
    if (fulfilled || rejected) return;
    fulfilled = true;
    fulfilledValue = value;
    fulfillmentHandlers.forEach(function(cb) {cb(value);});
  };

  // 5. The "reject" function given to the executor function.  The
  // executor function will call this function with the error value if
  // the asynchronous computation failed.
  var rejectFunc = function(value) {
    if (fulfilled || rejected) return;
    rejected = true;
    rejectedValue = value;
    rejectionHandlers.forEach(function(cb) {cb(value);});
  };

  // 6. A function that adds a handler to the fulfillmentHandlers
  // array.  If the promise has already been resolved then the handler
  // should be called immediately.
  var addFulfillmentHandler = function(handler) {
    if (fulfilled) { handler(fulfilledValue);           }
    else           { fulfillmentHandlers.push(handler); }
  };

  // 7. A function that adds a handler to the rejectionHandlers
  // array.  If the promise has already been rejected then the handler
  // should be called immediately.
  var addRejectionHandler = function(handler) {
    if (rejected) { handler(rejectedValue);          }
    else          { rejectionHandlers.push(handler); }
  };

  // 8. A slightly complicated bit of code that ensures promises are
  // chained (composed) correctly.
  this.addHandler = function(onFulfilled, onRejected) {
    return new Promise(function(resolve, reject) {
      var go = function(f) {
        return function(value) {
          var result = f ? f(value) : value;
          if (result === undefined) result = value;

          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            (f === onFulfilled ? resolve : reject)(result);
          }
        };
      };

      addFulfillmentHandler(go(onFulfilled));
      addRejectionHandler(go(onRejected));
    });
  };

  // 9. Call the executor function and give it the context necessary
  // to resolve or reject the function.
  executor(resolveFunc, rejectFunc);
};

Promise.prototype = {
  // Invoke callback when the promise is resolved.  Should return a
  // new promise.  Should chain promises if the callback returns a
  // promise.
  then: function(callbackF, callbackR) {
    return this.addHandler(callbackF, callbackR);
  },

  // Invoke the callback when the promise is rejected.  Should return
  // a new promise.  Should chain promises if the callback returns a
  // promise.
  catch: function(callback) {
    return this.addHandler(undefined, callback);
  },
};
