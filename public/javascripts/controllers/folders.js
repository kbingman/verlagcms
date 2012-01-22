var Folders = Sammy(function (app) {
  
  var application = this; 
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({
    
    // Renders the Folder tree
    renderFolderTree: function(callback){ 
      var application = this;
      if(!jQuery('ul#folders').length){
        var index = application.load(jQuery('script#admin-folders-index')).interpolate({ folders: Folder.asJSON() }, 'mustache');
        index.replace('#sidebar').then(function(){
          if(callback){ callback.call(this); }  
        });
      } else {
        if(callback){ callback.call(this); }  
      }
    }
    
  });  
  
  // New Folder
  // ---------------------------------------------
  this.get('/admin/folders/new/?', function(request){    
    if ($('#modal').length == 0){ Galerie.open(); } 
    
    request.renderFolderTree(function(){
      jQuery('ul#folders li').removeClass('active');
    });
    
    var html = request.load(jQuery('#admin-folders-new')).interpolate({
      
    }, 'mustache'); 
    html.replace('#modal');
  });

  // Show Folder
  // ---------------------------------------------
  app.get('/admin/folders/:id', function(request){ 
    
    jQuery('#overlay').remove();
    var folder_id = request.params['id'];
    var folder = Folder.find(folder_id);
    request.renderFolderTree(function(){
      jQuery('ul#folders li').removeClass('active');
      jQuery('#folder-' + folder_id).addClass('active');
    });
    
    if(!window.modal){
      // var assets = Asset.find_all_by_folder_id(folderId);
      folder.loadAssets(function(){
        request.trigger('render-index', { folder_id: folder.id() });
      }); 
    }
    window.modal = false;
  });  
  
  // Create Folder
  // ---------------------------------------------  
  this.post('/admin/folders', function(request){
    var attributes = request.params['folder'];  
    var folder = new Folder(request.params['folder']);
    
    folder.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{      
        alert(folder.attr('admin_path'));
        
        var index = request.load(jQuery('script#admin-folders-index')).interpolate({ folders: Folder.asJSON() }, 'mustache');
        index.replace('#sidebar');
        
        request.redirect(folder.attr('admin_path')); 
      }
    });  
  });
  

  
});