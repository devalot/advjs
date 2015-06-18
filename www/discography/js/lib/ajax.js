/******************************************************************************/
/*
 * All data coming in and going out will be converted to/from JSON.
 *
 * Callback functions are called with response data from the server,
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
 *   var data = JSON.parse(req.responseText);
 *
 * Only invoke the callback if the `status' code is >= 200 and < 300.
 *
 */
Ajax = (function(){
  var raw = function(url, method, data, callback) {
  };

  // HTTP GET (Fetch resource).
  var get = function(url, callback) {
  };

  // HTTP POST (Create new resource).
  var post = function(url, data, callback) {
  };

  // HTTP PATCH (Update existing resource).
  var patch = function(url, data, callback) {
  };

  // HTTP DELETE (Delete existing resource).
  var destroy = function(url, callback) {
  };

  // Public interface here:
  return {
    get:     get,
    post:    post,
    patch:   patch,
    destroy: destroy,
  };
})();
