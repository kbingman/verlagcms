var Sites = Sammy(function (app) {
  
  var application = this; 
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({
    
  });

  // Show Folder
  // ---------------------------------------------
  app.get('/admin/folders/:id', function(request){ 
    jQuery('#overlay').remove();
    var folderId = request.params['id'];
    var folder = Folder.find(folderId);
    request.renderFolderTree(function(){
      jQuery('ul#folders li').removeClass('active');
      jQuery('#folder-' + folderId).addClass('active');
    });
    
    // var assets = Asset.find_all_by_folder_id(folderId);
    folder.loadAssets(function(){
      request.trigger('render-index', '');
    });
  
  });
  
});