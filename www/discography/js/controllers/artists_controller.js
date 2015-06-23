ArtistsController = (function(){

  // Helper function.
  var setView = function(html) {
    var view = document.
        getElementById("view");

    view.innerHTML = html;
  };

  // Display all artists.
  var index = function() {
    Artist.fetchAll(function(artists) {
      var inner = View.get("artists-inner");
      var outer = View.get("artists-outer");

      var rendered =
          View.renderAll(inner, artists);

      var view = View.render(outer, {
        artists: rendered
      });

      setView(view);

      // In the real world, you would let the routing engine in a
      // framework track the URL and switch to another controller
      // action.  Then your template would create a real link that is
      // intercepted by the routing engine.
      var table = document.getElementById("artists");
      table.addEventListener("click", function(event) {
        event.preventDefault();
        var id = event.target.getAttribute("data-artist-id");
        if (id) show(id);
      });
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id, function(artist) {
      var template = View.get("single-artist");
      var view = View.render(template, artist);
      setView(view);
    });
  };

  // Display a form for creating a new artist.
  var form = function() {
  };

  // Taking values from a form, create a new artist.
  var create = function() {
  };

  // Public interface:
  return {
    index:  index,
    show:   show,
    form:   form,
    create: create,
  };
})();
