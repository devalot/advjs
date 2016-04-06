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

  it("fetchAll should provide an array of artists", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var fakeArtists = [
        {name: "Goldfrapp"},
        {name: "Zero 7"},
      ];

      response.responseText = JSON.stringify(fakeArtists);

      Artist.fetchAll().
        then(function(artists) {
          expect(artists.length).toBe(2);
          expect(artists[0].save).toBeDefined();
          done();
      }).catch(function() {
        throw("fetchAll promise failed!");
      });
    });
  });

  it("should allow saving a new record", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var fakeArtist = {name: "Tycho", id: 42};
      response.responseText = JSON.stringify(fakeArtist);

      var artist = Artist.create({name: "Tycho"});
      artist.save().then(function() {
        expect(response.requestMethod).toBe("POST");
        expect(artist.id).toBe(fakeArtist.id);
        done();
      });
    });
  });

  it("should allow updating an existing object", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      var fakeArtist = {name: "Major Lazer", id: 42};
      response.responseText = JSON.stringify(fakeArtist);

      var artist = Artist.create(fakeArtist);
      expect(artist.save).toBeDefined();

      artist.save().then(function() {
        expect(response.requestMethod).toBe("PATCH");
        expect(response.requestURL).toBe("/api/artists/42");
        done();
      });
    });
  });
});
