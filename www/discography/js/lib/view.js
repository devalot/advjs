View = (function() {

  // Fetch a template based on its ID from the HTML page.  Return the
  // text content of the template without rendering it.
  var get = function(templateID) {
    var node = document.getElementById(templateID);

    if (node) {
      return node.innerHTML;
    } else {
      return "MISSING TEMPLATE: " + templateID;
    }
  };

  // Render a single object using the given template.
  // Mustache API Docs: https://github.com/janl/mustache.js
  var render = function(template, object) {
    return Mustache.render(template, object);
  };

  // Given a template ID and an object, fetch the template, render it,
  // and insert its text into the HTML page.  Place the rendered
  // template text into the `<div id="view"></div>' section of
  // index.html.
  var set = function(templateID, object) {
    var template   = get(templateID);
    var view       = document.getElementById("view");
    view.innerHTML = render(template, object);
  };

  return {
    get:    get,
    render: render,
    set:    set,
  };
})();
