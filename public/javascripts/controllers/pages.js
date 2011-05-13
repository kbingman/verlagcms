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
      
    if(Page.all().length == 0 ){
       Page.load(function(){});
    }else{
      var table = new TableView(); 
      jQuery('#pages').html(table.html);  
      var target = $('#pages tbody');
      application.renderNode(target, Page.root());
    }
  });
  
  this.get('/pages/:page_id/edit', function(request){ 
    Galerie.close();
    var page_id = request.params['page_id']; 
    jQuery('#pages').html('');
    page = Page.find(page_id);
    console.log(page.attr('title'));
    
    jQuery('#new-part-container').html('');
    PagePart.load(page_id, function(){   
      var editParts = new EditPartsView(PagePart.toMustache());
      editParts.render();
    });
  });
  
  this.get('/pages/:page_id/parts/new', function(request){   
    // TODO use a model for this
    var page_id = request.params['page_id']; 
    var displayContents = $('<div />').attr('id', 'new-part-container');
    if($('#modal').length == 0){
      Galerie.open(displayContents);
    } 

    var newPart = new NewPartView({page: { 'id': page_id } });
    newPart.render();  
  }); 
  
  this.post('/pages/:page_id/parts', function(request){
    var page_id = request.params['page_id'];    
    var attributes = request.params['part'];  
    PagePart.create(attributes, function(){
      // var editParts = new EditPartsView(PagePart.toMustache());
      // editParts.render(); 
      request.redirect('/pages/' + page_id + '/edit');
    }); 
  });
      
  app.get('/', function (req) {
    // jQuery('h1').text('Start Page');
  });

});