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
  describe("Generic functions", function() {
    it("fetchOne should provide one artist", function(done) {
      // Some test data:
      var record = {name: "The Wombats"};

      // Pretend the server responded with the above object:
      ajaxSpy('get', record);

      // Call into the Artist model:
      Artist.fetchOne(1).then(function(artist) {
        expect(artist.name).toEqual(record.name);
        expect(artist.save).toBeDefined();
        done(); // Make sure to call `done' last.
      }).catch(function() {
        done.fail("shouldn't have failed");
      });
    });

    it("fetchAll should return an array of artists", function(done) {
      var fakes = [
        {name: "Lorde"},
        {name: "Phantogram"}
      ];

      ajaxSpy('get', fakes);

      Artist.fetchAll().then(function(artists) {
        expect(artists instanceof Array).toBeTruthy();
        expect(artists.length).toBe(fakes.length);
        expect(artists[0].name).toBe(fakes[0].name);
        done();
      }).catch(function(error) {
        done.fail(error);
      });
    });
  });

  describe("Prototype functions", function() {
    it("save picks up the new ID from the database", function(done) {
      var record = {name: "The Presets", id: 42};
      ajaxSpy('post', record);

      var artist = new Artist({name: record.name});
      expect(artist.id).toBeUndefined();

      artist.save().then(function() {
        expect(artist.id).toBe(record.id);
        done();
      }).catch(function() {
        done.fail("save failed!");
      });
    });
  });
});
