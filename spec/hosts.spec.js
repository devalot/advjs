require("../www/hosts/hosts.js");

describe("Hosts", function() {
  var hosts = null;

  /****************************************************************************/
  beforeEach(function() {
    expect(Hosts).toBeDefined();

    Hosts.clear();

    Hosts.add("localhost", "127.0.0.1");
    Hosts.add("myname",    "127.0.0.1");
    Hosts.add("foobar",    "192.168.1.2");
    Hosts.add("foobar",    "192.168.1.3");
  });

  /****************************************************************************/
  it("lookupByName should return an array on empty query", function() {
    var result = Hosts.lookupByName("shouldbeempty");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  /****************************************************************************/
  it("lookupByName should return multiple IP addresses", function() {
    var result = Hosts.lookupByName("foobar");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result).toEqual(jasmine.arrayContaining(["192.168.1.2"]));
    expect(result).toEqual(jasmine.arrayContaining(["192.168.1.3"]));
  });

  /****************************************************************************/
  it("lookupByIP should return an array on empty query", function() {
    var result = Hosts.lookupByIP("0.0.0.0");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  /****************************************************************************/
  it("lookupByIP should result multiple names", function() {
    var result = Hosts.lookupByIP("127.0.0.1");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result).toEqual(jasmine.arrayContaining(["localhost"]));
    expect(result).toEqual(jasmine.arrayContaining(["myname"]));
  });

  /****************************************************************************/
  it("should have the correct API", function() {
    var names = ["clear", "add", "lookupByName", "lookupByIP"];
    var keys = Object.keys(Hosts);

    if ("length" in Hosts) names.push("length");
    expect(keys.length).toBe(names.length);
    expect(keys).toEqual(jasmine.arrayContaining(names));
  });

  /****************************************************************************/
  // Bonus Question:
  if ("length" in Hosts) {
    it("length should return correct number of entries", function() {
      // Should be 3 from the `beforeEach' call.
      expect(Hosts.length).toBe(3);

      // Should not change.
      Hosts.add("localhost", "0.0.0.0");
      expect(Hosts.length).toBe(3);

      // Now it should change.
      Hosts.add("nixos.org", "1.1.1.1");
      expect(Hosts.length).toBe(4);
    });
  }
});
