Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName: 'section',

  events: {
    'click a.js-show-asset': 'show',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    var self = this;
    _.bindAll(this, 'render');
    $(this.el).undelegate();

    this.folder = Verlag.folders.get(options.id);  
    
    Verlag.assets = new Verlag.Collection.Assets();
    Verlag.assets.fetch({
      data: { folder_id: this.folder.id },
      success: function(){
        self.render();
        if(options.success){ 
          options.success(); 
        }
      }
    });
    
    Verlag.assets.on('add', this.render);
  },

  render: function(callback) {
    var self = this,
        template = HoganTemplates['assets/index'],
        partials = { 
          node: HoganTemplates['assets/node'],
          toolbar: HoganTemplates['assets/toolbar']
        },
        data = { 
          folder: this.folder.toJSON(),
          assets: Verlag.assets.map(function(a){
            attr = a.toJSON();
            attr.is_image = a.isImage();
            attr.image_path = a.imagePath();
            attr.admin_path = a.adminPath();
            
            return attr;
          })
        };
    
    $(self.el).html(template.render(data, partials));
    $(self.el).find('img').hide().on('load', function(){
      $(this).fadeIn('fast');
    });
    
    Verlag.header = new Verlag.View.ShowFolder({
      id: this.folder.id
    });

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
  }

});
