ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    // 1: Get all artists.
    Artist.fetchAll().then(function(artists) {
      // 2: Render the view.
      View.set("artists-index", {artists: artists});

      document.getElementById("artist-list").
        addEventListener("click", function(e) {
          var href = e.target.getAttribute("href");
          var m;

          if (href && (m = href.match(/\/artists\/(\d+)$/))) {
            show(parseInt(m[1]));
          }
        });
    });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).then(function(artist) {
      View.set("artists-show", artist);
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
