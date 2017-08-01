View = (function() {

  // Given a template ID and an object, fetch the template, render it
  // using Mustache, and insert its text into the HTML page.  Place
  // the rendered template text into the `<div id="view"></div>'
  // section of index.html.
  //
  // Mustache API Docs: https://github.com/janl/mustache.js
  var set = function(templateID, object) {
    var view = document.getElementById("view");
    var template = document.getElementById(templateID);

    if (!template) throw("bad template ID: " + templateID);
    view.innerHTML = Mustache.render(template.innerHTML, object);
  };

  // Return the public API.
  return {set: set};
})();
