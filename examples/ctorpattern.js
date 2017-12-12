function Car (color) {
  this.color = color;
}

Car.prototype.goFast = function() {
  this.speed = 130;
};

var toyota = new Car("brown");
toyota.goFast();
