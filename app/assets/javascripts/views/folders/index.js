Verlag.View.FolderIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a[rel="show_folder"]': 'show',
    'click a.js-new-folder': 'new',
    'click a.js-remove': 'remove'
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
  
  show: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href'),
      id = path.split('/')[3];
    
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
    
  }, 
  
  new: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    var model = new Verlag.Model.Folder();
    
    Verlag.modal = new Verlag.View.New({ model: model, collection: 'folders' });
  }, 
  
  remove: function(e){
    e.preventDefault();
    var folder = Verlag.folders.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: folder, 
      collection: 'folders' 
    });
  }
  

});
