Verlag.Model.Folder = Backbone.Model.extend({
  
  urlRoot: '/api/v1/folders',
  
  // fetchAssets: function(callback){
  //   var self = this;
  //   $.ajax({
  //     url: '/admin/folders/' + self.id + '/children.json',
  //     success: function(response){
  //       var assets = new Verlag.Collection.Assets(response);
  //       if(callback){
  //         callback.call(this, assets, response);
  //       }
  //     }
  //   });
  // },
  
  adminPath: function(){
    return '/admin/folders/' + this.id 
  }
  
  
});
