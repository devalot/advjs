ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    // 1. Load all artists
    Artist.fetchAll().then(function(artists) {
      // 2. Render them into the view
      View.set("artists-tmpl", {artists: artists});
      document.getElementById("artists").
        addEventListener("click", function(e) {
          var id = e.target.getAttribute("data-artist-id");
          if (id) show(id);
        });
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).then(function(artist) {
      View.set("show-tmpl", artist);
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
