Verlag.Collection.Folders = Backbone.Collection.extend({
  
  model: Verlag.Model.Folder,

  url: '/admin/folders.json',

  initialize: function() {
  
  }
  
  // root: function(){
  //   return this.detect(function(page){
  //     return !page.get('parent_id');
  //   });
  // },
  // 
  // find_by_parent_id: function(id){
  //   return this.detect(function(page){
  //     return page.get('parent_id') == id;
  //   });
  // },
  // 
  // find_by_path: function(path){
  //   return this.detect(function(page){
  //     return page.get('path') == path;
  //   });
  // }
  
});
