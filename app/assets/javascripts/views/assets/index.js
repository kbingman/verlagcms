Verlag.View.Assets = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  events: {
    'click a[rel="show_asset"]': 'show',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
      
    this.folder = Verlag.folders.get(options.id);
    this.folder.fetch_assets(function(assets, response){
      self.folder.assets = assets;
      assets.on('all', function(){
        self.render();
      });
      self.render();
      
      if(options.success) options.success.call(this);
    });
  },

  render: function(callback) {
    $('#overlay').hide();

    var self = this,
        template = Verlag.compile_template('admin-assets-index'),
        partials = { 
          asset:  Verlag.compile_template('admin-assets-asset') 
        },
        data = { 
          folder: this.folder.toJSON(),
          assets: this.folder.assets.toJSON()
        };
    
    $(self.el).html(template.render(data, partials));
    $('#sidebar li.node').removeClass('active');
    $('li#folder-' + this.folder.id).addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href'),
      folder_id = href.split('/')[3],
      id = href.split('/')[5];
      
    Verlag.router.navigate(href, { trigger: false });
    Verlag.modal = new Verlag.View.Asset({ folder_id: folder_id, id: id });
    Verlag.modal.render(folder_id, id);
  }, 
  
  remove: function(e){
    e.preventDefault();
    var asset = this.folder.assets.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: asset, 
      collection: 'assets' 
    });
  }

});
