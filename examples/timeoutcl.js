// <<: timeout
// What will this output?
for (var i=0; i<3; i++) {
  setTimeout(function(){
    console.log(i);
  }, 1000*i);
}
console.log("Howdy!");
// :>>

// <<: new-scope
for (var i=0; i<5; ++i) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, j*1000);
  })(i);
}
// :>>
