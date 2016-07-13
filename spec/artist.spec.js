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
    XMLHttpRequest.withResponse(function(response) {
      var record = {name: "The Wombats"};
      response.responseText = JSON.stringify(record);

      Artist.fetchOne(1).then(function(artist) {
        expect(artist instanceof Artist).toBeTruthy();
        expect(artist.name).toBe(record.name);
        expect(artist.save).toBeDefined();
        done(); // Make sure to call `done' last.
      });
    });
  });
});
