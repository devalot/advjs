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

  it("should promise an array from fetchAll", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      // Set up fake data for testing:
      var fakeArtists = [
        {name: "Cut Copy",   id: 1},
        {name: "Miike Snow", id: 2},
      ];

      // Pretend the server responded with:
      response.responseText = JSON.stringify(fakeArtists);

      // Test to see if Artist.fetchAll works:
      Artist.fetchAll().then(function(artists) {
        expect(Array.isArray(artists)).toBe(true);
        expect(artists.length).toBe(2);
        /* Add more expectations here */
        done();
      });
    });
  });

  it("create then save should record the object", function(done) {
    XMLHttpRequest.withResponse(function(response) {
      // Need a record the server will respond with:
      var fakeArtist = {name: "Elvis", id: 15};

      // Fake the server response:
      response.responseText = JSON.stringify(fakeArtist);

      // Now test the create+save:
      var artist = Artist.create({name: "Elvis"});

      artist.save().then(function() {
        expect(artist.id).toBe(15);
        done();
      });
    });
  });
});
