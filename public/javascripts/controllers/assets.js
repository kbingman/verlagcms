var Assets = Sammy(function (app) {
  
  var context = this; 
  
  // Helper Methods 
  // ---------------------------------------------  
  app.helpers({  
    
    // Sends each file to the server in turn, instead of all at once...
    send_files: function(files, params, callback){
      var application = this;
      var counter = 0;

      jQuery.each(files, function(i, file){
        Asset.upload({file: file, folder_id: params.folder_id}, {
          before: function(asset){
            if(callback['before']){ callback['before'].call(this, asset); }  
          },
          progress: function(uuid, percent){
            if(callback['progress']){ callback['progress'].call(this, uuid, percent); } 
            // jQuery('#progress-' + uuid + ' .percentage').text(' ' + percent + '%');
          },
          success: function(response){ 
            asset = new Asset();
            asset.merge(response)
            Asset.add(asset);
            
            if(callback['success']){ callback['success'].call(this, asset); }  
          }
        });   
      });
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
  app.bind('render-index', function(e, options){
    var query = options.query,
      folder_id = options.folder_id,
      application = this,  
      assetPartial = jQuery('script#admin-assets-asset').html(),
      html;

    html = application.load(jQuery('script#admin-assets-index')).interpolate({
      assets: Asset.toMustache(query),  
      folder_id: folder_id, 
      query: query,
      partials: { asset: assetPartial }
    }, 'mustache');
    
    html.replace('#editor').then(function(){
      // Sets uploader to multiple if browser supports it
      jQuery('#ajax_uploader')
        .attr('multiple','multiple')
        .bind('change', function(e){
          jQuery(this).parents('form:first').submit();
        }); 
    
      application.trigger('set_draggable_assets');
      application.trigger('set_droppable_folders');
    });
    window.modal = false;

  });
  
  // Draggable assets
  // ---------------------------------------------
  app.bind('set_draggable_assets', function(e){
    jQuery('li.asset').draggable({  
      revert: true,    
      stack: '.asset' 
    });
  });
  
  
  // Droppable folders
  // ---------------------------------------------
  app.bind('set_droppable_folders', function(e){
    jQuery('li.folder').droppable({  
      hoverClass: 'active',
      drop: function(e, ui){
        var folder_id = e.target.id.split('-')[1];
        var folder = Folder.find(folder_id);
        var asset_id = ui.draggable[0].id.split('-')[1];
        var asset = Asset.find(asset_id);
        asset.attr('folder_id', folder_id);
        ui.draggable.fadeOut('fast');
        asset.save(function(success){
          if(success){
            Utilities.notice('Asset added to ' + folder.attr('name'));   
          } else {
            ui.draggable.fadeIn('fast');
          }
        });
      }
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
      removeAsset.appendTo(jQuery('body')).then(function(){
        var modal_strip = jQuery('.modal-strip');
        modal_strip.css({
          top: asset_node.offset().top + (asset_node.height()/2),
          left: asset_node.offset().left + (asset_node.width()/2)
        })
        modal_strip.fadeIn('fast');
      });
    }
  });
  // ------------------------------------------------------------------------------------------
  
  // Asset Index
  // ---------------------------------------------
  app.get('/admin/assets', function(request){ 
    jQuery('#overlay').remove();
    var query = request.params['query']; // ? request.params['query'] : '';
    var params = { 'query': query };
    params['limit'] = request.params['limit'] || 96;
    params['page'] = request.params['page'] || 1;
    
    if(query){
      request.renderFolderTree();
      Asset.searchAdmin(params, function(){  
        request.trigger('render-index', { query: query });
      });
   } else {
     request.redirect(Folder.first().attr('admin_path'));
     // request.trigger('render-index', {});
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
    var folder_id = request.params['asset']['folder_id'];
    // console.log(files)
    var query = request.params['query'] ? request.params['query'] : null;
    var uploadForm = jQuery('form#new_asset');
    var params = query ? { 'query': query } : {}; 
    params['limit'] = request.params['limit'] || 48;
    params['page'] = request.params['page'] || 1;
    params['folder_id'] = folder_id;
    
    this.send_files(files, params, {
      before: function(asset){
        var html = request.load(jQuery('script#admin-assets-loading')).interpolate({
          uuid: asset.uuid,
          title: asset.file_name.split('.')[0]
        }, 'mustache');
        html.appendTo('#assets');
      },
      progress: function(uuid, percent){
        // console.log(uuid)
        // console.log(percent)
      },
      success: function(asset){
        var html = Mustache.to_html(jQuery('script#admin-assets-asset').html(), asset.attr());
        var image = jQuery('<img />').attr('src', '/images/' + asset.id() + '/' + asset.attr('file_name'));
        
        image.load(function(){
          jQuery('li#asset-' + asset.attr('uuid')).replaceWith(html);
        });
      }
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
    
    
    // Keeps index from reloading
    window.modal = true;
    
    if(asset) {
      
      request.trigger('render-asset', asset, query);
    } else {  
      alert('hey')
      // Loads asset if the current collection does not contain it
      Asset.searchAdmin(params, function(){  
        var asset = Asset.find(request.params['id']);
        request.trigger('render-index', { folder_id: asset.attr('folder_id') });
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
    var asset_id = request.params['id'];
    var asset = Asset.find(asset_id); 
    var folder_id = asset.attr('folder_id'); 
     
    jQuery('li#asset-' + asset_id).fadeOut('fast');
    jQuery('.modal-strip').remove();  
    
    asset.destroy(function(success){   
      if(success){  
        Utilities.notice('Asset removed'); 
      }
    });
  });    

});