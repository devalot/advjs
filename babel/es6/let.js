(function() {

  /****************************************************************************/
  // <<: Does this look familiar?
  for (let i=0; i<3; ++i) {
    setTimeout(function() {
      console.log(i);
    }, i*1000);
  }
  // :>>

})();
