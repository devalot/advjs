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
  describe("generic functions", function() {
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

    it("fetchAll should provide an array of artists", function(done) {
      var fakes = [
        {name: "Yeasayer"},
        {name: "Bat for Lashes"},
      ];

      ajaxSpy('get', fakes);

      Artist.fetchAll().
        then(function(artists) {
          expect(artists.length).toBe(fakes.length);
          artists.forEach(function(a) {
            expect(a instanceof Artist).toBeTruthy();
          });
          expect(artists[0].name).toBe(fakes[0].name);
          done();
        }).
        catch(function(e) {
          done.fail(e);
        });
    });
  });

  describe("prototype methods", function() {
    it("should create a new record when calling save", function(done) {
      var fake = {name: "IAMX", id: 42};
      ajaxSpy('post', fake);

      var artist = new Artist({name: fake.name});

      artist.save().then(function() {
        expect(artist.id).toBe(fake.id);
        done();
      }).catch(function(e) {
        done.fail(e);
      });
    });
  });
});
