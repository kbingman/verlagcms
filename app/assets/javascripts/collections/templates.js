Verlag.Collection.Templates = Backbone.Collection.extend({
  
  model: Verlag.Model.Template,

  url: '/admin/templates',
  
  find_by_klass: function(klass){
    return this.filter(function(template){
      return template.get('klass') === klass;
    });
  }

  
});
