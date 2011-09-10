var Users = Sammy(function (app) {
  
  var context = this; 
  
  this.debug = false;
  this.disable_push_state = true;  
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache); 
  this.use(Sammy.NestedParams);  
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({  
    // Checks for loaded pages, renders the tree, then executes the callback   
    loadUsers: function(callback){  
      var application = this; 
      
      if(User.all().length == 0 ){
        User.load(function(){  
          if(callback){ callback.call(this); }     
        });
      } else {        
        if(callback){ callback.call(this); } 
      }
    },
    
    renderUserIndex: function(callback){  
      var application = this;    
      var userIndex = application.render('/templates/admin/users/index.mustache', User.toMustache());
      userIndex.replace('#editor').then(function(){
        if(callback){ callback.call(this); }  
      });
    }
  });

  this.bind('run', function () {
    context.modal = false;
    context.refresh_pages = true; 
  }); 
  
  // User Index
  // ---------------------------------------------
  this.get('#/users', function(request){ 
    Galerie.close();  
    jQuery('#editor').html('<h1 class="section">Users</div>'); 

    request.loadUsers(function(){  
      request.renderUserIndex();
    });
  }); 
  
  // New User 
  // --------------------------------------------- 
  this.get('#/users/new', function(request){   
    request.loadUsers(function(){    
      if (!jQuery('#modal').length){ Galerie.open(); }  
      var new_user = request.render('/templates/admin/users/new.mustache');
      new_user.replace('#modal');  
      request.renderUserIndex();
    });
  }); 
  
  // Create User
  // ---------------------------------------------  
  this.post('#/users', function(request){
    var attributes = request.params['user'];  
    var user = new User(request.params['user']);
    
    user.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{  
        request.redirect('#/users'); 
      }
    });
  });
  
  // Edit Users
  // ---------------------------------------------
  this.get('#/users/:id/edit', function(request){ 
    request.loadUsers(function(){  
      user = User.find(request.params['id']); 
      var users_list = jQuery('#users');
      if(!users_list.length){
        request.renderUserIndex(function(){
          jQuery('.user-form').html('');
          var editUser = request.render('/templates/admin/users/edit.mustache', { user: user.asJSON() });
          editUser.replace('#user-form-' + user.id());
        });
      } else {
        jQuery('.user-form').html('');
        var editUser = request.render('/templates/admin/users/edit.mustache', { user: user.asJSON() });
        editUser.replace('#user-form-' + user.id());
      } 
    });
  });
  
  // Update Users
  // ---------------------------------------------
  this.put('#/users/:id', function(request){ 
    var user = User.find(request.params['id'])

    user.attr(request.params['user']);   
    user.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{  
        request.redirect('#/users'); 
      }
    });
  });
  
  
 
  
});