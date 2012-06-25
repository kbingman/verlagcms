Verlag.View.FolderIndex = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-new-folder': 'newFolder',
    'click a.js-remove': 'remove',
    'click a.js-new-asset': 'newAsset',
  },

  initialize: function() {
    Verlag.folders.on('all', this.render);
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    var folders = Verlag.folders,
        template = Verlag.compile_template('admin-folders-index'),
        partials = { 
          toolbar: Verlag.compile_template('admin-assets-toolbar')
        },
        data = { 
          folders: folders.toJSON()
        };
    
    $(this.el).html(template.render(data, partials)); 
    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      id = $(e.currentTarget).data('id');
      
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
    
  }, 
  
  newFolder: function(e){
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
  },
  
  newAsset: function(e){
    e.preventDefault();
    
    Verlag.modal = new Verlag.View.NewAsset({ id: null }); 
  }
  

});
