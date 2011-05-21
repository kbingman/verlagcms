Assets = Sammy(function (app) {
  
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  
  this.use(Sammy.Title);
  this.use(Sammy.NestedParams);
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({
    formObserver: function(element){  
      jQuery(element).keyup(function() {
        delay(function(){
          var form = jQuery(element).parents('form:first');
          form.submit();
        }, 800);
      });
    }
  });

  this.bind('run', function () {
    app.modal = false;
  });
  
  this.get('#/assets', function(req){ 
    var query = req.params['query'] ? req.params['query'] : null;  
    var application = this;
    Galerie.close();
    if(!app.modal){
      Asset.searchAdmin(query, function(){  
        var assetIndex = new AssetIndexView(Asset.toMustache(query)); 
        jQuery('#pages').html(assetIndex.html);  
        // assetIndex.render(); 
      });
    }
    app.modal = false;
  });
  
  // Create Asset
  // ---------------------------------------------  
  // this.post('/assets', function(req){
  //   var uploadForm = jQuery('form#new_asset');
  //     fileInput = uploadForm.find('input[type=file]'),
  //     url = uploadForm.attr('action') + '.json',
  //     files = fileInput.attr('files');
  //     
  //   AjaxUploader.totalFiles = files.length;
  //   AjaxUploader.processedFiles = 0;
  //   
  //   for(var i = 0; i < AjaxUploader.totalFiles; i++) {
  //     var file = files[i];
  //     // TODO this could be moved to the model as a create action  
  //     AjaxUploader.sendRequest(url, file);     
  //   }
  // });
  // 
  // // Edit Asset 
  // // ---------------------------------------------  
  // this.get('/assets/:id/edit', function(req){
  //   var application = this;
  //   var query = req.params['query'] ? req.params['query'] : null;  
  //   
  //   // Clears out fallback content
  //   // jQuery('#asset-index-container').html(''); 
  //   
  //   // sets a flag so the the search results are not reloaded
  //   app.modal = true;
  //   if(jQuery('#modal').length == 0){
  //     Galerie.open(jQuery('<div />').attr({'id': 'edit-asset-container', 'class': 'wide-modal'}));
  //   }
  //   
  //   var asset = Asset.find(req.params['id']); 
  //   if(asset){
  //     var editAsset = new EditAssetView(asset.toMustacheWithNeighbors(query));
  //     editAsset.render(); 
  //     // maybe this can go in an after filter
  //     application.formObserver('.image-info input[type=text], .image-info textarea');
  //   }else{
  //     Asset.searchAdmin(query, function(){      
  //       var asset = Asset.find(req.params['id']);              
  //       var editAsset = new EditAssetView(asset.toMustacheWithNeighbors(query));
  //       editAsset.render();          
  //       // maybe this can go in an after filter       
  //       application.formObserver('.image-info input[type=text], .image-info textarea');
  //       var assetIndex = new AssetIndexView(Asset.toMustache(query));
  //       assetIndex.render();
  //     });
  //   }
  // });
  // 
  // // Update Asset
  // this.put('/assets/:id', function(req){
  //   var application = this;
  //   var asset = Asset.find(req.params['id']);     
  // 
  //   asset.attr(req.params['asset']);
  //   asset.saveRemote({
  //     success: function(){
  //       var notice = jQuery('.image-info .notice') ;
  //       notice.html('<div class="message">Successfully updated!</div>');
  //       delay(function(){
  //         jQuery('.message', notice).fadeOut('slow', function(){
  //           jQuery(this).remove();
  //         });
  //       }, 2000);
  //     }
  //   });
  // });    
  // 
  // // Remove Asset
  // this.get('/assets/:id/remove', function(req){
  //   var application = this;    
  //   var query = req.params['query'] ? req.params['query'] : null;                            
  //   // sets a flag so the the search results are not reloaded
  //   app.modal = true; 
  //   Galerie.close();
  //   Galerie.open(jQuery('<div />').attr({'id': 'remove-asset-container', 'class': 'wide-modal'}));  
  //   var asset = Asset.find(req.params['id']);   
  //   if(asset){
  //     var removeAsset = new RemoveAssetView({ asset: asset.toMustache(query) }); 
  //     removeAsset.render();
  //   }else{
  //     Asset.searchAdmin(query, function(){      
  //       var asset = Asset.find(req.params['id']);              
  //       var removeAsset = new RemoveAssetView({ asset: asset.toMustache(query) }); 
  //       removeAsset.render();
  //       var assetIndex = new AssetIndexView(Asset.toMustache(query));
  //       assetIndex.render();
  //     });
  //   }
  // });
  // 
  // // Delete Asset
  // this.del('/assets/:id', function(req){
  //   var application = this;    
  //   var query = req.params['query'] ? req.params['query'] : null; 
  //   var query_path = query ? '?' + decodeURIComponent(jQuery.param({'query': query})) : '';  
  //   var asset = Asset.find(req.params['id']);     
  //   
  //   asset.deleteRemote({  
  //     success: function(){
  //       Galerie.close();  
  //       req.redirect('/assets' + query_path);
  //     }
  //   });
  // });    
  //       
  // app.get('/', function (req) {
  //   // jQuery('h1').text('Start Page');
  // });

});