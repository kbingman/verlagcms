// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                     'show_index', 
    'admin/':                               'show_index',
    'admin/pages':                          'pagesIndex',
    'admin/pages/:id':                      'showPage',
    'admin/folders':                        'foldersIndex',
    'admin/folders/:id':                    'showFolder',
    'admin/folders/:folder_id/assets/:id':  'showAsset',
    'admin/templates':                      'templatesIndex',
    'admin/templates/:id':                  'showTemplate',
    'admin/settings':                       'showSettings'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  pagesIndex: function(){
    var id = Verlag.pages.first().id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  showPage: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    Verlag.sidebar = new Verlag.View.PageIndex();
    // Verlag.editor = new Verlag.View.PagePreview({ id: id });
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  foldersIndex: function(){
    var id = Verlag.folders.first().id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  showFolder: function(id){
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.Folders();
    Verlag.editor = new Verlag.View.Assets({ 
      id: id
    });
  },
  
  // Assets
  // ------------------------------------------------------------ //
  showAsset: function(folder_id, id){
    this.cleanup(Verlag.editor);
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.modal);
    
    Verlag.sidebar = new Verlag.View.Folders();
    Verlag.editor = new Verlag.View.Assets({ 
      id: folder_id,
      success: function(){
        Verlag.modal = new Verlag.View.Asset({ 
          id: id,
          folder_id: folder_id
        });
      }
    });

  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templatesIndex: function(){
    var id = Verlag.templates.findByKlass('Layout')[0].id,
        path = document.location.pathname + '/' + id;
        
    Verlag.router.navigate(path, { trigger: true });
  },
  
  showTemplate: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
  },
  
  showSettings: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.SiteSettings();
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
