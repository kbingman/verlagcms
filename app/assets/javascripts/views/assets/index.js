Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName: 'section',

  events: {
    'click a.js-show-asset': 'show',
    'click a.js-new-folder': 'newFolder',
    'click a.js-new-asset': 'newAsset',
    'change input.js-upload': 'create',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    var id = options && options.id ? options.id : null;
      
    this.folder = new Verlag.Model.Folder({ id: id });
    this.folder.fetch({
      success: function(folder, response){
        Verlag.assets = new Verlag.Collection.Assets(response.assets);
        Verlag.assets.on('add', function(){
          self.render();
        });
        self.render();    
      }  
    });
  },

  render: function(callback) {
    // $('#overlay').hide();

    var self = this,
        template = HoganTemplates['assets/index'],
        partials = { 
          node: HoganTemplates['assets/node'],
          toolbar: HoganTemplates['assets/toolbar']
        },
        data = { 
          folder: this.folder ? this.folder.toJSON() : {},
          assets: Verlag.assets.map(function(a){
            attr = a.toJSON();
            attr.is_image = a.isImage();
            attr.image_path = a.imagePath() + '?w=240&amp;h=180&amp;c=t&amp;g=North';
            attr.admin_path = a.adminPath();
            
            return attr;
          })
        };
    
    $(self.el).html(template.render(data, partials));
    $(self.el).find('img').hide().on('load', function(){
      $(this).fadeIn('fast');
    });
    
    Verlag.sidebar = new Verlag.View.Folders();

    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      folder_id = this.folder ? this.folder.id : null,
      id = $(e.currentTarget).data('id');;
      
  
    Verlag.router.navigate(path, { trigger: false });
    Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
  }, 
  
  remove: function(e){
    e.preventDefault();
    var asset = Verlag.assets.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: asset, 
      domId: '#asset-' + asset.id,
      collection: 'assets'
    });
  },
  
  newFolder: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    var model = new Verlag.Model.Folder({
      parent_id: this.folder ? this.folder.id : null
    });
    
    Verlag.modal = new Verlag.View.New({ model: model, collection: 'folders' });
  }, 
  
  newAsset: function(e){
    e.preventDefault();
    // var id = this.folder ? this.folder.id : null;
    
    Verlag.modal = new Verlag.View.NewAsset({ folder: this.folder }); 
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

        // $('#progress').text(Verlag.count);
        
      });
    });
  }

});
