ArtistsController = (function(){

  // Display all artists.
  var index = function() {
    // 1. Fetch all artists.
    Artist.fetchAll().then(function(artists) {
      // 2. Render the template.
      View.set("artists-index", {artists: artists});

      // 3. Make artist names links.
      // (See template.)

      // 4. Listen for clicks on artist names.
      var ul = document.getElementById("artists-list");
      ul.addEventListener("click", function(e) {
        // 5. Call show() with the clicked artist ID.
        var id = e.target.getAttribute("data-artist-id");
        if (id) show(id);
      });
    });
  };

  // Display a single artist.
  var show = function(id) {
    // 6. Display all information about the artist
    //    with the given ID.
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
