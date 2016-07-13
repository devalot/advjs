/******************************************************************************/
// Artist constructor.  Given an object describing an artist, copy all
// of its local properties into `this'.
Artist = function(fields) {
  Model.call(this, "artists", fields);
};

/******************************************************************************/
// Should fetch a single artist via Ajax.  Return a promise that
// resolves to an instance of the Artist function.
//
// fetchOne :: ID -> Promise Artist
Artist.fetchOne = function(id) {
  return Model.fetchOne("artists", function(record) {
    return new Artist(record);
  }, id);
};


/******************************************************************************/
// Should fetch all artists via Ajax.  Return a promise that
// resolves to an array of Artist objects.
Artist.fetchAll =
  Model.fetchAll.bind(null, "artists", function(record) {
    return new Artist(record);
  });


/******************************************************************************/
Artist.prototype = Model.prototype;
