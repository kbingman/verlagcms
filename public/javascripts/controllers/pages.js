Pages = Sammy(function (app) {   
  
  var context = this;  
   
  this.debug = false;
  this.disable_push_state = true;
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache);
  this.use(Sammy.NestedParams); 
  
  
  // Helper Methods 
  // ---------------------------------------------
  app.helpers({  
    
    // Checks for loaded pages, renders the tree, then executes the callback   
    loadPages: function(callback){  
      var application = this; 
      
      if(Page.all().length == 0 ){
        Page.load(function(){  
          Layout.load(function(){
            if(callback){ callback.call(this); }  
          });    
        });
      } else {        
        if(callback){ callback.call(this); } 
      }
    },
    
    // Renders the Page tree
    renderTree: function(page){ 
      var application = this;
      var pageIndex = application.render('/templates/admin/pages/node.mustache', { pages: [page.asJSON()] });
      // jQuery('#sidebar').hide();
      pageIndex.replace('#sidebar').then(function(){    
        application.renderNode(page); 
      });
    },
    
    renderNode: function(page){ 
      var application = this;
      // This is a little slow, as it renders the children for each page. 
      pageNode = application.render('/templates/admin/pages/node.mustache', page.children().toMustache() );
      pageNode.appendTo('#page-' + page.id()).then(function(){
        page.children().each(function(child){   
          if(child.has_children() == true){ 
            jQuery('#page-' + child.id()).addClass('open')
            application.renderNode(child);  
          }
        });
      });       
    }, 
    
    renderPagePreview: function(page, callback){
      var application = this;   
      if(!context.modal){
        var showPage = application.render('/templates/admin/pages/show.mustache', { 
          page: page.asJSON(),
          layouts: Layout.asLayoutJSON(page.attr('layout_id')),
          base_page_id: page.id()
        });  
        showPage.replace('#editor').then(function(){  
          iFramer.initialize('#preview iframe', function(){
            if(callback){ callback.call(this); } 
          }); 
          jQuery('.toggle-page-editor').click(function(e){
            e.preventDefault();
            var page_editor = jQuery('#page-editor');
            var page_title_input = jQuery('#page-title');
            if (page_editor.hasClass('open')){
              page_editor.removeClass('open').animate({'height': '0'}, 300);
              page_title_input.attr('disabled', 'disabled');
            } else {
              page_editor.addClass('open').animate({'height': '200px'}, 300);
              page_title_input.removeAttr('disabled').focus();
            }
          });
         
          // jQuery('#page-assets .asset').each(function(i, el){
          //   $(el).css({'z-index': '100000', 'position': 'relative'}).draggable({ revert: true }); 
          // });
        });
      }
    }, 
    
    renderPage: function(page){ 
      var application = this;
      var editPage = application.render('/templates/admin/pages/edit.mustache', { 
        page: page.asJSON(), 
        layouts: Layout.asLayoutJSON(page.attr('layout_id')) 
      });  
      editPage.replace('#editor').then(function(){
        // TabControl.initialize('.tab'); 
        // jQuery('#page-assets .asset').each(function(i, el){
        //   $(el).css({'z-index': '100000', 'position': 'relative'}).draggable({ revert: true }); 
        // })
      });
    }
    
  });

  this.bind('run', function () {   
    
    context.application = this;
    context.refresh_pages = true;
    context.modal = false;    
    
    jQuery('.add-asset').live('click', function(){
      context.application.trigger('add-asset');
      return false;
    });  
    
    // This needs to be moved
    jQuery('#sidebar .opener').live('click', function(e){    

      var Now = new Date()
      var start = Now.getTime();  
      var toggle = $(this);  
      var parent = toggle.parents('li:first'); 
      
      var page_id = this.id.split('-')[2];  
      var page = Page.find(page_id)  

      var active_page_cookie = jQuery.cookie('active_page_ids');
      var active_page_ids = active_page_cookie ? active_page_cookie.split(',') : [];  

      if(!parent.hasClass('open')){
        active_page_ids.push(page_id);
        parent.toggleClass('open');  
        var now = new Date();
        var start = now.getTime();  
        jQuery.cookie('active_page_ids', active_page_ids.join(','), { path: '/admin' }); 
        // var url = '/admin/pages/' + page_id + '/children.json';    
        // move to model
        // jQuery.ajax({
        //   type: 'GET',
        //   url: url,
        //   dataType: "json",                   
        //   success: function(results) {    
        //     jQuery.each(results, function(i, results) { 
        //       var page = Page.find(results.id);
        //       if(!page){
        //         var page = new Page({ id: results.id });
        //       }
        //       page.merge(results);
        //       Page.add(page);
        //     });
        //     context.application.renderNode(page);
        //     // Hide spinner  
        //   }
        // });   
        // Loads all open pages...  
        // Should really only load the relavent ones...
        Page.load(function(){  
          context.application.renderNode(page);
          var now = new Date();
          var end = now.getTime() - start; 
          console.log(end)
          // Hide spinner    
        });
      } else {    
        parent.toggleClass('open'); 
        var arr = new Array();
        active_page_ids = jQuery.grep(active_page_ids, function(value) {
          return value != page_id;
        }); 
        jQuery.cookie('active_page_ids', active_page_ids.join(','), { path: '/admin' }); 
        page.children().each(function(child){
          Page.remove(child);
        }); 
        jQuery('#page-' + page_id + ' ul').remove();
      } 
      context.refresh_pages = false; 
      context.modal = false;
      return false; 
    });
  });

  // Page routes
  // ---------------------------------------------  
  this.get('#/pages/?', function(request){ 
  
    Galerie.close();    
    // context.refresh_pages = true; 

    if(context.refresh_pages){
      request.loadPages(function(){
        request.renderTree(Page.root());  
        logger.info('pages')
      });   
    } 
    jQuery('#editor').html('<h1 class="section">Pages</div>');  
    context.refresh_pages = true; 
    context.do_not_refresh = false;              
  });
  
  this.get('#/pages/:id/new/?', function(request){    
    
    this.loadPages(function(){    
      var page = Page.find(request.params['id']);
      var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});

      if ($('#modal').length == 0){ Galerie.open(displayContents); } 
      
      if(context.refresh_pages){
        request.renderTree(Page.root()); 
        context.refresh_pages = true;
      }

      var newPage = request.render('/templates/admin/pages/new.mustache', { parent: page.asJSON() }); 
      newPage.replace('#new-page-container');
    }); 
  }); 
  
  this.post('#/pages/:page_id', function(request){
    var page_id = request.params['page_id'],
      parent = Page.find(page_id),   
      attributes = request.params['page'];  
    
    // Needs to be rewritten  
    Page.create(attributes, function(results, results2){ 
      context.refresh_pages = true;  
      Utilities.notice('Successfully saved page')
      request.redirect('#/pages/' + results.id + '/edit');
    }); 
  }); 
  
  // Show Page
  // ---------------------------------------------
  this.get('#/pages/:id/?', function(request){ 
    logger.info('pages show')
    Galerie.close(); 
    jQuery('.modal-editor').remove();
    this.loadPages(function(){  
      var page_id = request.params['id'];
      var page = Page.find(page_id); 

      if(!context.do_not_refresh){
        if(page) {
          request.renderPagePreview(page); 
        } else {  
          // Loads page if the current collection does not contain it
          page = new Page({ id: page_id });
          page.load(function(){
            request.renderPagePreview(page); 
          });
        } 
        context.modal = false;
        context.do_not_refresh = false;
        if(context.refresh_pages){
          request.renderTree(Page.root());
          context.refresh_pages = false;  
        } 
      }
    });
    context.do_not_refresh = false;    
  });
  
  // Edit Page
  // ---------------------------------------------
  this.get('#/pages/:id/edit/?', function(request){  
    // alert('Soon you will be able to edit a page here!');
    // request.redirect('#/pages/' + request.params['id'])
    Galerie.close();  
    context.modal = true;  

    this.loadPages(function(){  
      var page_id = request.params['id'];
      var page = Page.find(page_id); 
      if(!context.do_not_refresh){     
        if(page) {
          request.renderPage(page); 
        } else {  
          // Loads page if the current collection does not contain it
          page = new Page({ id: page_id });
          page.load(function(){
            request.renderPage(page); 
          });
        } 
        
        if(context.refresh_pages){
          request.renderTree(Page.root());
          context.refresh_pages = false;  
        }
      }
    }); 
    context.do_not_refresh = false;       
  }); 
    
  
  // Update Page
  // ---------------------------------------------  
  this.put('#/pages/:page_id', function(request){  
    var application = this;
    var page_id = request.params['page_id'];
    var page = Page.find(page_id);
    
    page.attr(request.params['page']);  
    page.save(function(success, result){
      if(success){
        context.modal = false;     
        Utilities.notice('Successfully saved page');
        // application.renderNode(page);
        request.renderTree(Page.root()); 
        // request.redirect('#/pages/' + page_id + '/edit');
      } 
    });
  });
  
  // Remove Page
  // ---------------------------------------------
  this.get('#/pages/:id/remove', function(request){   
    this.loadPages(function(){   
      var page_id = request.params['id'];
      var page = Page.find(page_id);         
      var displayContents = $('<div />').attr({'id': 'remove-page-container', 'class': 'small-modal'});   
      
      if($('#modal').length == 0){ Galerie.open(displayContents); } 
      
      if(context.refresh_pages){
        request.renderTree(Page.root()); 
      }
      
      var removePage = request.render('/templates/admin/pages/remove.mustache', { page: page.asJSON() });    
      removePage.replace('#remove-page-container');
    });  
  }); 
  
  // Destroy Page
  // ---------------------------------------------
  this.del('/pages/:id', function(request){
    var page_id = request.params['id'];       
    var page = Page.find(page_id);               
      
    page.destroy(function(success){  
      if(success){
        jQuery('#page-' + page_id).remove();
        context.refresh_pages = false;
        request.redirect('#/pages');
      }
    }); 
  });  
  
  
  // Asset Search Results
  // ---------------------------------------------
  this.get('/pages/:id/results', function(request){ 
    this.loadPages(function(){
      var page_id = request.params['id'];  
      var page = Page.find(page_id);  
      
      var query = request.params['query'] ? request.params['query'] : null; 
      var params = query ? { 'query': query } : {};
      
      Asset.searchAdmin(params, function(){  
        Asset.each(function(asset){
          asset.attr('current_page_id', page.id());
          asset.save();
        });  
         
        var searchResults = request.render('/templates/admin/pages/search_results.mustache', Asset.toMustache());    
        searchResults.replace('#search-results-container');
      });
    });
  });   

  
  // Add Page Asset
  // ---------------------------------------------  
  this.get('#/pages/:page_id/assets/:id/add', function(request){ 
    this.loadPages(function(){   
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);  
      var asset = Asset.find(request.params['id']);  
      var page_asset_input = jQuery('#page-asset-ids');
      var asset_ids_list = page_asset_input.attr('value'); 
      var new_asset_ids_list = page_asset_input.attr('value') + ',' + asset.id(); 
      
      page_asset_input.attr('value', new_asset_ids_list);
      // page.attr('assets_list', new_asset_ids_list);
      
      page.saveRemote({ page: { assets_list: new_asset_ids_list }}, {
        success: function(){ 
          // think of a better way to render these links 
          var image_div = jQuery('<div class="asset" />').attr('id', 'page-asset-' + asset.id());     
          var image_link = jQuery('<a href="#/assets/' + asset.id() + '/edit"></a>');
          var remove_link = jQuery('<br /><a href="#/pages/' + page.id() + '/assets/' + asset.id() + '/remove">Remove</a>');   
          image_link.append('<img src="/images/icons/' + asset.id() + '/' + asset.attr('file_name') + '" alt="' + asset.attr('title') + '" /></a>');
          image_div.html(image_link);
          image_div.append(remove_link);
          
          jQuery('#page-assets').append(image_div); 
          var preview = jQuery('#preview iframe');
          preview.hide().attr('src', preview.attr('src'));
          preview.load(function(){
            preview.fadeIn('fast')
          })
          context.do_not_refresh = true;
          request.redirect('#/pages/' + page_id);  
        }
      });
    });  
  }); 
  
  
  // Remove Page Asset
  // ---------------------------------------------   
  this.get('#/pages/:page_id/assets/:id/remove', function(request){ 
    this.loadPages(function(){     
      var id = request.params['id']; 
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);
      var page_asset_input = jQuery('#page-asset-ids');   
  
      var asset_ids_list = page_asset_input.attr('value').split(','); 
      var idx = asset_ids_list.indexOf(id);    
      if(idx!=-1) asset_ids_list.splice(idx, 1);  

      page_asset_input.attr('value', asset_ids_list);  
      page.attr('assets_list', asset_ids_list.join(','));
      page.save(function(){
        jQuery('#page-asset-' + id).fadeOut('fast', function(){
          $(this).remove();
        }); 
        var preview = jQuery('#preview iframe');
        preview.hide().attr('src', preview.attr('src'));
        preview.load(function(){
          preview.fadeIn('fast')
        })
        context.do_not_refresh = true;
        request.redirect('#/pages/' + page_id);
      })
    }); 
  });


});