Verlag.View.PagePreview = Backbone.View.extend({

  //... is a div tag.
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    // 'click a': 'show_page_preview'
  },

  initialize: function() {
    // $(this.el).undelegate('a', 'click');
  },

  render: function(id) {
    var page = Verlag.collections.pages.get(id),
      template = Verlag.compile_template('admin-pages-show'),
      data = { 
        page: page.to_json()
      };
    
    $('#editor').html(template.render(data));
    $('#sidebar li.node').removeClass('active')
    $('li#page-' + page.id).addClass('active');
  }

});
