Verlag.Model.Template = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/templates/' + this.id + '.json';
  // }
  
  urlRoot: '/api/v1/templates',
  
  adminPath: function(){
    return '/admin/templates/' + this.id 
  }
  
  
});
