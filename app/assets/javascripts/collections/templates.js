Verlag.Collection.Templates = Backbone.Collection.extend({
  
  model: Verlag.Model.Template,

  url: '/api/v1/templates',
  
  findByKlass: function(klass){
    return this.filter(function(template){
      return template.get('klass') === klass;
    });
  }

  
});
