var Pages = Sammy(function (app) {     

  // Helper Methods 
  // ---------------------------------------------
  app.helpers({  
    
    renderPagePreview: function(page, callback){
      var application = this;  
      if(!jQuery('div#preview-' + page.id()).length){
        var showPage = application.load(jQuery('script#admin-pages-show')).interpolate({ 
          page: page.asJSON(),
          layouts: Layout.asLayoutJSON(page.attr('layout_id')),
          base_page_id: page.id()
        }, 'mustache');  
        showPage.replace('#editor').then(function(){  
          iFramer.initialize('.preview iframe', function(){
            if(callback){ callback.call(this); } 
          }); 
          application.trigger('set-active-page', page);
          Editor.initialize();
        });
      }else{
        application.trigger('set-active-page', page);
      }
    }, 
    
    renderPageEditor: function(page, callback){
      var application = this;   
      if(!jQuery('#page-editor').length){
        var pageEditor = application.load(jQuery('script#admin-pages-edit')).interpolate({ 
          page: page.asJSON()
        }, 'mustache');  
        pageEditor.replace('#editor').then(function(){  
          // TODO make an event
          jQuery('li.node').removeClass('active');
          jQuery('#page-' + page.id()).addClass('active');
          if(callback){ callback.call(this); }
          application.trigger('set-active-page', page);
        });
      }else {
        if(callback){ callback.call(this); }
        application.trigger('set-active-page', page);
      }
    },
    
    renderPageProperties: function(page, callback){
      var application = this;   
      var pageProperties = application.load(jQuery('script#admin-pages-form')).interpolate({ 
        page: page.asJSON(),
        layouts: Layout.asLayoutJSON(page.attr('layout_id')),
        base_page_id: page.id(),
        timestamp: window.timestamp
      }, 'mustache');  
      pageProperties.replace('#page-tabs-' + page.id()).then(function(){  
        // TODO make an event
        if(callback){ callback.call(this); }
      });
    }, 
    
    renderPageMenu: function(page){
      var application = this;   
      var pageNode = application.load(jQuery('script#admin-pages-index')).interpolate({
        pages: [page.asJSON()],
        children: page.childrenAsJSON()
      }, 'mustache');
      pageNode.replace('#sidebar');
    }
    
  });
  
  // Page Menu
  // ---------------------------------------------
  app.bind('show-page-menu', function(e, page){
    var application = this;   
    // Checks if the page has children that are not yet loaded.
    // if this is the case, makes a json request, otherwise renders the menu
    if(page.children().count() == 0 && page.attr('child_count') != 0){
      console.log('ajax')
      page.getChildren(function(){
        application.renderPageMenu(page);
      })
    } else if(page.attr('child_count') != 0){
      application.renderPageMenu(page);
    } else {
      // renders the parent menu if the page has no children at all
      var page = page.parent();
      application.renderPageMenu(page);
    }

  });
  
  // Page Index
  // ---------------------------------------------
  // renders the page index, only if that element is not found
  // app.bind('page-index', function(e){
  //   var application = this; 
  //   var pageId = document.location.pathname.split('/')[3];
  //   if(!jQuery('ul.page-children').length){
  //     application.renderTree(Page.root(), pageId);  
  //   }
  // }); 
  
  
  // Set Active Page
  // ---------------------------------------------
  app.bind('set-active-page', function(e, page){
    jQuery('li.node').removeClass('active');
    jQuery('li#page-' + page.id()).addClass('active');
  });
  
  // Reload Page
  // ---------------------------------------------
  app.bind('reload-page', function(e, page){
    var id = page.id();
    var pageFrame = jQuery('iframe#page-iframe-' + id);
    // Sets page title
    jQuery('li#page-' + id).find('span.title a').text(page.attr('title'));
    jQuery('h1#page-title-' + id).text(page.attr('title'));
    
    pageFrame.attr('src', pageFrame.attr('src'));
  });

  // Page Index
  // ---------------------------------------------  
  this.get('/admin/pages/?', function(request){  
    // request.trigger('show-page-menu', Page.root());
    // jQuery('#editor').html('<h1 class="section">Pages</div>');     
    var first = Page.first();
    request.redirect(first.attr('admin_path'));       
  });
  
  
  // New Page
  // ---------------------------------------------
  this.get('/admin/pages/:id/new/?', function(request){    
    var page = Page.find(request.params['id']);
    var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});
    if ($('#modal').length == 0){ Galerie.open(displayContents); } 
    
    request.trigger('page-index');
    
    var newPage = request.load(jQuery('#admin-pages-new')).interpolate({ 
      parent: page.asJSON(),
      layouts: Layout.asLayoutJSON(page.attr('layout_id'))
    }, 'mustache'); 
    newPage.replace('#new-page-container');
  }); 
  
  // Create Page
  // ---------------------------------------------
  this.post('/admin/pages/:page_id/?', function(request){
    var page_id = request.params['page_id'],
      parent = Page.find(page_id),   
      attributes = request.params['page'];  
    
    var page = new Page(request.params['page']); 
    page.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        alert(JSON.stringify(response));  
      }else{  
        Utilities.notice('Successfully created page');
        request.redirect(response.admin_path);
      }
    });
  }); 
  
  // Show Page
  // ---------------------------------------------
  this.get('/admin/pages/:id/?', function(request){ 
    jQuery('#overlay').remove();
    jQuery('.modal-editor').remove();
 
    var page = Page.find(request.params['id']); 
    
    if(page) {
      request.renderPagePreview(page); 
    } else {  
      // Loads page if the current collection does not contain it
      page = new Page({ id: request.params['id'] });
      page.load(function(){
        request.renderPagePreview(page); 
      });
      page.save;
    }
    request.trigger('show-page-menu', page);
    //request.trigger('page-index');
  });
  
  // Edit Page
  // ---------------------------------------------
  this.get('/admin/pages/:id/edit/?', function(request){  
    var page = Page.find(request.params['id']); 
    // if(jQuery('#preview-' + page.id()).length){
    //   request.renderPageEditor(page, function(){
    //     request.renderPageProperties(page);
    //   });
    // } else {
    //   request.renderPagePreview(page, function(){
    //     request.renderPageEditor(page, function(){
    //       request.renderPageProperties(page);
    //     });
    //   }); 
    //   request.trigger('page-index');
    // }
    request.renderPageEditor(page, function(){
      request.renderPageProperties(page);
    });  
    request.trigger('show-page-menu', page);  
  }); 
    
  
  // Update Page
  // ---------------------------------------------  
  this.put('/admin/pages/:page_id', function(request){  
    var application = this;
    var page_id = request.params['page_id'];
    var page = Page.find(page_id);
    
    page.attr(request.params['page']); 
    
    var updatedStamp = jQuery('span.timestamp').text();
    // console.log('Updated: ' + updatedStamp);
    // console.log('Timestamp: ' + window.timestamp);
    
    if(!(updatedStamp < window.timestamp)){
      page.save(function(success, result){
        if(success){   
          Utilities.setTimestamp();
          Utilities.notice('Successfully saved page');

          // request.renderTree(Page.root(), page.id()); 
          request.trigger('reload-page', page);
          request.redirect(page.attr('admin_path'));
        } 
      });
    } else {
      alert('Someone else has edited this page, please reload and try again');
    }
  });
  
  // Remove Page
  // ---------------------------------------------
  this.get('/admin/pages/:id/remove', function(request){    
    var page = Page.find(request.params['id']);         
    var displayContents = $('<div />').attr({'id': 'remove-page-container', 'class': 'small-modal'});   
    
    if($('#modal').length == 0){ Galerie.open(displayContents); } 
    
    request.trigger('page-index');
    
    var removePage = request.load(jQuery('#admin-pages-remove')).interpolate({ page: page.asJSON() }, 'mustache');    
    removePage.replace('#remove-page-container'); 
  }); 
  
  // Destroy Page
  // ---------------------------------------------
  this.del('/admin/pages/:id', function(request){    
    var page = Page.find(request.params['id']);               
      
    page.destroy(function(success){  
      if(success){
        jQuery('#page-' + page.id()).remove();
        request.redirect('/admin/pages');
      }
    }); 
  });  

});