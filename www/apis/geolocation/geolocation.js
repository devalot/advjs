Geolocation = (function() {

  var get = function(element) {
    var missing = function() {element.innerHTML = "MISSING.";};
    var error   = function() {element.innerHTML = "ERROR!";   };

    if (!("geolocation" in navigator)) {
      return missing();
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
      element.innerHTML = "<p>" +
        pos.coords.latitude.toString()  + "<br/>" +
        pos.coords.longitude.toString() + "</p>";

      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" +
        pos.coords.latitude  + "," +
        pos.coords.longitude + "&zoom=13&size=300x300&sensor=false";

      element.appendChild(img);
    }, error);
  };

  // Public interface:
  return {get: get};
})();
