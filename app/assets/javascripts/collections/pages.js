Verlag.Collection.Pages = Backbone.Collection.extend({
  
  model: Verlag.Model.Page,

  url: '/api/v1/pages',

  initialize: function() {
  
  }, 
  
  root: function(){
    return this.detect(function(page){
      return !page.get('parent_id');
    });
  },
  
  find_by_parent_id: function(id){
    return this.select(function(page){
      return page.get('parent_id') == id;
    });
  },
  
  find_by_path: function(path){
    return this.detect(function(page){
      return page.get('path') == path;
    });
  }
  
});
