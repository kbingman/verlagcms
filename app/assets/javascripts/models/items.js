Verlag.Model.Item = Backbone.Model.extend({
  
  urlRoot: '/admin/items',
  
  initialize: function() {
    
  },
  
  fetchByFolderId: function(id, callback){
    $.ajax({
      url: '/admin/items/' + id + '/children.json',
      success: function(response){
        var items = new Verlag.Collection.Assets(response);
        if(callback){
          callback.call(this, items, response);
        }
      }
    });
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.id 
  }
  
  
});
