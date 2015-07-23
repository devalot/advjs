function Car (color) {
  var newCar = {
    color: color
  };

  return newCar;
}

var toyota = Car("brown");

function Truck (color) {
  var newTruck = Object.create(Truck.prototype);
  newTruck.color = color;
  return newTruck;
}

var chevy = Truck("green");
