Verlag.View.FolderIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a[rel="show_folder"]': 'show_folder',
    'click a.js-new-folder': 'new_folder',
    'click a.js-remove': 'remove_folder'
  },

  initialize: function() {
    Verlag.folders.on('all', this.render);
    $(this.el).undelegate();
  },

  render: function() {
    var folders = Verlag.folders,
        template = Verlag.compile_template('admin-folders-index'),
        data = { 
          folders: folders.toJSON()
        };
    
    $('#sidebar').html(template.render(data)); 
  },
  
  show_folder: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href'),
      id = path.split('/')[3];
    
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Folder();
    Verlag.editor.render(id);
  }, 
  
  new_folder: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href')
    
    Verlag.modal = new Verlag.View.NewFolder();
    Verlag.modal.render();
  }, 
  
  remove_folder: function(e){
    e.preventDefault();
    var folder = Verlag.folders.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ model: folder });
    Verlag.modal.render();
  }
  

});
