Verlag.View.Loader = Backbone.View.extend({

  el: 'body',

  initialize: function(options) {
    this.render();
    this.loader = (this.$el).find('#loader');
  },

  render: function() {
    $(HoganTemplates['shared/loader'].render()).appendTo(this.$el);
  },
  
  hide: function(){
    this.loader.hide();
  },
  
  show: function(){
    this.loader.show();
  }  
  
});
