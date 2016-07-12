/******************************************************************************/
// The Java Builder Pattern (adjusted for JavaScript)
var Builder = function(properties) {
  var constructor = function() {
    this.values = {};
  };

  var set = function(name) {
    return function(value) {
      this.values[name] = value;
      return this;
    };
  };

  for (var p in properties) {
    constructor.prototype[p] = set(p);
  }

  constructor.prototype.create = function(object) {
    for (var p in properties) {
      if (properties[p] && !this.values[p]) {
        throw(p + " is not allowed to be null or undefined");
      }

      object[p] = this.values[p];
    }
  };

  return constructor;
};

/******************************************************************************/
// Using it.
var Person = function(builder) {
  if (!(builder instanceof Person.Builder)) throw("not a builder!");
  builder.create(this);
};

Person.Builder = Builder({
  firstName:  true,             // Mandatory.
  lastName:   true,             // Mandatory.
  middleName: false,            // Optional.
  age:        false,            // Optional.
});

var builder = new Person.Builder();
builder.firstName("Peter").lastName("Jones");

var person = new Person(builder);
console.log(person);
