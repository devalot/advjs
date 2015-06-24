require("../www/discography/js/models/artist.js");

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var artist = {name: "The Wombats"};
      response.responseText = JSON.stringify(artist);

      Artist.fetchOne(1, function(record) {
        expect(record.name).toEqual(artist.name);
        done(); // Make sure to call `done' last.
      });
    });
  });
});
