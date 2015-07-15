var x = {color: "magenta"};
var y = {color: "orange" };

var z = function() {
  console.log("my color is: ", this.color);
};

x.log = y.log = z;

x.log();
y.log();
