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
        stylesheets: Layout.find_all_by_class('Stylesheet').map(function(item){ return item.attributes }),
        files: Layout.find_all_by_class('Upload').map(function(item){ return item.attributes }) 
      }, 'mustache');
      layoutIndex.replace('#sidebar');
    },  
    
    renderLayout: function(layout){ 
      var application = this;     
      var editLayout = application.load(jQuery('script#admin-templates-edit')).interpolate({ 
        layout: layout.asJSON(),
        filters: [
          // { name: 'none', value: 'none', selected: ((layout.attr('filter') == 'none') ? 'selected="selected"' : '') },
          { name: 'CSS', value: 'none', selected: ((layout.attr('filter') == 'css') ? 'selected="selected"' : '') }, 
          { name: 'Sass', value: 'sass', selected: ((layout.attr('filter') == 'sass') ? 'selected="selected"' : '') }, 
          { name: 'SCSS', value: 'scss', selected: ((layout.attr('filter') == 'scss') ? 'selected="selected"' : '') },
          { name: 'Partial', value: 'none', selected: ((layout.attr('filter') == 'none') ? 'selected="selected"' : '') }
        ]
      }, 'mustache');    
      editLayout.replace('#editor').then(function(){
        // ACE editor
        var mode = layout.attr('mode'); 
        var editorMode = aceModes[mode];
        window.editor = ace.edit('layout_content');
        window.editor.setTheme('ace/theme/textmate');
        window.editor.getSession().setMode(new editorMode);
        window.editor.session.setUseWrapMode(true);
        // Because Mustache screws up my liquid templates, I just set it manually, directly from the model
        // This also eleminates the FUC
        window.editor.getSession().setValue(layout.attr('content'));
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
    
    jQuery('#editor').html('<h1 class="section">Templates</div>'); 
    request.renderLayoutIndex(Layout.all());           
  });
  
  // New Layout
  // ---------------------------------------------
  this.get('/admin/templates/new/:klass', function(request){    
    var displayContents = $('<div />').attr({'id': 'new-page-container', 'class': 'small-modal'});
    var klass = request.params['klass'];
    if ($('#modal').length == 0){ Galerie.open(displayContents); } 
    var newLayout = request.load(jQuery('#admin-templates-new')).interpolate({ 
      klass: klass,
      file: klass == 'upload' ? true : false
    }, 'mustache'); 
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
        
        // ACE editor
        var editorMode = aceModes[template.attr('mode')];
        window.editor.getSession().setUseSoftTabs(true);
        window.editor.getSession().setTabSize(2);
        window.editor.getSession().setMode(new editorMode);
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