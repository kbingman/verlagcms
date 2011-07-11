Assets = Sammy(function (app) {
  
  var application = this; 
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache); 
  this.use(Sammy.NestedParams);  
  
  this.swap = function(content) {
    jQuery('#editor').html(content); 
  }
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({  

    // Checks for loaded assets, then executes the callback   
    loadAssets: function(query, callback){  
      
      if(Asset.all().length == 0 ){
        Asset.searchAdmin(query, function(){      
          if(callback){ callback.call(this); } 
        });
      } else {        
        if(callback){ callback.call(this); } 
      }
    }
  });

  this.bind('run', function () {
    application.modal = false; 
    application.first_run = true;  
  }); 
  
  // Asset Index
  // ---------------------------------------------
  this.get('#/assets', function(request){ 
    var query = request.params['query'] ? request.params['query'] : null;  
    Galerie.close();
    if(!application.modal){
      Asset.searchAdmin(query, function(){  
        var assetIndex = request.render('/templates/admin/assets/index.mustache', Asset.toMustache(query));
        assetIndex.replace('#editor').then(function(){
          jQuery('#ajax_uploader').attr('multiple','multiple'); 
        });
      });
    }
    application.modal = false; 
    application.first_run = false;
  }); 
  
  // New Assets
  // ---------------------------------------------
  this.get('#/assets/new', function(request){ 
    var newAsset = request.render('/templates/admin/assets/new.mustache');
    newAsset.replace('#editor').then(function(){
      jQuery('#ajax_uploader').attr('multiple','multiple'); 
    });
    application.first_run = false;
  });
  
  // Create Asset
  // ---------------------------------------------  
  this.post('/admin/assets', function(request){   
    var fileInput = document.getElementById('ajax_uploader');
    var files = fileInput.files; 
    var query = request.params['query'] ? request.params['query'] : null;
    var uploadForm = jQuery('form#new_asset');
    //  fileInput = uploadForm.find('input[type=file]'),
    //  files = fileInput.attr('files');

    for(var i = 0; i < files.length; i++) {   
      
      Asset.create(files[i], function(){  
        var assetIndex = request.render('/templates/admin/assets/new.mustache', Asset.toMustache(query));
        assetIndex.replace('#editor').then(function(){
          jQuery('#ajax_uploader').attr('multiple','multiple'); 
        });
      });     
    }
    return false; 
  });

  // // Edit Asset 
  // // ---------------------------------------------  
  this.get('#/assets/:id/edit', function(request){
    var query = request.params['query'] ? request.params['query'] : null;  

    //if(jQuery('#modal').length == 0){
    //  Galerie.open(jQuery('<div />').attr({'id': 'edit-asset-container', 'class': 'wide-modal'}));
    //} 
    
    this.loadAssets(query, function(){
      var asset = Asset.find(request.params['id']); 
      var editAsset = request.render('/templates/admin/assets/edit.mustache', asset.toMustacheWithNeighbors(query));
      editAsset.replace('#editor').then(function(results){  
        setTimeout(function(){
          $('img.fade-in').fadeIn('slow'); 
        }, 100);
        Utilities.formObserver('.image-info input[type=text], .image-info textarea'); 
      });  

      // if(application.first_run){
      //   var assetIndex = request.render('/templates/admin/assets/index.mustache', Asset.toMustache(query));
      //   assetIndex.replace('#editor');
      // }                                                                              
    }); 
    // sets a flag so the the search results are not reloaded   
    application.modal = false;  
  });
  
  // Update Asset
  this.put('#/assets/:id', function(req){
    var application = this;
    var asset = Asset.find(req.params['id']);     
  
    asset.attr(req.params['asset']);
    asset.saveRemote({
      success: function(){
        var notice = jQuery('.image-info .notice') ;
        notice.html('<div class="message">Successfully updated!</div>');
        delay(function(){
          jQuery('.message', notice).fadeOut('slow', function(){
            jQuery(this).remove();
          });
        }, 2000);
      }
    });
  });    
  
  // Remove Asset
  this.get('#/assets/:id/remove', function(request){   
    var query = request.params['query'] ? request.params['query'] : null;                            

    Galerie.close();
    Galerie.open(jQuery('<div />').attr({'id': 'remove-asset-container', 'class': 'wide-modal'})); 
    
    this.loadAssets(query, function(){ 
      var asset = Asset.find(request.params['id']);  
      
      var removeAsset = request.render('/templates/admin/assets/remove.mustache', { asset: asset.toMustache(query) }); 
      removeAsset.replace('#remove-asset-container'); 
 
      if(application.first_run){
        var assetIndex = request.render('/templates/admin/assets/index.mustache', Asset.toMustache(query));
        assetIndex.replace('#editor'); 
      }
    }); 
  });
  
  // Delete Asset
  this.del('#/assets/:id', function(req){
    var application = this;    
    var query = req.params['query'] ? req.params['query'] : null; 
    var query_path = query ? '?' + decodeURIComponent(jQuery.param({'query': query})) : '';  
    var asset = Asset.find(req.params['id']);     
    
    asset.deleteRemote({  
      success: function(){
        Galerie.close();  
        req.redirect('#/assets' + query_path);
      }
    });
  });    
        
  app.get('/', function (req) {
    // jQuery('h1').text('Start Page');
  });

});