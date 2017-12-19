ArtistsController = (function(){

  var boot = function() {
    var match = location.hash.match(/^#(\d+)$/);

    if (match) {
      show(match[1]);
    } else {
      index();
    }
  };

  // Display all artists.
  var index = function() {
    Artist.fetchAll().
      then(function(artists) {
        View.set("artists-index", {artists: artists});
      });
  };

  // Display a single artist.
  var show = function(id) {
    Artist.fetchOne(id).
      then(function(artist) {
        View.set("artists-show", artist);
      });
  };

  // Display a form for creating a new artist.
  var form = function() {
  };

  // Taking values from a form, create a new artist.
  var create = function() {
  };

  // Receive notifications for URL changes.
  window.addEventListener("hashchange", boot);

  // Public interface:
  return {boot: boot};
})();
