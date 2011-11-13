var Parts = Sammy(function (app) {   
  
  var context = this;  
  
  // Helper Methods 
  // ---------------------------------------------
  app.helpers({  
    // Render Part
    renderPart: function(part, page, template){
      var application = this;  
      var editPart = application.load(jQuery('script#admin-' + template + '-edit')).interpolate({ 
        part: part.asJSON(),
        page: page.asJSON(),
        assets: Asset.asJSON(),
        timestamp: window.timestamp
      }, 'mustache');
      
      // jQuery('#page-tabs-' + page.id()).html('FIBBLE');
      editPart.replace('#page-tabs-' + page.id()).then(function(){
        
        // ACE editor
        var mode = 'textile'; 
        var editorMode = aceModes[mode];
        window.editor = ace.edit('part-' + part.id() + '-content');
        window.editor.setTheme('ace/theme/textmate');
        window.editor.getSession().setMode(new editorMode);
        window.editor.session.setUseWrapMode(true);
        // Because Mustache screws up my inline mustache templates, I just set it manually, directly from the model
        // This also eleminates the FUC
        window.editor.getSession().setValue(part.attr('content'));
    
        
        // Triggers Sanskrit editor
        // application.trigger('sanskrit', jQuery('#page-tabs-' + page.id()));
        
        // For image parts only. Otherwise ignored
        application.trigger('set_asset_links');
        jQuery('#ajax_uploader')
          .attr('multiple','multiple')
          .change(function(e){
            var form = jQuery(this).parents('form:first');
            jQuery('.progress').slideDown('slow',function(){
              form.submit();
            });
          });
        application.trigger('page-index');
      });
    }
    
  });    
  
  // Sets add asset links
  // ---------------------------------------------
  this.bind('set_asset_links', function(part, page){
    jQuery('#search-results-container li.asset').each(function(i, el){
      var link = jQuery(el).find('a');
      var assetId = jQuery(el).attr('id').split('-')[1];
      var assetSrc = link.find('img').attr('src');
      
      link.click(function(e){
        e.preventDefault();
        // Sets the asset id to the part page input
        jQuery('input#part-asset-id').attr('value', assetId);
        // Sets the preview image to the new image
        jQuery('form#edit-part img.preview').attr('src', assetSrc.replace('icon','thumbnail'));
      });
    });
  });
  
  // Edit Parts
  // ---------------------------------------------
  this.get('/admin/pages/:page_id/parts/:id/edit', function(request){ 
    jQuery('.modal-editor').remove();
    var iframe = $('iframe');
    var template = 'parts';
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);

    // if (iframe.length) {
    //   request.renderPageEditor(page, function(){
    //     request.renderPart(part, page, template);
    //   });
    // } else {
    //   request.renderPagePreview(page, function(){
    //     request.renderPageEditor(page, function(){
    //       request.renderPart(part, page, template);
    //     });
    //   }); 
    // }
    request.trigger('show-page-menu', page);
    request.renderPageEditor(page, function(){
      request.renderPart(part, page, template);
    });
  });
  
  // Remove this
  // Edit Image Parts
  // ---------------------------------------------
  this.get('/admin/pages/:page_id/image_parts/:id/edit', function(request){   
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);
    var template = 'image_parts';
    var iframe = $('iframe');
    
    Asset.searchAdmin({ 'limit': '24' }, function(){ 
      // if (iframe.length) {
      //   request.renderPageEditor(page, function(){
      //     request.renderPart(part, page, template);
      //   });
      // } else {
      //   request.renderPagePreview(page, function(){
      //     request.renderPageEditor(page, function(){
      //       request.renderPart(part, page, template);
      //     });
      //   }); 
      // }
      request.trigger('show-page-menu', page);
      request.renderPageEditor(page, function(){
        request.renderPart(part, page, template);
      });
    });
  });
  
  // TODO change to Event
  // Add Image Page Parts
  // ---------------------------------------------
  this.get('/admin/pages/:page_id/parts/:id/results', function(request){ 

    var page = Page.find(request.params['page_id']);
    var part = Part.find(request.params['id']);
    var query = request.params['query'] ? request.params['query'] : null; 
    var params = query ? { 'query': query } : {};
    
    Asset.searchAdmin(params, function(){    
      var searchResults = request.load(jQuery('#admin-pages-search_results')).interpolate(Asset.toMustache(), 'mustache');       
      // var searchResults = request.render('/templates/admin/pages/search_results.mustache', Asset.toMustache());    
      searchResults.replace('#search-results-container').then(function(){
        request.trigger('set_asset_links');
      });
    });
  });
  
  // Update Parts
  // ---------------------------------------------
  this.put('#/pages/:page_id/parts/:id', function(request){
    
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);
    
    // Updates part
    var parts = page.attr('contents'); 
    var length = parts.length;
    
    // Sets the part content to the ACE editor value
    request.params['part']['content'] = window.editor.getSession().getValue();
    
    // TODO Find by id method for part?
    // Or just make parts their own objects...
    for (var i=0, l=length; i<l; ++i ){
      var part = parts[i];
      
      if(request.params['id'] == part.id){
        // TODO This needs to be more generalized
        part['content'] = request.params['part']['content'];
        part['asset_id'] = request.params['part']['asset_id'];
        var p = Part.find(part.id);
        p.attr({'asset_id': request.params['part']['asset_id'], 'content': request.params['part']['content']});
        p.save();
      }
    }
     
    // The page needs to be saved, as parts are embedded. Not sure if this is a good idea
    page.save(function(success, result){
      if(success){
        Utilities.setTimestamp();  
        Utilities.notice(p.attr('name') + ' saved'); 
    
        // ACE editor
        window.editor.getSession().setUseSoftTabs(true);
        window.editor.getSession().setTabSize(2);
        window.editor.getSession().setMode(new editorMode);
        
        // request.trigger('reload-page', page);
        // request.redirect(page.attr('admin_path'));
      } 
    });
  });
  
  // Upload Assets to Part (Create)
  // ---------------------------------------------  
  this.post('#/pages/:page_id/image_parts/:id/assets', function(request){  
    var application = this; 
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);
    
    var fileInput = document.getElementById('ajax_uploader');
    var files = fileInput.files; 
    var query = request.params['query'] ? request.params['query'] : null;
    var uploadForm = jQuery('form#new_asset');
    var params = query ? { 'query': query } : {}; 
    params['limit'] = request.params['limit'] || 48;
    params['page'] = request.params['page'] || 1;
    //  fileInput = uploadForm.find('input[type=file]'),
    //  files = fileInput.attr('files');
    
    this.send_files(files, params, function(){
      var searchResults = request.load(jQuery('#admin-pages-search_results')).interpolate(Asset.toMustache(), 'mustache');
      // var searchResults = request.render('/templates/admin/pages/search_results.mustache', Asset.toMustache());    
      searchResults.replace('#search-results-container').then(function(){
        jQuery('#ajax_uploader').attr('files', null); 
        jQuery('.progress').slideUp('slow', function(){
          jQuery(this).html('');
        });
        request.trigger('set_asset_links');
      });
    });

  });

});