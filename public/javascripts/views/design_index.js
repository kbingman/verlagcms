Verlag.View.DesignIndex = Backbone.View.extend({

  //... is a div tag.
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    // 'click a[rel="show_folder"]': 'show_folder'
  },

  initialize: function() {
    // $(this.el).undelegate('a[rel="show_folder"]', 'click');
  },

  render: function() {
    var template = Verlag.compile_template('admin-templates-index'),
        data = {};
    
    $('#sidebar').html(template.render(data)); 
  }

});
