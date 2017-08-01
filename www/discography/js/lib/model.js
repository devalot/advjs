Model = function(fields) {
};

Model.constructor = function(model, fields) {
  var self = this;

  model.fields.forEach(function(field) {
    self[field] = fields[field];
  });
};

Model.fetchOne = function(model, id) {
  var url = model.baseURL + '/' + id;

  return Ajax.get(url).
    then(function(record) {
      return new model(record);
    });
};

Model.extend = function(attrs) {
  var model = function(fields) {
    Model.constructor.call(this, model, fields);
  };

  model.fields = attrs.fields;
  model.baseURL = attrs.baseURL;
  model.fetchOne = Model.fetchOne.bind(model, model);
  return model;
};

// Artist = Model.extend({
//   fields: ['id', 'name', 'formation_year', 'website'],
//   baseURL: '/api/artists',
// });
