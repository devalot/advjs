View = (function() {

  // Get a template based on its ID.
  var get = function(templateID) {
  };

  // Render a single object using the given a template.
  // Mustache API Docs: https://github.com/janl/mustache.js
  var render = function(template, object) {
  };

  // Render an array of objects using the given a template.
  var renderAll = function(template, objects) {
    return objects.map(function(e) {
      return render(template, e);
    }).join(" ");
  };

  return {
    get:       get,
    render:    render,
    renderAll: renderAll,
  };
})();
