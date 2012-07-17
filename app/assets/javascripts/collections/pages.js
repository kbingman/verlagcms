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
  
  findByParentId: function(id){
    return this.select(function(page){
      return page.get('parent_id') == id;
    });
  },
  
  findByPath: function(path){
    return this.detect(function(page){
      return page.get('path') == path;
    });
  }
  
});
