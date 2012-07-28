Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click button.js-update'  : 'update'
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
            attr.asset_path = asset.imagePath() + '?w=240&amp;h=180&amp;c=t&amp;g=North';;
            attr.admin_path = asset.adminPath();
            return attr;
          }
        };
    
    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
      var path = '/admin/folders/' + asset.get('folder_id');
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
        form = $('form#edit-asset'),
        tagList = form.find('#asset_tag_list').val(),
        name = form.find('#asset_title').val(),
        asset = this.asset;
    
    asset = asset.save({
      name: name,
      tag_list: tagList
    }, {
      success: function(model, response){
        console.log(response);
        Verlag.notify('Asset saved');
        Verlag.editor.render();
      },
      error: function(model, response){
        console.log(response.responseText);
        alert('error handling...')
      }
    });
  }

});
