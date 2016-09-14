require("../www/discography/js/lib/model.js");
require("../www/discography/js/models/artist.js");
require("../www/discography/js/lib/ajax.js");
require("../www/discography/js/lib/promise.js");

/******************************************************************************/
//
// Jasmine Docs: https://jasmine.github.io/2.4/introduction.html
//
/******************************************************************************/

describe("Artist model interface", function() {
  it("fetchOne should provide one artist", function(done) {
    // Some test data:
    var artist = {name: "The Wombats"};

    // Pretend the server responded with the above object:
    ajaxSpy('get', artist);

    // Call into the Artist model:
    Artist.fetchOne(1).then(function(record) {
      expect(record.name).toEqual(artist.name);
      expect(record.save).toBeDefined();
      done(); // Make sure to call `done' last.
    }).catch(function() {
      done.fail("shouldn't have failed");
    });
  });

  it("should respond with an array when calling fetchAll", function(done) {
    var fakeArtists = [
      {name: "Prince"},
      {name: "The Avalanches"},
    ];

    ajaxSpy('get', fakeArtists);

    Artist.fetchAll().then(function(artists) {
      expect(artists.length).toBe(fakeArtists.length);
      expect(artists[0].name).toBe(fakeArtists[0].name);
      expect(artists[0] instanceof Artist).toBeTruthy();
      done();
    }).catch(function() {
      done.fail("promise was rejected");
    });
  });

  it("should get an ID when calling save", function(done) {
    var name = "IAMX";
    var artist = new Artist({name: name});

    ajaxSpy('post', {name: name, id: 42});

    artist.save().then(function() {
      expect(artist.id).toBe(42);
      expect(artist.name).toBe(name);
      done();
    }).catch(function() {
      done.fail("save failed");
    });
  });
});
