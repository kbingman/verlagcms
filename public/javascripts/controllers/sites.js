Sites = Sammy(function (app) {
  
  var application = this; 
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache); 
  this.use(Sammy.NestedParams);  
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({  
    // Checks for loaded pages, renders the tree, then executes the callback   
    loadSites: function(callback){  
      var application = this; 
      
      if(Site.all().length == 0 ){
        Site.load(function(){  
          if(callback){ callback.call(this); }     
        });
      } else {        
        if(callback){ callback.call(this); } 
      }
    },
    
    renderIndex: function(){  
      var application = this;    
      var siteIndex = application.render('/templates/admin/sites/index.mustache', Site.toMustache());
      siteIndex.replace('#sidebar');
    }
  });

  this.bind('run', function () {
    application.modal = false; 
    application.first_run = true;  
  }); 
  
  // Site Index
  // ---------------------------------------------
  this.get('#/sites', function(request){
    
    Galerie.close(); 
    request.loadSites(function(){  
      request.renderIndex();
    });
  });  
  
  // New Site 
  // --------------------------------------------- 
  this.get('#/sites/new', function(request){ 
    request.loadSites(function(){    
      if ($('#modal').length == 0){ Galerie.open(); }  
      var newSite = request.render('/templates/admin/sites/new.mustache');
      newSite.replace('#modal');  
      request.renderIndex(Site.all());
    });
  }); 
  
  // Create Site
  // ---------------------------------------------  
  this.post('#/sites', function(request){
    var attributes = request.params['site'];  
      
    Site.create(attributes, { 
      success: function(){  
        request.redirect('#/sites'); 
        jQuery('.notice').text('Successfully saved template');
      },
      error: function(){    
        jQuery('.notice').text('errors creating template');
      }
    }); 
  });
  
});