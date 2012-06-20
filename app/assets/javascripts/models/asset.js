Verlag.Model.Asset = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/assets/' + this.id + '.json';
  // },
  
  urlRoot: '/admin/assets',
  
  initialize: function() {
    
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.folder_id + '/assets/' + this.id 
  }
  
  
});
