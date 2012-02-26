// Backbone router
Verlag.Router = Backbone.Router.extend({
  
  routes: {
    '':                                    'show_index', 
    'admin/':                              'show_index',
    'admin/pages':                         'show_pages',
    'admin/pages/:id':                     'show_page',
    'admin/folders':                       'folders_index',
    'admin/folders/:id':                   'show_folder',
    'admin/folders/:folder_id/assets/:id': 'show_asset'
  },
  
  show_index: function(){
    console.log('started');
  },
  
  show_pages: function(){
    Verlag.views.page_index = new Verlag.View.PageIndex({ el: $('#sidebar') });
    Verlag.views.page_index.render();
  },
  
  show_page: function(id){
    var page_index = new Verlag.View.PageIndex({ el: $('#sidebar') });
    var preview = new Verlag.View.PagePreview({ el: $('#editor') });
    
    preview.render(id);
    page_index.render();
  }, 
  
  folders_index: function(){
    var index_view = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    index_view.render();
  },
  
  show_folder: function(id){
    var index_view = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    var folder_view = new Verlag.View.Folder({ el: $('#editor') });
    
    index_view.render();
    folder_view.render(id);
  },
  
  show_asset: function(folder_id, id){
    var index_view = new Verlag.View.AssetIndex({ el: $('#sidebar') });
    var folder_view = new Verlag.View.Folder({ el: $('#editor') });
    var asset_view = new Verlag.View.Asset({ el: $('body') });
    
    index_view.render();
    folder_view.render(folder_id, function(){
      asset_view.render(folder_id, id);
    });
  }
  
});
