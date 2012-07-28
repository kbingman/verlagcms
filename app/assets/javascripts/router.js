// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                     'show_index', 
    'admin/':               'show_index',
    'admin/pages':          'pagesIndex',
    'admin/pages/:id':      'showPage',
    'admin/folders':        'foldersIndex',
    'admin/folders/:id':    'showFolder',
    'admin/assets/:id':     'showAsset',
    'admin/templates':      'templates_index',
    'admin/templates/:id':  'show_template',
    'admin/settings':       'show_settings'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  // Pages
  // ------------------------------------------------------------ //
  pagesIndex: function(){
    this.cleanup(Verlag.editor);
    
    var id = Verlag.pages.first().id;
    // Verlag.sidebar = new Verlag.View.PageIndex();
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  },
  
  showPage: function(id){
    // this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
        
    // Verlag.sidebar = new Verlag.View.PageIndex();
    // Verlag.editor = new Verlag.View.PagePreview({ id: id });
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  }, 
  
  // Folders
  // ------------------------------------------------------------ //
  foldersIndex: function(){
    this.cleanup(Verlag.editor);
    
    var id = Verlag.folders.first().id;
    Verlag.sidebar = new Verlag.View.Assets({ id: id });
  },
  
  showFolder: function(id){
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.Assets({ 
      id: id
    });
  },
  
  // Assets
  // ------------------------------------------------------------ //
  showAsset: function(id){
    this.cleanup(Verlag.editor);
    
    Verlag.modal = new Verlag.View.Asset({ id: id }, function(asset){
      Verlag.editor = new Verlag.View.Assets({ 
        id: asset.get('folder_id')
      });
    });
  },
  
  // Design / Templates
  // ------------------------------------------------------------ //
  templates_index: function(){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    var id = Verlag.templates.findByKlass('Layout')[0].id;
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
  },
  
  show_template: function(id){
    this.cleanup(Verlag.sidebar);
    this.cleanup(Verlag.editor);
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
  },
  
  show_settings: function(){
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
