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
  var rect = new Rectangle(width, width);
  rect.isSquare = true;
  return rect;
};

var sq = new Square(10);
console.log(sq.area());
// :>>

/******************************************************************************/
// <<: create
var Rectangle = function(width, height) {
  var rect = Object.create(Rectangle.prototype);
  rect.width  = width;
  rect.height = height;
  return rect;
};

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

var Square = function(width) {
  var rect = Rectangle(width, width);
  rect.isSquare = true;
  return rect;
};

var sq = Square(10);
console.log(sq.area());
// :>>
