Verlag.Collection.PageTypes = Backbone.Collection.extend({
  
  model: Verlag.Model.PageType,
  
  url: '/admin/page_types',

  initialize: function() {
    console.log('hey')
  }
  
});
