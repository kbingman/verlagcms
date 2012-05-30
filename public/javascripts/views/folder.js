Verlag.View.Folder = Backbone.View.extend({

  //... is a div tag.
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click a[rel="show_asset"]': 'show_asset'
  },

  initialize: function(options) {
    $(this.el).undelegate('a[rel="show_asset"]', 'click');
  },

  render: function(id, callback) {
    var self = this,
        folder = Verlag.collections.folders.get(id),
        template = Verlag.compile_template('admin-assets-index'),
        partials = { 
          asset:  Verlag.compile_template('admin-assets-asset') 
        }, 
        data;
    
    folder.fetch_assets(function(){
      data = { 
        folder: folder.toJSON(),
        assets: folder.assets.toJSON()
      };
      
      $(self.el).html(template.render(data, partials));
      $('#sidebar li.node').removeClass('active');
      $('li#folder-' + folder.id).addClass('active');
      if(callback) callback.call(this);
    });

  }, 
  
  show_asset: function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href'),
      folder_id = href.split('/')[3],
      id = href.split('/')[5];
      
    Verlag.router.navigate(href, { trigger: false });
    var view = new Verlag.View.Asset({ el: $('body'), folder_id: folder_id, id: id });
    view.render(folder_id, id);
  }

});
