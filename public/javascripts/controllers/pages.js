Pages = Sammy(function (app) {
   
  this.use(Sammy.Title);
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

      var table = new TableView(); 
      jQuery('#pages').html(table.html);  
      
      var target = $('#pages tbody'); 
      application.renderNode(target, page);
    },
    
    // Renders each node in the page tree
    renderNode: function(target, page){ 
      var application = this;
      var node = new NodeView (page.asJSON()); 
        
      target.append(node.html); 
      page.children().each(function(child){ 
        application.renderNode(target, child);
      });
    } 
    
  });

  this.bind('run', function () {
    app.modal = false;  
  });

  // Page routes
  // ---------------------------------------------  
  this.get('#/pages', function(request){ 
    Galerie.close();  
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
      
      request.renderTree(Page.root());
      var newPage = new NewPageView({ parent: page.asJSON() });
      newPage.render();
    }); 
  });
  
  this.get('#/pages/:id/edit', function(request){  
    Galerie.close();   
    this.loadPages(function(){  
      var page_id = request.params['id'];
      var page = Page.find(page_id);         
      var editPage = new FormView({ page: page.attributes });   
      jQuery('#pages').html(editPage.html);
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
  
  this.get('#/pages/:id/remove', function(request){   
    this.loadPages(function(){   
      var page_id = request.params['id'];
      var page = Page.find(page_id);         
      var displayContents = $('<div />').attr({'id': 'remove-page-container', 'class': 'small-modal'});   
      
      if($('#modal').length == 0){ Galerie.open(displayContents); } 
      
      request.renderTree(Page.root());   
      var removePage = new RemovePageView({ page: page.asJSON() });
      removePage.render();
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
      var page_id = request.params['id'];  
      var page = Page.find(page_id);   
      
      var searchForm = new SearchFormView({ page: page.attributes });    
      
      if($('#modal').length == 0){
        Galerie.open(searchForm.html);
        jQuery('#modal #search-results').html('');
      }
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
        var searchResults = new SearchResultsView(Asset.toMustache()); 
        searchResults.render();
        // jQuery('#modal #search-results').html(searchResults.html);
      });
    });
  });   
  
  this.get('#/pages/:page_id/assets/:id/add', function(request){ 
    this.loadPages(function(){   
      var page_id = request.params['page_id'];  
      var page = Page.find(page_id);  
      var asset = Asset.find(request.params['id']);
      asset.addToPage(page_id,function(){
        var editPage = new FormView({ page: page.attributes });   
        jQuery('#pages').html(editPage.html); 
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
        var editPage = new FormView({ page: page.attributes });   
        jQuery('#pages').html(editPage.html); 
        request.redirect('#/pages/' + page_id + '/edit');  
      }); 
    }); 
  });
  // 
  // 
  // // Page parts 
  // // --------------------------------------------- 
  // this.get('#/pages/:page_id/parts/new', function(request){   
  //   // TODO use a model for this
  //   var page_id = request.params['page_id']; 
  //   var displayContents = $('<div />').attr({'id': 'new-part-container', 'class': 'small-modal'});
  //   if($('#modal').length == 0){
  //     Galerie.open(displayContents);
  //   } 
  // 
  //   var newPart = new NewPartView({page: { 'id': page_id } });
  //   newPart.render();  
  // });  
  // 
  // this.post('/pages/:page_id/parts', function(request){
  //   var page_id = request.params['page_id'];    
  //   var attributes = request.params['part'];  
  //   Part.create(attributes, function(){
  //     // var editParts = new EditPartsView(Part.toMustache());
  //     // editParts.render(); 
  //     request.redirect('#/pages/' + page_id + '/edit');
  //   }); 
  // });  
  // 
  // this.get('/pages/:page_id/parts/:id/remove', function(request){   
  //   // TODO use a model for this
  //   var page_id = request.params['page_id'];  
  //   var page = Page.find(page_id); 
  //   var part = page.parts().find(request.params['id']); 
  //   var displayContents = $('<div />').attr({'id': 'remove-part-container', 'class': 'small-modal'});
  //   if($('#modal').length == 0){
  //     Galerie.open(displayContents);
  //   } 
  // 
  //   var removePart = new RemovePartView({ part: part.asJSON() });
  //   removePart.render();  
  // });
  // 
  // this.del('/pages/:page_id/parts/:id', function(request){
  //   var page_id = request.params['page_id'];    
  //   var page = Page.find(page_id);
  //   var part = page.parts().find(request.params['id']);  
  //     
  //   part.deleteRemote(page, function(){
  //     request.redirect('#/pages/' + page_id + '/edit');
  //   }); 
  // });    
  //     
  // app.get('/', function (req) {
  //   // jQuery('h1').text('Start Page');
  // });

});