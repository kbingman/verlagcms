Verlag.Model.User = Backbone.Model.extend({
  
  urlRoot: '/api/v1/users',
  
  isAdmin: function(){
    return this.get('role').id >= 100;
  },
  
  isSuperUser: function(){
    return this.get('role').id >= 101;
  },
  
  adminPath: function(){
    return '/admin/folders/' + this.id 
  }
  
});
