View = (function() {
  // Cache some values;
  var element = document.getElementById("view");
  var nextStep = null;

  // Add an event handler:
  element.addEventListener("click", function(event) {
    if (nextStep) nextStep(event);
  });

  // Fetch a template based on its ID from the HTML page.  Return the
  // text content of the template without rendering it.
  var get = function(templateID) {
    var template = document.getElementById(templateID);

    if (template) {
      return template.innerHTML;
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
    var template = get(templateID);
    element.innerHTML = render(template, object);
  };

  // Record the next step (where to go when clicking in the view).
  var next = function(callback) {
    nextStep = callback;
  };

  return {
    get:    get,
    render: render,
    set:    set,
    next:   next,
  };
})();
