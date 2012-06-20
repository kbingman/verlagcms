// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                       'show_index', 
    'admin/':                                 'show_index',
    'admin/pages':                            'show_pages',
    'admin/pages/:id':                        'show_page',
    'admin/folders':                          'folders_index',
    'admin/folders/:id':                      'show_folder',
    'admin/folders/:folder_id/assets/:id':    'show_asset',
    'admin/templates':                        'templates_index',
    'admin/templates/:id':                    'show_template',
    'admin/settings':                         'show_settings'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  show_pages: function(){
    this.cleanup(Verlag.sidebar);
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    
    $('#editor').html('');
  },
  
  show_page: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    Verlag.sidebar = new Verlag.View.PageIndex();
    Verlag.editor = new Verlag.View.PagePreview({ id: id });
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  folders_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    $('#editor').html('');
  },
  
  show_folder: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id
    });
  },
  
  // Assets
  // ------------------------------------------------------------ //
  show_asset: function(folder_id, id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id,
      success: function(){
        Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
        Verlag.modal.render();        
      }
    });
  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templates_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    $('#editor').html('');
  },
  
  show_template: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
    Verlag.editor.render();
  },
  
  show_settings: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.Settings();
  },
  
  // Shared
  // ------------------------------------------------------------ //
  cleanup: function(view){
    if(view){
      view.off();
      $(view.el).undelegate();
    }
  }
  
});
