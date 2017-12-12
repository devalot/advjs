describe("testing time-based logic", function() {
  var inFiveSeconds = function(callback) {
    setTimeout(callback, 5000);
  };

  var everyFiveSeconds = function(callback) {
    setInterval(callback, 5000);
  };

  // <<: set-up
  var timedFunction;

  beforeEach(function() {
    timedFunction = jasmine.createSpy("timedFunction");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  // :>>

  // <<: setTimeout
  it("function that uses setTimeout", function() {
    inFiveSeconds(timedFunction);

    // The callback shouldn't have been called yet:
    expect(timedFunction).not.toHaveBeenCalled();

    // Move the clock forward and trigger timeout:
    jasmine.clock().tick(5001);

    // Now it's been called:
    expect(timedFunction).toHaveBeenCalled();
  });
  // :>>

  // <<: setInterval
  it("function that uses setInterval", function() {
    everyFiveSeconds(timedFunction);

    // The callback shouldn't have been called yet:
    expect(timedFunction).not.toHaveBeenCalled();

    // Move the clock forward a bunch of times:
    for (var i=0; i<10; ++i) jasmine.clock().tick(5001);

    // It should have been called 10 times:
    expect(timedFunction.calls.count()).toEqual(10);
  });
  // :>>
});
