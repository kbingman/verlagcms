Verlag.Model.User = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  url: function() {
    return '/admin/users/' + this.id + '.json';
  },
  
  initialize: function() {
    
  },
  
  is_admin: function(){
    return this.get('role').id >= 100;
  },
  
  is_super_user: function(){
    return this.get('role').id >= 101;
  }
  
  
});
