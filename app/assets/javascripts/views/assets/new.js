Verlag.View.NewAsset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click button.js-create': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    
    this.folder = Verlag.folders.get(options.id);
    // this.asset = new Verlag.Asset({
    //   folder_id: options.id
    // })
    this.render();
  },

  render: function() {
    var template = Verlag.compile_template('admin-assets-new'),
        data = {
          asset: {}
        };

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  create: function(e){
    e.preventDefault();
    alert('hey')
  }
  
});
