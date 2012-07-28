Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
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
            attr.image_path = '/images/' + asset.id + '/' + asset.get('file_name') + '?w=240&amp;h=180&amp;c=t&amp;g=North';;
            attr.admin_path = asset.adminPath();
            return attr;
          }
        };
    
    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
      var path = asset.get('parent_id') ? '/admin/folders/' + asset.get('parent_id') : '/admin/folders'
      Verlag.router.navigate(path, { 
        trigger: false 
      });
    });
    
    $('a.tab').removeClass('active');
    $('a#assets-tab').addClass('active');
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
