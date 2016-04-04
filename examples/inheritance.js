/******************************************************************************/
// <<: new
var Rectangle = function(width, height) {
  this.width  = width;
  this.height = height;
};

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

var Square = function(width) {
  Rectangle.call(this, width, width);
  this.isSquare = true;
};

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.sideSize = function() {return this.width;};

var sq = new Square(10);
console.log(sq.area());
// :>>
