require("../www/discography/js/lib/ajax.js");

describe("Ajax interface", function() {
  it("has a get method", function() {
    expect(Ajax.get).toBeDefined();
  });

  it("get method should invoke callback", function(done) {
    Ajax.get("/api/artists", function(objects) {
      done(); // Tell Jasmine we were called.
      expect(objects.length).toBeGreaterThan(0);
    });
  });
});
