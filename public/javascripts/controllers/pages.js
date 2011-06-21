Pages = Sammy(function (app) {   
  
  var context = this;  
   
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
    
    renderPage: function(page){ 
      var application = this;
      var editPage = application.render('/templates/admin/pages/edit.mustache', { 
        page: page.asJSON(), 
        layouts: Layout.asLayoutJSON(page.attr('layout_id')) 
      });  
      editPage.replace('#editor');
    }
    
  });

  this.bind('run', function () { 
    context.application = this;
    context.refresh_pages = true;
    context.modal = false;      
    
    jQuery('#sidebar .node').live('click', function(){
      alert('hey')
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
      var active_page_ids = active_page_cookie ? active_page_cookie.split(',') : []

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
      return false; 
    });
  });

  // Page routes
  // ---------------------------------------------  
  this.get('#/pages', function(request){ 
    Galerie.close();    
    // context.refresh_pages = true; 

    if(context.refresh_pages){
      request.loadPages(function(){
        request.renderTree(Page.root());  
      });   
      
    } 
    jQuery('#editor').html(''); 
    context.refresh_pages = false;              
  });
  
  this.get('#/pages/:id/new', function(request){    
    
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
      
    Page.create(attributes, function(results, results2){ 
      context.refresh_pages = true; 
      request.redirect('#/pages/' + results.id + '/edit');
    }); 
  });
  
  this.get('#/pages/:id/edit', function(request){ 
    Galerie.close(); 
    console.log('Edit Page') 
    
    this.loadPages(function(){  
      var page_id = request.params['id'];
      var page = Page.find(page_id); 
      
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
    });        
  });   
  
   this.put('#/pages/:page_id', function(request){  
    var page_id = request.params['page_id'],
      page = Page.find(page_id)
    // This is a hack, but otherwise the params get screwed up
    var form = $('#edit-page')

    page.attr(request.params['page']);   
    page.saveRemote(form.serialize(), {
      success: function(){ 
        // request.renderTree(Page.root()); 
        request.redirect('#/pages/' + page_id + '/edit');
      }
    });  
  });
  
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
  
  this.del('/pages/:id', function(request){
    var page_id = request.params['id'];       
    var page = Page.find(page_id);               
      
    page.deleteRemote(function(){ 
      jQuery('#page-' + page_id).remove();
      context.refresh_pages = false;
      request.redirect('#/pages');
    }); 
  });  
  
  // Page assets browser    
  // --------------------------------------------- 
  this.get('#/pages/:id/search', function(request){
    this.loadPages(function(){     
      var page = Page.find(request.params['id']); 
      
      if($('#modal').length == 0){ Galerie.open(function(){
        var searchForm = request.render('/templates/admin/pages/search_form.mustache', { page: page.asJSON() });    
        searchForm.replace('#modal');
      }); }  
  
    });
  });  

  this.get('/pages/:id/results', function(request){ 
    this.loadPages(function(){
      var page_id = request.params['id'];  
      var page = Page.find(page_id);  
      var query = request.params['query'];  
      
      Asset.searchAdmin(query, function(){  
        Asset.each(function(asset){
          asset.attr('current_page_id', page.id());
          asset.save();
        });  
         
        var searchResults = request.render('/templates/admin/pages/search_results.mustache', Asset.toMustache());    
        searchResults.replace('#search-results-container');
      });
    });
  });   
  
  this.get('#/pages/:page_id/assets/:id/add', function(request){ 
    this.loadPages(function(){   
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);  
      var asset = Asset.find(request.params['id']);  
      var page_asset_input = $('#page-asset-ids');
      var asset_ids_list = page_asset_input.attr('value'); 
     
      page_asset_input.attr('value', asset_ids_list + ', ' + asset.id());  
      Galerie.close(); 
      // Consider an elegant way to do this with the model...
      var edit_form = jQuery('#edit-page').submit();
      // alert(asset.id());
      // asset.addToPage(page_id,function(){
      //   request.renderPage(page); 
      //   request.redirect('#/pages/' + page_id + '/edit');  
      // });
    });  
  }); 
      
  this.get('#/pages/:page_id/assets/:id/remove', function(request){ 
    this.loadPages(function(){     
      var id = request.params['id']; 
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);  
      var page_asset_input = $('#page-asset-ids');
      var asset_ids_list = page_asset_input.attr('value');  
      
      // asset_ids_list.delete(id);
      alert(asset_ids_list);
      var edit_form = jQuery('#edit-page').submit();   
      
      // Asset.removeFromPage(asset_id, page_id,function(){
      //   request.renderPage(page);
      //   request.redirect('#/pages/' + page_id + '/edit');  
      // }); 
    }); 
  });

});