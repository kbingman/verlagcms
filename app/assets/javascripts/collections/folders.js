Verlag.Collection.Folders = Backbone.Collection.extend({
  
  model: Verlag.Model.Folder,

  url: '/api/v1/folders',

  initialize: function() {
  
  }
  
});
