Verlag.Model.Asset = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  url: function() {
    return '/admin/folders/' + this.get('folder_id') + '/assets/' + this.id + '.json';
  },
  
  initialize: function() {
    
  }
  
  
});
