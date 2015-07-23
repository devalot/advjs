function Car (color) {
  this.color = color;
}

Car.prototype.getColor = function () {
  return this.color;
};

var toyota = new Car("brown");
toyota.getColor();
