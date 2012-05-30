Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click #overlay'          : 'close_overlay',
    'click #overlay a.cancel' : 'close_modal',
    'submit form#edit-asset'  : 'update'
  },

  initialize: function(options) {
    // var id = options.id,
    //     folder_id = options.folder_id;
    
    $(this.el).undelegate('div#overlay a.cancel', 'click');
    $(this.el).undelegate('form#edit-asset', 'submit');
  },

  render: function(folder_id, id) {
    var template = Verlag.compile_template('admin-assets-edit'),
        folder = Verlag.collections.folders.get(folder_id),
        asset = folder.assets.get(id),
        data = { 
          asset: asset.toJSON()
        };
    
    this.asset = asset;
    this.folder = folder;
    
    $(this.el).append(template.render(data));
    Verlag.loadModal('div#asset-editor', function(){
      jQuery('div#asset-editor').fadeIn(500); 
    }); 
  },
  
  close_overlay: function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      this.close_modal(e);
    }
  },
  
  close_modal: function(e){
    e.preventDefault();
    $('#overlay').fadeOut('fast', function(){
      $(this).remove();
    });
    Verlag.router.navigate('/admin/folders/' + this.folder.id, { trigger: false });
  },
  
  update: function(e){
    e.preventDefault();
    var self = this;
    var target = $(e.currentTarget);
    var tag_list = target.find('#asset_tag_list').val();
    var title = target.find('#asset_title').val();
    var asset = self.asset;
    
    asset = asset.save({
      title: title,
      tag_list: tag_list
    }, {
      success: function(response){
        Verlag.notify('Asset saved')
      },
      error: function(){
        alert('error')
      }
    });
  }

});
