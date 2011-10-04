var Layouts = Sammy(function (app) {   
  
  var context = this;  
  
  // Helper Methods 
  // ---------------------------------------------
  this.helpers({  
    
    // Checks for loaded Layouts, renders the table, then executes the callback   
    loadLayouts: function(callback){  
      var application = this; 
      if(callback){ callback.call(this); } 
    },
    
    // Renders the Page tree
    renderLayoutIndex: function(){   
      var application = this;
      var layoutIndex = application.load(jQuery('script#admin-templates-index')).interpolate({
        layouts: Layout.find_all_by_class('Layout').map(function(item){ return item.attributes }), 
        partials: Layout.find_all_by_class('Partial').map(function(item){ return item.attributes }), 
        javascripts: Layout.find_all_by_class('Javascript').map(function(item){ return item.attributes }),
        stylesheets: Layout.find_all_by_class('Stylesheet').map(function(item){ return item.attributes }) 
      }, 'mustache');
      layoutIndex.replace('#sidebar');
    },  
    
    renderLayout: function(layout){ 
      var application = this;     
      var editLayout = application.load(jQuery('script#admin-templates-edit')).interpolate({ 
        layout: layout.asJSON(),
        filters: [
          { name: 'none', value: 'css', selected: ((layout.attr('filter') == 'css') ? 'selected="selected"' : '') }, 
          { name: 'Sass', value: 'sass', selected: ((layout.attr('filter') == 'sass') ? 'selected="selected"' : '') }, 
          { name: 'Scss', value: 'scss', selected: ((layout.attr('filter') == 'scss') ? 'selected="selected"' : '') }
        ]
      }, 'mustache');    
      editLayout.replace('#editor').then(function(){
        // Because liquid templates use a syntax that is very similar to 
        // Mustache, this manually sets the content. A bit of a hack, but hey, sue me. 
        var editor_field = jQuery('#layout_content');
        // editor_field.attr('value', layout.attr('content'));   
        var mode = editor_field.attr('class'); 
        
        // ACE editor
        window.editor = ace.edit('layout_content');
        window.editor.setTheme('ace/theme/textmate');

        var editorMode = aceModes[mode];
        window.editor.getSession().setMode(new editorMode());
        // Utilities.formObserver('#layout_content, #layout_name'); 
      });
    }
    
  });

  this.bind('run', function () { 
    context.refresh_templates = true; 
    context.refresh_pages = true;
    context.modal = false;  
  });

  // Layout Index
  // ---------------------------------------------  
  this.get('/admin/templates', function(request){  

    context.refresh_templates = false; 
    context.refresh_pages = true;     
    
    jQuery('#editor').html('<h1 class="section">Templates</div>'); 
    request.renderLayoutIndex(Layout.all());           
  });
  
  // New Layout
  // ---------------------------------------------
  this.get('/admin/templates/new/:klass', function(request){    
    var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});
    
    if ($('#modal').length == 0){ Galerie.open(displayContents); } 
    var newLayout = request.load(jQuery('#admin-templates-new')).interpolate({ klass: request.params['klass']}, 'mustache'); 
    newLayout.replace('#new-page-container');       
    request.renderLayoutIndex(Layout.all());  
  });  
  
  // Create Layout
  // ---------------------------------------------  
  this.post('/admin/templates', function(request){
    var template = new Layout(request.params['template']);
    
    template.save(function(success, results){   
      var response = JSON.parse(results.responseText);   
      if(response.errors){
        // alert(JSON.stringify(response));  
        Utilities.notice(JSON.stringify(response));
      }else{  
        request.redirect('/admin/templates'); 
        Utilities.notice('Successfully saved template');
      }
    });
  });

  // Edit Layout
  // ---------------------------------------------
  this.get('/admin/templates/:id/edit', function(request){  
    context.refresh_pages = true;       
    var layout = Layout.find(request.params['id']); 
    
    request.renderLayout(layout);   
    request.renderLayoutIndex(Layout.all()); 
  });   
  
  // Update Layout
  // ---------------------------------------------
  this.put('/admin/templates/:id', function(request){  
    var template = Layout.find(request.params['id']);   
    
    // Sets the layout content to the ACE editor value
    request.params['layout']['content'] = window.editor.getSession().getValue();
    
    template.attr(request.params['layout']);  
    template.save(function(success, results){
      if(success){ 
        request.renderLayoutIndex(); 
        Utilities.notice('Successfully saved template');
      }
    });  
  });
  
  // Remove Layout
  // ---------------------------------------------
  this.get('/admin/templates/:id/remove', function(request){  
    var layout = Layout.find(request.params['id']); 
    Galerie.open();   
    
    var removeTemplate = request.load(jQuery('#admin-templates-remove')).interpolate({ layout: layout.asJSON() }, 'mustache');
    removeTemplate.replace('#modal');
    
    request.renderLayoutIndex(Layout.all()); 
  }); 
  
  // Destroy Layout
  // ---------------------------------------------
  this.del('/templates/:id', function(request){    
    var template = Layout.find(request.params['id']);               
      
    template.destroy(function(success, results){
      if(success){ 
        request.renderLayoutIndex(); 
        Utilities.notice('Successfully deleted template');
        request.redirect('/admin/templates'); 
      }
    }); 
  });  
  
  
  // 
  // // Layout parts 
  // // --------------------------------------------- 
  // this.get('#/pages/:page_id/parts/new', function(request){   
  //   this.loadPages(function(){ 
  //     var page = Page.find(request.params['page_id']); 
  // 
  //     if($('#modal').length == 0){ Galerie.open(); }  
  // 
  //     var newPart = request.render('/templates/admin/parts/new.mustache', { page: page.asJSON() });    
  //     newPart.replace('#modal');   
  //     
  //     if(context.refresh_templates){ request.renderPage(page); }  
  //   });  
  // });  
  // 
  this.post('/layouts/:id/parts', function(request){
    this.loadLayouts(function(){ 
      var template_id = request.params['id'];    
      var attributes = request.params['part']; 
      Part.create(attributes, function(){
        request.redirect('/admin/templates/' + template_id + '/edit');
      });
    });
  });  
  // 
  // this.get('/pages/:page_id/parts/:id/remove', function(request){   
  //   this.loadPages(function(){
  //     var page_id = request.params['page_id'];  
  //     var page = Page.find(page_id); 
  //     var part = page.parts().find(request.params['id']);     
  // 
  //     if($('#modal').length == 0){ Galerie.open(); } 
  // 
  //     var removePart = request.render('/templates/admin/parts/remove.mustache', { part: part.asJSON() });    
  //     removePart.replace('#modal');  
  //     if(context.refresh_templates){ request.renderPage(page); }
  //   });  
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

});