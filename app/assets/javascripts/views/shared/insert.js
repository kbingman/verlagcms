Verlag.View.Insert = Backbone.View.extend({

  el: 'body',

  events: {
    
  },

  initialize: function(options) {
    $(this.el).undelegate();
    this.model = options.model;
    this.render();
  },

  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/insert'],
        partials = {},
        data = { 
          model: model.toJSON()
        };
        
    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  }
  

});
