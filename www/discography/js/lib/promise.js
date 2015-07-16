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
  // 2. Need a place to store callbacks (success and error).
  // 3. Need a place to store the promised value.
  // 4. Need a place to store the rejected value.
};

Promise.prototype = {
  // Invoke callback when the promise is resolved.  Should return a
  // new promise.  Should chain promises if the callback returns a
  // promise.
  then: function(callback) {
  },

  // Invoke the callback when the promise is rejected.  Should return
  // a new promise.  Should chain promises if the callback returns a
  // promise.
  catch: function(callback) {
  },
};
