Verlag.View.AssetIndex = Backbone.View.extend({

  //... is a div tag.
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a[rel="show_folder"]': 'show_folder'
  },

  initialize: function() {
    $(this.el).undelegate('a[rel="show_folder"]', 'click');
  },

  render: function() {
    var folders = Verlag.collections.folders,
      template = Verlag.compile_template('admin-folders-index'),
      data = { 
        folders: folders.toJSON()
      };
    
    $('#sidebar').html(template.render(data)); 
  },
  
  show_folder: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    var view = new Verlag.View.Folder({ el: $('#editor') });
    view.render(id);
  }
  

});
