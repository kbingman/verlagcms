Verlag.View.ShowFolder = Backbone.View.extend({

  el: '#folder-info',
  tagName: 'header',
  
  events: {
    'click a.js-remove-folder': 'remove',
    'click a.js-settings': 'settings', 
    'change input.js-upload': 'create'
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    
    this.folder = Verlag.folders.get(options.id);
    this.folder.fetch({
      success: this.render
    });
    this.folder.on('change', this.render);
  },

  render: function() {
    var template = HoganTemplates['folders/show'],
        data = { 
          folder: this.folder.toJSON()
        };
        
    $(this.el).html(template.render(data));
  },

  
  remove: function(e){
    e.preventDefault();
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: this.folder, 
      collection: 'folders'
    });
  },
  
  settings: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.folder,
      collection: 'folders'
    });
  },
  
  create: function(e){
    e.preventDefault();
    
    var self = this,
        form = document.getElementById('uploader'),
        fileInput = document.getElementById('file'),
        files = fileInput.files,
        folder_id = this.folder ? this.folder.id : null;

    Verlag.count = 0;
    Verlag.files = files.length;
        
    $.each(files, function(i, file){
      var asset = new Verlag.Model.Asset({ folder_id: folder_id });
      asset.upload(file, function(asset, response){
        Verlag.count++;
        Verlag.assets.add(asset);
        Verlag.notify('uploaded');
      });
    });
  }

});
