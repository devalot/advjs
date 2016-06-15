require("../www/discography/js/lib/model.js");
require("../www/discography/js/models/artist.js");
require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var artist = {name: "The Wombats"};
      response.responseText = JSON.stringify(artist);

      Artist.fetchOne(1).then(function(record) {
        expect(record.name).toEqual(artist.name);
        expect(record.save).toBeDefined();
        done(); // Make sure to call `done' last.
      });
    });
  });

  it("fetchAll will return a promise that resolves to an array", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var artists = [
        {name: "Junior Boys"},
        {name: "IAMX"}
      ];

      // Pretend the server responded with this JSON:
      response.responseText = JSON.stringify(artists);

      Artist.fetchAll().then(function(records) {
        expect(Array.isArray(records)).toBe(true);
        expect(records.length).toBe(2);
        expect(records[0].name).toBe("Junior Boys");
        done();
      });
    });
  });

  it("save picks up new ID when saving new artist", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var serverVersion = {name: "Taylor Swift", id: 42};
      response.responseText = JSON.stringify(serverVersion);

      var newArtist = new Artist({name: serverVersion.name});

      newArtist.save().then(function() {
        expect(response.requestMethod).toBe("POST");
        expect(newArtist.name).toBe(serverVersion.name);
        expect(newArtist.id).toBe(serverVersion.id);
        done();
      });
    });
  });
});
