View = (function() {

  // Get a template based on its ID.
  var get = function(templateID) {
    var script = document.getElementById(templateID);
    return script && script.innerHTML;
  };

  // Render a single object using the given a template.
  // Mustache API Docs: https://github.com/janl/mustache.js
  var render = function(template, object) {
    return Mustache.render(template, object);
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
