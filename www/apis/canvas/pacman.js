Pacman = function() {
  this.canvas  = document.getElementById("pacman");
  this.context = this.canvas.getContext("2d");
  this.canvas.style.background = "#000000";

  this.width  = this.canvas.width;
  this.height = this.canvas.height;
  this.radius = 20.0;

  this.y      = this.height / 2.0;
  this.x      = 0.0;
  this.xInc   = 1.8;

  this.arc     = 0.0;
  this.arcStep = 0.0;
  this.arcInc  = 0.2;
  this.arcMax  = Math.PI / 4;

  this.dotSpacing = this.width / 10;

  this.next();
};

Pacman.prototype = {
  // Draw all parts of the canvas.
  draw: function() {
    this.update();
    this.context.clearRect(0, 0, this.width, this.height);

    this.dots();
    this.pacman();

    this.next();
  },

  // Draw some dots for pacman to eat.
  dots: function() {
    this.context.beginPath();

    for (var x=this.dotSpacing; x < this.width; x += this.dotSpacing) {
      if (x > this.x || this.x - this.dotSpacing * 2 > x) {
        this.context.arc(x, this.y, 4, 0, Math.PI * 2, false);
      }
    }

    this.context.fillStyle = "white";
    this.context.fill();
  },

  // Pacman himself.
  pacman: function() {
    var cirA = this.arc,
        cirB = Math.PI * 2 - this.arc;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, cirA, cirB, false);
    this.context.lineTo(this.x - this.radius/2.1, this.y);
    this.context.fillStyle = "yellow";
    this.context.fill();
  },

  // Update pacman location and mouth position.
  update: function() {
    if (this.x - this.radius >= this.width) {
      this.x = this.radius * -2;
    } else {
      this.x += this.xInc;
    }

    this.arc = Math.sin(this.arcStep) * this.arcMax;
    this.arcStep += this.arcInc;
  },

  // Request another animation frame.
  next: function() {
    window.requestAnimationFrame(this.draw.bind(this));
  },

};
