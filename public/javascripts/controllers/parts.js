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
        
        // TODO remove
        var modal_editor = jQuery('.modal-editor');
        modal_editor.fadeIn('fast');
        
        // Triggers Sanskrit editor
        application.trigger('sanskrit', jQuery('#page-tabs-' + page.id()));
        
        // For image parts only. Otherwise ignored
        application.set_asset_links(part, page);
        jQuery('#ajax_uploader')
          .attr('multiple','multiple')
          .change(function(e){
            var form = jQuery(this).parents('form:first');
            jQuery('.progress').slideDown('slow',function(){
              form.submit();
            });
          });
        application.trigger('page-index');
        context.modal = true;
      });
    },
    
    // Sets add asset links
    set_asset_links: function(part, page){
      jQuery('#search-results-container li.asset').each(function(i, el){
        var link = jQuery(el).find('a');
        var asset_id = jQuery(el).attr('id').split('-')[1];
        link.click(function(e){
          e.preventDefault();
          // Updates part
          var parts = page.attr('parts'); 
          var length = parts.length;
          for (var i=0, l=length; i<l; ++i ){
            var p = parts[i];
            if(part.id() == p.id){
              p.asset_id = asset_id;
              part.attr('asset_id', asset_id);
              part.save();
            }
          }
          page.save(function(success){
            jQuery('.modal-editor').remove();
            // TODO Change to sammy method
            context.modal = false;
            document.location.hash = '#' + page.attr('admin_path');
          });
        });
      });
    }
    
  });    
  
  // Edit Parts
  // ---------------------------------------------
  this.get('/admin/pages/:page_id/parts/:id/edit', function(request){ 
    jQuery('.modal-editor').remove();
    var iframe = $('iframe');
    var template = 'parts';
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);
    console.log(part)

    if (iframe.length) {
      request.renderPageEditor(page, function(){
        request.renderPart(part, page, template);
      });
    } else {
      request.renderPagePreview(page, function(){
        request.renderPageEditor(page, function(){
          request.renderPart(part, page, template);
        });
      }); 
    }
    // context.modal = true;
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
      if (iframe.length) {
        request.renderPageEditor(page, function(){
          request.renderPart(part, page, template);
        });
      } else {
        request.renderPagePreview(page, function(){
          request.renderPageEditor(page, function(){
            request.renderPart(part, page, template);
          });
        }); 
      }
    });  
    // context.modal = true; 
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
        request.set_asset_links(part, page);
      });
    });

  });
  
  // Update Parts
  // ---------------------------------------------
  this.put('#/pages/:page_id/parts/:id', function(request){
    
    var page = Page.find(request.params['page_id']);
    var part = page.parts().find(request.params['id']);
    
    // Updates part
    var parts = page.attr('parts'); 
    var length = parts.length;
    for (var i=0, l=length; i<l; ++i ){
      var part = parts[i];
      if(request.params['id'] == part.id){
        // This needs to be more generalized
        var content = request.params['part']['content'];
        part.content = content;
        var p = Part.find(part.id);
        p.attr('content', content);
        p.save();
      }
    }
    
    // The page needs to be saved, as parts are embedded. Not sure if this is a good idea
    page.save(function(success, result){
      if(success){
        context.modal = false;   
        Utilities.setTimestamp();  
        Utilities.notice('Successfully saved page');
        
        request.redirect(page.attr('admin_path'));
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
        application.set_asset_links(part, page);
      });
    });

  });

});