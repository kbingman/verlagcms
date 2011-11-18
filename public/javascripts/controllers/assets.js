var Assets = Sammy(function (app) {
  
  var context = this; 
  
  // Helper Methods 
  // ---------------------------------------------  
  app.helpers({  
    
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
    },
    
    // Sends each file to the server in turn, instead of all at once...
    send_files: function(files, params, callback){
      var application = this;
      var counter = 0;
      for(var i = 0; i < files.length; i++) {   
        var file = files[i];
        Asset.create(file, {
          before: function(uuid){
            jQuery('.progress').append('<p id="progress-' + uuid + '">' + file.name + '<span class="percentage"></span></p>');
          },
          progress: function(uuid, percent){
            jQuery('#progress-' + uuid + ' .percentage').text(' ' + percent + '%');
          },
          success: function(asset){ 
            // var assetItem = application.render('/templates/admin/assets/asset.mustache', { asset: asset.attr() });
            // assetItem.prependTo('#assets');
            counter = counter + 1;    
            if(counter == files.length){
             // This needs to be fixed, as it sends another request to the server that isn't really needed...
             // I could simply fix the ordering or something...
             
             Asset.searchAdmin(params, function(){ 
               if(callback){ callback.call(this); }  
             });
            }
          }
        });     
      }
    }
  });
  
  // Render Asset 
  // ------------------------------------------------------------------------------------------
  app.bind('render-asset', function(e, asset, query){
    var application = this; 
    var editAsset = application.load(jQuery('script#admin-assets-edit')).interpolate(asset.toMustacheWithNeighbors(query), 'mustache');
    editAsset.appendTo('body').then(function(){
      Utilities.loadModal('div#asset-editor', function(){
        jQuery('div#asset-editor').fadeIn('fast'); 
        window.modal = true;
      });
    });
  });
  
  // Asset Index
  // ---------------------------------------------
  app.bind('render-index', function(e, query){
    var application = this; 
    var assetIndex = application.load(jQuery('script#admin-assets-index')).interpolate(Asset.toMustache(query), 'mustache');
    assetIndex.replace('#editor').then(function(){
      // Sets uploader to multiple if browser supports it
      // jQuery('#ajax_uploader').attr('multiple','multiple'); 
    
      // Upload Asset Form
      jQuery('#ajax_uploader')
        .attr('multiple','multiple')
        .live('change', function(e){
          jQuery(this).parents('form:first').submit();
        });
    });
  });
  
  // Show Asset Info popup
  // ---------------------------------------------
  app.bind('show_info', function(e, data){
    var asset = Asset.find(data['current_asset_id']); 
    var asset_node = jQuery('#asset-' + asset.id());
    var remove_modal = asset_node.find('.info');
    
    jQuery('.modal-strip').remove();
    if(!remove_modal.length){
      var assetInfo = this.load(jQuery('#admin-assets-info')).interpolate({ asset: asset.toMustache() }, 'mustache');
      assetInfo.appendTo(asset_node).then(function(){
        var modal_strip = jQuery('.modal-strip');
        modal_strip.fadeIn('fast');
      });
    }
  });
  
  // Show Remove Asset popup
  // ---------------------------------------------
  app.bind('show_remove_dialog', function(e, data){
    var asset = Asset.find(data['current_asset_id']); 
    var asset_node = jQuery('#asset-' + asset.id());
    var remove_modal = asset_node.find('.remove');
    
    jQuery('.modal-strip').remove();
    if(!remove_modal.length){
      var removeAsset = this.load(jQuery('script#admin-assets-remove')).interpolate({ asset: asset.toMustache() }, 'mustache');
      removeAsset.appendTo(asset_node).then(function(){
        var modal_strip = jQuery('.modal-strip');
        modal_strip.fadeIn('fast');
      });
    }
  });
  // ------------------------------------------------------------------------------------------
  
  // Asset Index
  // ---------------------------------------------
  app.get('/admin/assets', function(request){ 
    jQuery('#overlay').remove();
    var query = request.params['query'] ? request.params['query'] : '';
    var params = { 'query': query };
    params['limit'] = request.params['limit'] || 48;
    params['page'] = request.params['page'] || 1;

    request.renderFolderTree();
    if(!window.modal){
      window.modal = false;
      Asset.searchAdmin(params, function(){  
        request.trigger('render-index', query);
      });
    }
  }); 
  
  // New Assets
  // ---------------------------------------------
  app.get('/admin/assets/new', function(request){ 
    // var newAsset = request.render('/templates/admin/assets/new.mustache');
    var newAsset = request.load(jQuery('script#admin-assets-new')).interpolate({}, 'mustache');
    newAsset.replace('#editor').then(function(){
      jQuery('#ajax_uploader').attr('multiple','multiple'); 
    });
    context.first_run = false;
  });
  
  // Create Asset
  // ---------------------------------------------  
  app.post('/admin/assets', function(request){   
    var fileInput = document.getElementById('ajax_uploader');
    var files = fileInput.files; 
    var query = request.params['query'] ? request.params['query'] : null;
    var uploadForm = jQuery('form#new_asset');
    var params = query ? { 'query': query } : {}; 
    params['limit'] = request.params['limit'] || 48;
    params['page'] = request.params['page'] || 1;
    
    this.send_files(files, params, function(){
      request.trigger('render-index', query);
    });

    return false; 
  });

  // Edit Asset 
  // ---------------------------------------------  
  app.get('/admin/assets/:id/edit', function(request){
    jQuery('#overlay').remove();
    var query = request.params['query'] ? request.params['query'] : ''; 
    var params = query ? { 'query': request.params['query']} : {};   
    var asset = Asset.find(request.params['id']);
    
    if(asset) {
      request.trigger('render-asset', asset, query);
    } else {  
      // Loads asset if the current collection does not contain it
      Asset.searchAdmin(params, function(){  
        var asset = Asset.find(request.params['id']);
        request.trigger('render-index', query);
        request.renderFolderTree();
        request.trigger('render-asset', asset, query);
      });
    }                                                                         
  });
  
  // Update Asset
  // ---------------------------------------------  
  app.put('/admin/assets/:id', function(request){
    var asset = Asset.find(request.params['id']);  
    if(asset) {
      asset.attr(request.params['asset']);
      asset.save(function(success){   
        if(success){
          Utilities.notice('Successfully saved asset');   
        }
      });
    } else {  
      // Loads asset if the current collection does not contain it
      asset = new Asset({ id: request.params['id'] });
      asset.load(function(success){
        asset.attr(request.params['asset']);
        asset.save(function(success, results){   
          if(success){
            Utilities.notice('Successfully saved asset');   
          }
        });
      });  
    }
  });    
  
  // Delete Asset
  // ---------------------------------------------  
  app.del('/admin/assets/:id', function(request){   
    var query = request.params['query'] ? request.params['query'] : null; 
    var query_path = query ? '?' + decodeURIComponent(jQuery.param({'query': query})) : '';  
    var asset = Asset.find(request.params['id']);  
       
    asset.destroy(function(success){   
      if(success){  
        Utilities.notice('Successfully saved asset'); 
        request.redirect('/admin/assets' + query_path);    
      }
    });
  });    

});