var Sites = Sammy(function (app) {
  
  var context = this; 
  
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
    
    renderSiteIndex: function(callback){  
      var application = this;    
      var siteIndex = application.load(jQuery('script#admin-sites-index')).interpolate(Site.toMustache(), 'mustache');
      siteIndex.replace('#editor').then(function(){
        if(callback){ callback.call(this); }   
      });
    }
  });
  
  // Site Preview
  // ---------------------------------------------
  this.get('#/preview', function(request){ 
    var host = document.location['hostname'];
    alert(host)
    window.open('/', 'preview');  
    // request.redirect('admin/#/');
  });
  
  // Site Index
  // ---------------------------------------------
  this.get('/admin/sites', function(request){ 
    context.refresh_pages = true;  
    jQuery('#editor').html('<h1 class="section">Sites</div>'); 

    request.loadSites(function(){  
      request.renderSiteIndex();
    });
  });  
  
  // New Site 
  // --------------------------------------------- 
  this.get('/admin/sites/new', function(request){   
    request.loadSites(function(){    
      if ($('#modal').length == 0){ Galerie.open(); }  
      var newSite = request.load(jQuery('script#admin-sites-new')).interpolate({}, 'mustache');
      newSite.replace('#modal');  
      request.renderSiteIndex(Site.all());
    });
  }); 
  
  // Create Site
  // ---------------------------------------------  
  this.post('/admin/sites', function(request){
    var attributes = request.params['site'];  
    var site = new Site(request.params['site']);
    
    site.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{  
        request.redirect('#/sites'); 
      }
    });  
  });  
  
  // Edit Site 
  // --------------------------------------------- 
  this.get('/admin/sites/:id/edit', function(request){  
       
    request.loadSites(function(){    
      site = Site.find(request.params['id']); 
      
      var list = jQuery('#sites');
      if(!list.length){
        request.renderSiteIndex(function(){
          jQuery('.site-form').html('');
          var html = request.load(jQuery('script#admin-sites-edit')).interpolate({ site: site.asJSON() }, 'mustache');
          html.replace('#site-form-' + site.id());
        });
      } else {
        jQuery('.site-form').html('');
        var html = request.load(jQuery('script#admin-sites-edit')).interpolate({ site: site.asJSON() }, 'mustache');
        html.replace('#site-form-' + site.id());
      }
    });
  });    
   
  
  // Update Site 
  // --------------------------------------------- 
  this.put('/admin/sites/:id', function(request){  
    var site = Site.find(request.params['id'])

    site.attr(request.params['site']);   
    site.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{  
        request.redirect('#/sites'); 
      }
    });  
  }); 
  
  // Remove Site 
  // --------------------------------------------- 
  this.get('/admin/sites/:id/remove', function(request){ 
    Galerie.open();         
    request.loadSites(function(){    
      site = Site.find(request.params['id']); 
      var removeSite = request.load(jQuery('script#admin-sites-remove')).interpolate({ site: site.asJSON() }, 'mustache');
      removeSite.replace('#modal');  
      request.renderSiteIndex(Site.all());
    });
  }); 
  
  // Delete Site 
  // --------------------------------------------- 
  this.del('/admin/sites/:id', function(request){       
     
    site.destroy(function(success, results){   
      //var response = JSON.parse(results.responseText);   
      if(success){ 
        request.redirect('#/sites'); 
      }else{  
        alert('there were issues');  
      }
    });
  });
  
});