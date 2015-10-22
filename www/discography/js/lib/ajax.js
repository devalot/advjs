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
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();

      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText || "null"));
        } else {
          reject("ajax request failed with: " + request.status);
        }
      });

      request.addEventListener("error", function() {
        reject("ajax call failed, network down?");
      });

      request.open(method, url);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(data && JSON.stringify(data));
    });
  };

  // HTTP GET (Fetch resource).
  var get = function(url) {
    return raw(url, "GET", null);
  };

  // HTTP POST (Create new resource).
  var post = function(url, data) {
    return raw(url, "POST", data);
  };

  // HTTP PATCH (Update existing resource).
  var patch = function(url, data) {
    return raw(url, "PATCH", data);
  };

  // HTTP DELETE (Delete existing resource).
  var destroy = function(url) {
    return raw(url, "DELETE", null);
  };

  // Public interface here:
  return {
    get:     get,
    post:    post,
    patch:   patch,
    destroy: destroy,
  };
})();
