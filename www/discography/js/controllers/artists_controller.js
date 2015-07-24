ArtistsController = (function(){

  // Set the view.
  var setView = function(content) {
    var div = document.getElementById("view");
    div.innerHTML = content;
  };

  // Display all artists.
  var index = function() {
    Artist.fetchAll(function(artists) {
      var template = View.get("artists-template");
      var data = {artists: artists};
      setView(View.render(template, data));

      var table = document.getElementById("artists-table");

      table.addEventListener("click", function(e) {
        if (e.target.hasAttribute("data-artist-id")) {
          e.preventDefault();
          e.stopPropagation();
          show(e.target.getAttribute("data-artist-id"));
        }
      });
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id, function(artist) {
      var template = View.get("artist-template");
      setView(View.render(template, artist));
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
