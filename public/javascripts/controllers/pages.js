Pages = Sammy(function (app) {   
  
  var application = this;  
   
  this.use(Sammy.Title);  
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
          if(callback){ callback.call(this); } 
        });
      } else {        
        if(callback){ callback.call(this); } 
      }
    },
    
    // Renders the Page tree
    renderTree: function(page){ 
      var application = this;
       
      var pageIndex = application.render('/templates/admin/pages/index.mustache', Page.toMustache());
      pageIndex.replace('#pages');
    },  
    
    renderPage: function(page){ 
      var application = this;  
      var editPage = application.render('/templates/admin/pages/edit.mustache', { page: page.asJSON() });    
      editPage.replace('#pages');
    }
    
  });

  this.bind('run', function () { 
    application.first_run = true;
    application.modal = false;  
  });

  // Page routes
  // ---------------------------------------------  
  this.get('#/pages', function(request){ 
    Galerie.close();
    application.first_run = false;  
    request.loadPages(function(){
      request.renderTree(Page.root());  
    });            
  });
  
  this.get('#/pages/:id/new', function(request){    
    
    this.loadPages(function(){    
      var page_id = request.params['id'];    
      var page = Page.find(page_id);
      var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});

      if ($('#modal').length == 0){ Galerie.open(displayContents); } 
      
      if(application.first_run){
        request.renderTree(Page.root()); 
      }

      var newPage = request.render('/templates/admin/pages/new.mustache', { parent: page.asJSON() }); 
      newPage.replace('#new-page-container');
    }); 
  }); 
  
  this.post('#/pages/:page_id', function(request){
    var page_id = request.params['page_id'],
      parent = Page.find(page_id),   
      attributes = request.params['page'];  
      
    Page.create(attributes, function(){
      request.redirect('#/pages');
    }); 
  });
  
  this.get('#/pages/:id/edit', function(request){ 
    Galerie.close();   
    this.loadPages(function(){  
      var page_id = request.params['id'];
      var page = Page.find(page_id);   
      
      request.renderPage(page);
    });
  });   
  
   this.put('#/pages/:page_id', function(request){  
    console.log('here')
    var page_id = request.params['page_id'],
      page = Page.find(page_id),   
      attributes = request.params['page'];  
      
    page.attr(request.params['page']);   
    page.saveRemote({
      success: function(){
        request.redirect('#/pages');
      }
    });  
  });
  
  this.get('#/pages/:id/remove', function(request){   
    this.loadPages(function(){   
      var page_id = request.params['id'];
      var page = Page.find(page_id);         
      var displayContents = $('<div />').attr({'id': 'remove-page-container', 'class': 'small-modal'});   
      
      if($('#modal').length == 0){ Galerie.open(displayContents); } 
      
      if(application.first_run){
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
      asset.addToPage(page_id,function(){
        request.renderPage(page); 
        request.redirect('#/pages/' + page_id + '/edit');  
      });
    });  
  }); 
      
  this.get('#/pages/:page_id/assets/:id/test', function(request){ 
    this.loadPages(function(){ 
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);  
      var asset_id = request.params['id'];
      var asset = Asset.find(asset_id); 
      
      Asset.removeFromPage(asset_id, page_id,function(){
        request.renderPage(page);
        request.redirect('#/pages/' + page_id + '/edit');  
      }); 
    }); 
  });

  // Page parts 
  // --------------------------------------------- 
  this.get('#/pages/:page_id/parts/new', function(request){   
    this.loadPages(function(){ 
      var page = Page.find(request.params['page_id']); 

      if($('#modal').length == 0){ Galerie.open(); }  

      var newPart = request.render('/templates/admin/parts/new.mustache', { page: page.asJSON() });    
      newPart.replace('#modal');   
      
      if(application.first_run){ request.renderPage(page); }  
    });  
  });  
  
  this.post('/pages/:page_id/parts', function(request){
    this.loadPages(function(){ 
      var page_id = request.params['page_id'];    
      var attributes = request.params['part'];  
      Part.create(attributes, function(){
        request.redirect('#/pages/' + page_id + '/edit');
      });
    });
  });  
  
  this.get('/pages/:page_id/parts/:id/remove', function(request){   
    this.loadPages(function(){
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id); 
      var part = page.parts().find(request.params['id']);     
 
      if($('#modal').length == 0){ Galerie.open(); } 

      var removePart = request.render('/templates/admin/parts/remove.mustache', { part: part.asJSON() });    
      removePart.replace('#modal');  
      if(application.first_run){ request.renderPage(page); }
    });  
  });
  
  this.del('/pages/:page_id/parts/:id', function(request){
    var page_id = request.params['page_id'];    
    var page = Page.find(page_id);
    var part = page.parts().find(request.params['id']);  
      
    part.deleteRemote(page, function(){
      request.redirect('#/pages/' + page_id + '/edit');
    }); 
  });    
      
  app.get('/', function (req) {
    // jQuery('h1').text('Start Page');
  });

});