Verlag.Collection.Templates = Backbone.Collection.extend({
  
  model: Verlag.Model.Template,

  url: '/admin/templates',
  
  // url: function(folder_id){
  //   return '/admin/folders/' + folder_id + '/assets.json'
  // },

  initialize: function() {
  
  },
  
  find_by_klass: function(klass){
    return this.filter(function(template){
      return template.get('klass') === klass;
    });
  }

  
});
