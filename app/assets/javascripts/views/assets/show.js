Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click #overlay'          : 'close_overlay',
    'click #overlay a.cancel' : 'close_modal',
    'click input#save-asset'  : 'update'
  },

  initialize: function(options, callback) {
    var id = options.id,
        self = this,
        folder_id = options.folder_id;
 
    this.asset = new Verlag.Model.Asset({ id: id });
    this.asset.fetch({
      success: function(asset, response){
        self.render();
        if(callback){
          callback(asset)
        }
      }
    });
    $(this.el).undelegate();
  },

  render: function() {
    var asset = this.asset,
        template = HoganTemplates['assets/edit'],
        data = { 
          asset: function(){
            var attr = asset.toJSON();
            attr.is_image = asset.isImage();
            attr.image_path = '/images/' + asset.id + '/' + asset.get('file_name');
            attr.admin_path = asset.adminPath();
            return attr;
          }
        };
    
    $(this.el).append(template.render(data));
    Verlag.loadModal('div#asset-editor', function(){
      jQuery('div#asset-editor').fadeIn(320); 
    }); 
    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
  },
  
  close_overlay: function(e){
    
    if(e.target.id == 'overlay'){
      e.preventDefault();
      this.close_modal(e);
    }
  },
  
  close_modal: function(e){
    e.preventDefault();
    $('#overlay').fadeOut('fast', function(){
      $(this).remove();
    });
    var path = this.asset.get('parent_id') ? '/admin/folders/' + this.asset.get('parent_id') : '/admin/folders'
    
    Verlag.router.navigate(path, { 
      trigger: false 
    });
  },
  
  update: function(e){
    e.preventDefault();

    var target = $(e.currentTarget),
        form = target.parents('form'),
        tag_list = form.find('#asset_tag_list').val(),
        title = form.find('#asset_title').val(),
        asset = this.asset;
    
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
