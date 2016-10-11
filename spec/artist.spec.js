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
      expect(record instanceof Artist).toBeTruthy();
      done(); // Make sure to call `done' last.
    }).catch(function() {
      done.fail("shouldn't have failed");
    });
  });

  it("fetchAll should return an array of artists", function(done) {
    var fakes = [
      {name: "Prince"},
      {name: "Phantogram"},
    ];

    ajaxSpy("get", fakes);

    Artist.fetchAll().then(function(artists) {
      expect(Array.isArray(artists)).toBeTruthy();
      expect(artists.length).toBe(2);
      expect(artists[0] instanceof Artist).toBeTruthy();
      expect(artists[0].name).toBe("Prince");
      done();
    }).catch(function(e) {
      done.fail("failed with: " + e);
    });
  });

  it("save should pick up an ID", function(done) {
    var fake = {name: "M83", id: 42};
    ajaxSpy("post", fake);

    var artist = new Artist({name: fake.name});

    artist.save().then(function(other) {
      expect(other).toBe(artist);
      expect(artist.id).toBe(fake.id);
      done();
    }).catch(function(e) {
      done.fail("rejected with: " + e);
    });
  });
});
