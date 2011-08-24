Sites = Sammy(function (app) {
  
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
    
    renderUserIndex: function(){  
      var application = this;    
      var userIndex = application.render('/templates/admin/users/index.mustache', User.toMustache());
      userIndex.replace('#editor');
    }
  });

  this.bind('run', function () {
    context.modal = false;
    context.refresh_pages = true; 
  }); 
  
  // Site Index
  // ---------------------------------------------
  this.get('#/users', function(request){ 
    Galerie.close();  
    jQuery('#editor').html('<h1 class="section">Sites</div>'); 

    request.loadUsers(function(){  
      request.renderUserIndex();
    });
  }); 
  
  // Edit Site
  // ---------------------------------------------
  this.get('#/users/:id/edit', function(request){ 
    Galerie.close();  
    jQuery('#editor').html('<h1 class="section">Sites</div>'); 

    request.loadUsers(function(){  
      user = User.find(request.params['id']); 
      var editUser = request.render('/templates/admin/users/edit.mustache', { user: user.asJSON() });
      editUser.replace('#editor');  
      // request.renderUserIndex();
    });
  });
  
  // Update Site
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