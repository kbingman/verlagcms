var User = Model('user', function() {
  this.persistence(Model.SinatraREST, '/admin/users'), 
 
  this.include({

  }),  
  
  this.extend({    
    toMustache: function(query) {
      return {
        users: this.map(function(user){                           
          return user.attr() 
        })
      }
    } 
  });
  
});