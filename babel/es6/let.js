(function() {

  /****************************************************************************/
  // <<: Does this look familiar?
  for (let i=0; i<3; ++i) {
    setTimeout(function() {
      console.log(i);
    }, i*1000);
  }
  // :>>

  function test () {
    var a = [1, 2, 3];

    a.map(e => {
      console.log(arguments, this);
      return e + 1;
    });
  }

})();
