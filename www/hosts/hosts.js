/*
 * Hosts Exercise:
 *
 * Using an IIFE, change the `Hosts' variable below so that it becomes
 * an object.  The object should have four (4) properties that are all
 * functions:
 *
 *   add(name, address) - A function that takes two arguments, a host
 *                        name and an IP address.  The function should
 *                        record that the given host has the specified
 *                        IP address.
 *
 *  lookupByName(name)  - A function that returns all IP addresses
 *                        associated with the given host name.  If the
 *                        given name has not been recorded by a call
 *                        to `add' then this function should return an
 *                        empty array.
 *
 *  lookupByIP(address) - A function that returns all host names that
 *                        were recorded with the specified IP address.
 *                        If the specified IP address does not have
 *                        any host names associated with it then this
 *                        function should return an empty array.
 *
 *  clear()             - A function that removes all host names and
 *                        IP addresses from the Hosts object.
 *
 * Notes:
 *
 *  - Do not introduce any new global variables.  The `Hosts` variable
 *    is the only allowed global variable.
 *
 *  - Run the tests using the following command:
 *
 *        node bin/jasmine spec/hosts.spec.js
 *
 *  - Look at the spec file for clarification of the requirements
 *    listed above.  The spec file is: spec/hosts.spec.js
 *
 *
 * Bonus Exercise:
 *
 * When your tests are passing, try adding the following
 * functionality:
 *
 * Using the `Object.defineProperty' function, add a new property to
 * the API called `length'.  The `length' property should be dynamic
 * and should equal the total number of entries stored in the `Hosts'
 * object.  This property SHOULD NOT be a function, and it must be
 * enumerable.  (Hint: look at the `get' property descriptor.)
 *
 * For example, if the `Hosts' object has three (3) host names and
 * five (5) IP addresses then the `length' property should be eight
 * (8).
 *
 * Make sure your tests still pass.
 */
Hosts = (function() {
  // Use an object as a lookup table.  The property names will be the
  // host names and the property values will be arrays of IP addrs.
  //
  // In ES6 you would probably want to use a Map instead.
  var table = {};

  var api = {
    add: function(name, address) {
      if (!table.hasOwnProperty(name)) table[name] = [];
      table[name].push(address);
    },

    lookupByName: function(name) {
      return table[name] || [];
    },

    lookupByIP: function(address) {
      var hosts = [];

      for (var name in table) {
        var index = table[name].indexOf(address);
        if (index >= 0) hosts.push(name);
      }

      return hosts;
    },

    clear: function() {
      table = {};
    },
  };

  Object.defineProperty(api, "length", {
    enumerable: true,

    get: function() {
      return Object.keys(table).reduce(function(sum, name) {
        return sum + table[name].length + 1;
      }, 0);
    },
  });

  return api;
})();
