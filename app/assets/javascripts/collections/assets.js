Verlag.Collection.Assets = Backbone.Collection.extend({
  
  model: Verlag.Model.Asset,

  url: '/admin/assets',
  
  // url: function(folder_id){
  //   return '/admin/folders/' + folder_id + '/assets.json'
  // },

  initialize: function() {
  
  }

  
});