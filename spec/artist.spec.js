require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");
require("../www/discography/js/lib/model.js");
require("../www/discography/js/models/artist.js");

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
      // Mock out the response from the server.
      var artists = [
        {name: "The FooBars"},
        {name: "Ajax is Cool"},
      ];

      response.responseText = JSON.stringify(artists);

      Artist.fetchAll().then(function(records) {
        // Test some expectations here...
        expect(records.length).toBe(artists.length);
        expect(records[0].name).toBe(artists[0].name);
        done();
      });
    });
  });

  describe("saving an artist", function() {
    it("should create a new record if id is undefined", function(done) {
      XMLHttpRequest.withResponse(function(response) {
        response.responseText =
          JSON.stringify({id: 10, name: "Happy Kids"});

        var artist = Artist.create({name: "The Foobars"});

        artist.save().then(function() {
          expect(response.requestMethod).toBe("POST");
          expect(response.requestURL).toBe("/api/artists");
          expect(artist.id).toBe(10);
          expect(artist.name).toBe("Happy Kids");
          done();
        });
      });
    });

    it("should update an existing record if id is defined", function(done) {
      XMLHttpRequest.withResponse(function(response) {
        response.responseText =
          JSON.stringify({id: 10, name: "The Knife"});

        var artist = Artist.create({id: 10, name: "The Knife"});

        artist.save().then(function() {
          expect(response.requestMethod).toBe("PATCH");
          expect(response.requestURL).toBe("/api/artists/10");
          expect(artist.id).toBe(10);
          expect(artist.name).toBe("The Knife");
          done();
        });
      });
    });
  });
});
