describe("a function", function() {
  // <<: beforeEach
  var foo;

  beforeEach(function() {
    foo = {
      plusOne: function(n) { return n + 1; },
    };
  });
  // :>>

  // <<: call
  it("should be called", function() {
    spyOn(foo, 'plusOne');
    var x = foo.plusOne(1);

    expect(foo.plusOne).toHaveBeenCalled();
    expect(x).toBeUndefined();
  });
  // :>>

  // <<: callThrough
  it("should call through and execute", function() {
    spyOn(foo, 'plusOne').and.callThrough();
    var x = foo.plusOne(1);

    expect(foo.plusOne).toHaveBeenCalled();
    expect(x).toBe(2);
  });
  // :>>
});
