require("../www/discography/js/models/artist.js");

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    var artist = {name: "The Wombats"};
    XMLHttpRequest.fakeResponse = JSON.stringify(artist);

    Artist.fetchOne(1, function(record) {
      expect(record.name).toEqual(artist.name);
      done();
    });
  });
});
