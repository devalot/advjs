var Car = function(color) {
  this.speed = 0;
  this.color = color;
};

Car.prototype.go = function() {
  this.speed = 100;
};

var toyota = new Car("blue");
console.log(toyota.speed);
toyota.go();
