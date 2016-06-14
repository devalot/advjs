ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    Artist.fetchAll().
      then(function(artists) {
        var toRender = {
          artists: artists
        };

        View.set("all-artists", toRender);

        View.next(function(event) {
          if (event.target.classList.contains("artist-show")) {
            // Artist name clicked.
            var tr = event.target.parentNode;
            while (tr.tagName !== "TR") tr = tr.parentNode;

            var id = tr.getAttribute("data-artist-id");
            if (id) show(id);
          }
        });
      });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).
      then(function(artist) {
        View.set("show-artist", artist);
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
