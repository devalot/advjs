/******************************************************************************/
// <<: string
var s = "Hello World".split(/\s+/).reverse().join(" ");
console.log(s); // ?
// :>>

/******************************************************************************/
// <<: this
var weather = (function() {
  var windSpeed     = 0,
      windDirection = 0,
      temp          = 0;

  return {
    windSpeed: function(x) {
      windSpeed = x;
      return this;
    },
    windDirection: function(x) {
      windDirection = x;
      return this;
    },
    temp: function(x) {
      temp = x;
      return this;
    },
    toString: function() {
      return "WS: " + windSpeed     + " " +
             "WD: " + windDirection + " " +
             "T: "  + temp;
    },
  };
})();

weather.windSpeed(10).windDirection(90).temp(95);
console.log(weather.toString());
// :>>
