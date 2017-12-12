/******************************************************************************/
// <<: string
var s = "Hello World".split(/\s+/).reverse().join(" ");
console.log(s); // ?
// :>>

/******************************************************************************/
// <<: this
var weather = (function() {
  var windSpeed = 0, windDirection = 0;

  return {
    windSpeed: function(x) {
      windSpeed = x;
      return this;
    },
    windDirection: function(x) {
      windDirection = x;
      return this;
    },
  };
})();

weather.windSpeed(10).windDirection(90);
// :>>

console.log(weather);
