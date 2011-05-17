Pages = Sammy(function (app) {
   
  this.use(Sammy.Title);
  this.use(Sammy.NestedParams);
  
  // Helper Methods
  this.helpers({
    renderNode: function(target, page){
      var node = new NodeView (page.asJSON()); 
      var application = this;  
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
  
  this.get('/pages', function(request){    
    var application = this; 
    Galerie.close();                
      
    if(Page.all().length == 0 ){
      Page.load(function(){
        
      });
    } else {
      var table = new TableView(); 
      jQuery('#pages').html(table.html);  
      var target = $('#pages tbody');
      application.renderNode(target, Page.root());
    }
  });
  
  this.get('/pages/:id/new', function(request){   
    var page_id = request.params['id'];   
    var page = Page.find(page_id)
    
    var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 

    var newPage = new NewPageView({ parent: page.asJSON() });
    newPage.render();
  });
  
  this.get('/pages/:page_id/edit', function(request){ 
    Galerie.close();    
    var page_id = request.params['page_id']; 
    
    if(Page.all().length == 0 ){
       Page.load(function(){});
       page = Page.find(page_id);  
    } else {                  
      
       page = Page.find(page_id);  
       var editPage = new FormView({ page: page.attributes });   
       jQuery('#pages').html(editPage.html);   
    } 
  });   
  
  this.post('/pages/:page_id', function(request){
    var page_id = request.params['page_id']; 
    var parent = Page.find(page_id)   
    var attributes = request.params['page'];  
    Page.create(attributes, function(){
      request.redirect('/pages');
    }); 
  });
  
  this.get('/pages/:id/remove', function(request){   
    // TODO use a model for this
    var page_id = request.params['id'];  
    var page = Page.find(page_id); 

    var displayContents = $('<div />').attr({'id': 'remove-page-container', 'class': 'small-modal'});
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 

    var removePage = new RemovePageView({ page: page.asJSON() });
    removePage.render();  
  }); 
  
  this.del('/pages/:id', function(request){
    var page_id = request.params['id'];    
    var page = Page.find(page_id);               
      
    page.deleteRemote(function(){
      request.redirect('/pages');
    }); 
  });  
  
  // Page assets browser    
  // --------------------------------------------- 
  this.get('/pages/:id/assets/test', function(request){   
    var page_id = request.params['id'];  
    var page = Page.find(page_id); 
    
    var displayContents = $('<div />').attr({'id': 'assets-index-container', 'class': 'small-modal'}); 
    
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 
    
    var searchForm = new SearchFormView();
    jQuery('#modal').prepend(searchForm.html); 
  });
  
  // Page parts 
  // --------------------------------------------- 
  this.get('/pages/:page_id/parts/new', function(request){   
    // TODO use a model for this
    var page_id = request.params['page_id']; 
    var displayContents = $('<div />').attr({'id': 'new-part-container', 'class': 'small-modal'});
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 

    var newPart = new NewPartView({page: { 'id': page_id } });
    newPart.render();  
  });  
  
  this.post('/pages/:page_id/parts', function(request){
    var page_id = request.params['page_id'];    
    var attributes = request.params['part'];  
    Part.create(attributes, function(){
      // var editParts = new EditPartsView(Part.toMustache());
      // editParts.render(); 
      request.redirect('/pages/' + page_id + '/edit');
    }); 
  });  
  
  this.get('/pages/:page_id/parts/:id/remove', function(request){   
    // TODO use a model for this
    var page_id = request.params['page_id'];  
    var page = Page.find(page_id); 
    var part = page.parts().find(request.params['id']); 
    var displayContents = $('<div />').attr('id', 'remove-part-container');
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 

    var removePart = new RemovePartView({ part: part.asJSON() });
    removePart.render();  
  });
  
  this.del('/pages/:page_id/parts/:id', function(request){
    var page_id = request.params['page_id'];    
    var page = Page.find(page_id);
    var part = page.parts().find(request.params['id']);  
      
    part.deleteRemote(page, function(){
      request.redirect('/pages/' + page_id + '/edit');
    }); 
  });   
  

      
  app.get('/', function (req) {
    // jQuery('h1').text('Start Page');
  });

});