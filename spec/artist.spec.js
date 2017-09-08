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
    var records = [
      {name: "INXS"},
      {name: "New Order"}
    ];

    ajaxSpy('get', records);

    Artist.fetchAll().
      then(function(artists) {
        expect(artists.length).toBe(records.length);

        // ES6: arrow functions make everything nicer:
        expect(artists.map(a => a.name)).
          toEqual(records.map(r => r.name));
        done();
      }).catch(function(error) {
        done.fail(error);
      });
  });

  describe("Artist.prototype.save", function() {
    it("should be assigned a database ID", function(done) {
      var record = {id: 42, name: "Major Laser"};
      var artist = new Artist({name: record.name});

      ajaxSpy('post', record);

      artist.save().
        then(function() {
          expect(artist.id).toBe(record.id);
          done();
        }).
        catch(function(error) {
          done.fail(error);
        });
    });
  });
});
