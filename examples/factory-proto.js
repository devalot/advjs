function Car (color) {
  var newCar = Object.create(Car.prototype);

  newCar.color = color;

  return newCar;
}

Car.prototype = {
  goFast: function() {
    this.speed = 130;
  }
};

var toyota = Car("brown");
toyota.goFast();
