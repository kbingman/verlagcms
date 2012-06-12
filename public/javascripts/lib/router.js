// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                       'show_index', 
    'admin/':                                 'show_index',
    'admin/pages':                            'show_pages',
    'admin/pages/:id':                        'show_page',
    'admin/folders':                          'folders_index',
    'admin/folders/new':                      'new_folder',
    'admin/folders/:id':                      'show_folder',
    'admin/folders/:folder_id/assets/:id':    'show_asset',
    'admin/templates':                        'templates_index',
    'admin/templates/:id':                    'show_template',
    'admin/folders/:id/remove':               'remove_model'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  show_pages: function(){
    this.cleanup(Verlag.sidebar);
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    Verlag.sidebar.render();
  },
  
  show_page: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    Verlag.editor = new Verlag.View.PagePreview({ el: $('#editor') });
    
    Verlag.editor.render(id);
    Verlag.sidebar.render();
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  folders_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.sidebar.render();
  },
  
  new_folder: function(){
    this.cleanup(Verlag.modal);

    Verlag.modal = new Verlag.View.NewFolder();
    Verlag.modal.render();
  },
  
  show_folder: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.editor = new Verlag.View.Folder();
    
    Verlag.sidebar.render();
    Verlag.editor.render(id);
  },
  
  // Assets
  // ------------------------------------------------------------ //
  show_asset: function(folder_id, id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.FolderIndex();
    Verlag.editor = new Verlag.View.Folder();
    
    Verlag.sidebar.render();
    Verlag.editor.render(folder_id, function(){
      Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
      Verlag.modal.render();
    });
  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templates_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
  },
  
  show_template: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
    Verlag.editor.render();
  },
  
  remove_model: function(id){
    this.cleanup(Verlag.modal);

    Verlag.modal = new Verlag.View.Remove();
    Verlag.modal.render();
  },
  
  cleanup: function(view){
    if(view){
      view.off();
      // $(view.el).undelegate();
    }
  }
  
});
