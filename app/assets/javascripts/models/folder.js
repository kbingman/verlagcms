Verlag.Model.Folder = Backbone.Model.extend({
  
  // urlRoot: '/admin/folders',
  
  url: function() {
    if (this.id){
      path = '/admin/folders/' + this.id + '.json';
    } else {
      path = '/admin/folders.json'
    }
    return path
  },
  
  initialize: function() {
    
  },
  
  fetch_assets: function(callback){
    var self = this;
    $.ajax({
      url: '/admin/folders/' + self.id + '/children.json',
      success: function(response){
        var assets = new Verlag.Collection.Assets(response);
        if(callback){
          callback.call(this, assets, response);
        }
      }
    });
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.id 
  }
  
  
});
