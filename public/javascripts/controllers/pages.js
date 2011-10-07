var Pages = Sammy(function (app) {   
  
  var context = this;    

  // Helper Methods 
  // ---------------------------------------------
  app.helpers({  
    
    // Renders the Page tree
    renderTree: function(page, active_page){ 
      var application = this;
      var pageIndex = application.load(jQuery('script#admin-pages-node')).interpolate({ pages: [page.asJSON()] }, 'mustache');
      // jQuery('#sidebar').hide();
      pageIndex.replace('#sidebar').then(function(){   
        jQuery('ul.page-children:first').attr('id', 'pages'); 
        application.renderNode(page, active_page); 
        if(page.id() == active_page.id()){
          jQuery('li#page-' + page.id()).addClass('active');
        }
      });
    },
 
    // Renders a single page node for each page, then renders the children as well
    renderNode: function(page, active_page){ 
      var application = this;
      // This is a little slow, as it renders the children for each page. 
      var pageNode = application.load(jQuery('script#admin-pages-node')).interpolate(page.children().toMustache(), 'mustache');
      pageNode.appendTo('#page-' + page.id()).then(function(){
        $('ul#pages ul.page-children').sortable({items:'li'}); //  toleranceElement: '> div'
        page.children().each(function(child){  
          if(child.id() == active_page.id()){
            jQuery('li#page-' + child.id()).addClass('active');
          }
          if(child.has_children() == true){ 
            jQuery('#page-' + child.id()).addClass('open')
            application.renderNode(child, active_page);  
          }else{
            // 
          }
        });
      });       
    }, 
    
    renderPagePreview: function(page, callback){
      var application = this;   
      if(!context.modal){
        var showPage = application.load(jQuery('script#admin-pages-show')).interpolate({ 
          page: page.asJSON(),
          layouts: Layout.asLayoutJSON(page.attr('layout_id')),
          base_page_id: page.id()
        }, 'mustache');  
        showPage.replace('#editor').then(function(){  
          iFramer.initialize('.preview iframe', function(){
            if(callback){ callback.call(this); } 
          }); 
          jQuery('li.node').removeClass('active');
          jQuery('#page-' + page.id()).addClass('active');
        });
      }
    }, 
    
    renderPageEditor: function(page, callback){
      var application = this;   
      if(!jQuery('#page-editor').length){
        var pageEditor = application.load(jQuery('script#admin-pages-edit')).interpolate({ 
          page: page.asJSON()
        }, 'mustache');  
        pageEditor.appendTo('body').then(function(){  
          // TODO make an event
          jQuery('li.node').removeClass('active');
          jQuery('#page-' + page.id()).addClass('active');
          if(callback){ callback.call(this); }
        });
      }else {
        if(callback){ callback.call(this); }
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
        jQuery('li.node').removeClass('active');
        jQuery('#page-' + page.id()).addClass('active');
        if(callback){ callback.call(this); }
      });
    },
    
    open_page_editor: function(){
      var page_editor = jQuery('#page-editor');
      var page_title_input = jQuery('#page-title');
      page_editor.addClass('open').animate({'height': '200px'}, 300);
      page_title_input.removeAttr('disabled').focus();
    }, 
    
    close_page_editor: function(){
      var page_editor = jQuery('#page-editor');
      var page_title_input = jQuery('#page-title');
      page_editor.removeClass('open').animate({'height': '0'}, 300);
      page_title_input.attr('disabled', 'disabled');
    }
    
  });
  
  // renders the page index, only if that element is not found
  app.bind('page-index', function(){
    var application = this; 
    if(!jQuery('.page-children').length){
      application.renderTree(Page.root(), Page.root());  
    } 
  }); 
  
  app.bind('toggle-children', function(e, el){
    
    var application = this;
    var toggle = $(el);  
    var parent_node = toggle.parents('li:first'); 
    var page_id = el.id.split('-')[2];  
    var page = Page.find(page_id)  
    var active_page_cookie = jQuery.cookie('active_page_ids');
    var active_page_ids = active_page_cookie ? active_page_cookie.split(',') : [];  

    if(!parent_node.hasClass('open')){
      active_page_ids.push(page_id);
      parent_node.toggleClass('open');  
      var now = new Date();
      var start = now.getTime();  
      jQuery.cookie('active_page_ids', active_page_ids.join(','), { path: '/admin' }); 
    
      // move to model
      var url = '/admin/pages/' + page_id + '/children.json';    
      jQuery.ajax({
        type: 'GET',
        url: url,
        dataType: "json",                   
        success: function(results) {    
          jQuery.each(results, function(i, results) { 
            var page = Page.find(results.id);
            if(!page){
              var page = new Page({ id: results.id });
            }
            page.merge(results);
            Page.add(page);
          });
          application.renderNode(page, page);
        }
      });   
    } else {    
      parent_node.toggleClass('open'); 
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
  });

  app.bind('run', function () {   
    
    application = this;
    context.refresh_pages = true;
    context.modal = false;    
    
    jQuery('.add-asset').live('click', function(){
      application.trigger('add-asset');
      return false;
    }); 
    
    jQuery('#sidebar .opener').live('click', function(e){
      el = this;
      application.trigger('toggle-children', el);
      return false;
    }); 
  });

  // Page Index
  // ---------------------------------------------  
  this.get('/admin/pages/?', function(request){  
    // context.refresh_pages = true; 
    request.trigger('page-index');
    jQuery('#editor').html('<h1 class="section">Pages</div>');  

    context.do_not_refresh = false;              
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
        context.refresh_pages = true;  
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
    
    if(!context.do_not_refresh){
      if(page) {
        request.renderPagePreview(page); 
      } else {  
        // Loads page if the current collection does not contain it
        page = new Page({ id: request.params['id'] });
        page.load(function(){
          request.renderPagePreview(page); 
        });
      } 
      context.modal = false;
      context.do_not_refresh = false;
      request.trigger('page-index');
    }
    context.do_not_refresh = false;    
  });
  
  // Edit Page
  // ---------------------------------------------
  this.get('/admin/pages/:id/edit/?', function(request){  
    var page = Page.find(request.params['id']); 
    if(jQuery('#preview-' + page.id()).length){
      request.renderPageEditor(page, function(){
        request.renderPageProperties(page);
      });
    } else {
      request.renderPagePreview(page, function(){
        request.renderPageEditor(page, function(){
          request.renderPageProperties(page);
        });
      }); 
      request.trigger('page-index');
    }
    context.do_not_refresh = true;       
  }); 
    
  
  // Update Page
  // ---------------------------------------------  
  this.put('/admin/pages/:page_id', function(request){  
    var application = this;
    var page_id = request.params['page_id'];
    var page = Page.find(page_id);
    
    page.attr(request.params['page']); 
    
    var updatedStamp = jQuery('span.timestamp').text();
    console.log('Updated: ' + updatedStamp);
    console.log('Timestamp: ' + window.timestamp);
    
    if(!(updatedStamp < window.timestamp)){
      page.save(function(success, result){
        if(success){   
          Utilities.setTimestamp();
          Utilities.notice('Successfully saved page');

          // TODO move this
          var el = jQuery('li#page-' + page.id());
          context.do_not_refresh = false; 

          request.renderTree(Page.root(), page); 
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
        context.refresh_pages = false;
        request.redirect('#/pages');
      }
    }); 
  });  

});