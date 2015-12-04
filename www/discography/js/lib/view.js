View = (function() {

  // Fetch a template based on its ID from the HTML page.  Return the
  // text content of the template without rendering it.
  var get = function(templateID) {
    var template = document.getElementById(templateID);

    if (template) {
      return template.innerHTML;
    } else {
      return "INVALID TEMPLATE ID!";
    }
  };

  // Render a single object using the given a template and return the
  // rendered output.  Mustache API Docs:
  // https://github.com/janl/mustache.js
  var render = function(template, object) {
    return Mustache.render(template, object);
  };

  // Given a template ID and an object, fetch the template, render it,
  // and insert its text into the HTML page.  Place the rendered
  // template text into the `<div id="view"></div>' section of
  // index.html.
  var set = function(templateID, object) {
    var view     = document.getElementById("view"),
        template = get(templateID);

    view.innerHTML = render(template, object);
  };

  return {
    get:    get,
    render: render,
    set:    set,
  };
})();
