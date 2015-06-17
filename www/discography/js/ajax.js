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
