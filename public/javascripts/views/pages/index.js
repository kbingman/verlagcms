Verlag.View.PageIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a[rel="edit_page"]': 'show_page_preview'
  },

  initialize: function() {
    // $(this.el).undelegate('a[rel="edit_page"]', 'click');
    $(this.el).undelegate();
  },

  render: function() {
    var root = Verlag.pages.root(),
      template = Verlag.compile_template('admin-pages-index'),
      partials = { 
        node:  Verlag.compile_template('admin-pages-node') 
      },
      data = { 
        root: root.to_json()
      };
      
    $(this.el).html(template.render(data, partials));
  }, 
  
  show_page_preview: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    Verlag.editor = new Verlag.View.PagePreview({ el: $('#editor') });
    Verlag.editor.render(id);
  }

});