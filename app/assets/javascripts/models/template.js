Verlag.Model.Template = Backbone.Model.extend({
  
  urlRoot: '/api/v1/templates',
  
  adminPath: function(){
    return '/admin/templates/' + this.id 
  }
  
  
});
