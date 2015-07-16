/******************************************************************************/
/*
 * All data coming in and going out will be converted to/from JSON.
 *
 * Promises should be resolved with response data from the server,
 * decoded from JSON.
 *
 * Hints:
 *
 * Set content type before sending a request:
 *
 *   req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 *
 * Send a data object as JSON:
 *
 *    req.send(JSON.stringify(data));
 *
 * Parse an incoming JSON string:
 *
 *   var data = JSON.parse(req.responseText || "null");
 *
 * Only resolve the promise if the (load) `status' code is >= 200 and
 * < 300.  Otherwise reject the promise.  Also reject the promise on
 * XHR failure (error).
 *
 */
Ajax = (function(){
  var raw = function(url, method, data) {
    // Return a promise.
  };

  // HTTP GET (Fetch resource).
  var get = function(url) {
  };

  // HTTP POST (Create new resource).
  var post = function(url, data) {
  };

  // HTTP PATCH (Update existing resource).
  var patch = function(url, data) {
  };

  // HTTP DELETE (Delete existing resource).
  var destroy = function(url) {
  };

  // Public interface here:
  return {
    get:     get,
    post:    post,
    patch:   patch,
    destroy: destroy,
  };
})();
