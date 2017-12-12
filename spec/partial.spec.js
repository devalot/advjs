/******************************************************************************/
require("../www/partial/partial.js");

/******************************************************************************/
describe("Partial Function Application", function() {

  /****************************************************************************/
  it("should allow partial function application", function() {
    var add = function(x, y) { return x + y; };
    var add10 = add.partial(null, 10);
    expect(add10 instanceof Function).toBeTruthy();
    expect(add10(2)).toBe(12);
  });

  /****************************************************************************/
  it("should pass `this' through", function() {
    // <<: obj.add
    var obj = {
      magnitude: 10,

      add: function(x, y) {
        return (x + y) * this.magnitude;
      },
    };
    // :>>

    // <<: add10
    var add10 = obj.add.partial(obj, 1);
    add10(2); // Should return 30
    // :>>

    expect(add10 instanceof Function).toBeDefined();
    expect(add10(2)).toBe(30);
  });

});
