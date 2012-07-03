Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  events: {
    'click a.js-show-Asset': 'show',
    'click a.js-show-Folder': 'showFolder',
    'click a.js-new-folder': 'newFolder',
    'click a.js-new-asset': 'newAsset',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    var id = options && options.id ? options.id : null;
      
    this.folder = new Verlag.Model.Folder({ id: id });
    this.folder.fetch({
      success: function(folder, response){
        Verlag.assets = new Verlag.Collection.Assets(response.children);
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
        template = Verlag.compile_template('admin-assets-index'),
        partials = { 
          item:  Verlag.compile_template('admin-assets-item'),
          toolbar: Verlag.compile_template('admin-assets-toolbar')
        },
        data = { 
          folder: this.folder ? this.folder.toJSON() : {},
          assets: Verlag.assets.map(function(a){
            attr = a.toJSON();
            attr.is_image = a.isImage();
            attr.image_path = '/images/' + a.id + '/' + a.get('file_name') + '?w=240&amp;h=180&amp;c=t&amp;g=North';
            attr.admin_path = a.adminPath();
            
            return attr;
          })
        };
    
    $(self.el).html(template.render(data, partials));
    $(self.el).find('img').hide().on('load', function(){
      $(this).fadeIn('fast');
    })
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
      domId: '#Asset-' + asset.id,
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
  
  showFolder: function(e){
    console.log($(e.currentTarget));
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      id = $(e.currentTarget).data('id');
    
      
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
    
  },
  
  newAsset: function(e){
    e.preventDefault();
    // var id = this.folder ? this.folder.id : null;
    
    Verlag.modal = new Verlag.View.NewAsset({ folder: this.folder }); 
  }

});
