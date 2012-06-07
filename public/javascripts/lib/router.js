// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                    'show_index', 
    'admin/':                              'show_index',
    'admin/pages':                         'show_pages',
    'admin/pages/:id':                     'show_page',
    'admin/folders':                       'folders_index',
    'admin/folders/:id':                   'show_folder',
    'admin/folders/:folder_id/assets/:id': 'show_asset',
    'admin/templates':                        'templates_index',
    'admin/templates/:id':                    'show_template'
  },
  
  show_index: function(){
    // console.log('started');
  },
  
  show_pages: function(){
    if (Verlag.sidebar){
      Verlag.sidebar.off();
      Verlag.sidebar = null;
    }
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    Verlag.sidebar.render();
  },
  
  show_page: function(id){
    Verlag.sidebar = new Verlag.View.PageIndex({ el: $('#sidebar') });
    Verlag.editor = new Verlag.View.PagePreview({ el: $('#editor') });
    
    Verlag.editor.render(id);
    Verlag.sidebar.render();
  }, 
  
  folders_index: function(){
    Verlag.sidebar = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    Verlag.sidebar.render();
  },
  
  show_folder: function(id){
    Verlag.sidebar = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    Verlag.editor = new Verlag.View.Folder({ el: $('#editor') });
    
    Verlag.sidebar.render();
    Verlag.editor.render(id);
  },
  
  show_asset: function(folder_id, id){
    Verlag.sidebar = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    Verlag.editor= new Verlag.View.Folder({ el: $('#editor') });
    
    Verlag.sidebar.render();
    Verlag.editor.render(folder_id, function(){
      var asset_view = new Verlag.View.Asset({ folder_id: folder_id, id: id });
      asset_view.render(folder_id, id);
    });
  },
  
  templates_index: function(){
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
  },
  
  show_template: function(id){
    Verlag.sidebar = new Verlag.View.DesignIndex();
    Verlag.sidebar.render();
    
    Verlag.editor = new Verlag.View.DesignEdit({ id: id });
    Verlag.editor.render();
  },
  
  cleanup: function(view){
    view.off();
    // view.remove();
  }
  
});
