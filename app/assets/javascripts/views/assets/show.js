Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click button.js-update'  : 'update'
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    $(this.el).undelegate('button.js-update', 'click');
    
    this.folder = Verlag.folders.get(options.folder_id);
    this.asset = Verlag.assets.get(options.id);
    this.asset.fetch({ success: this.render });
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
        attr = {},
        asset = this.asset;
        
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
        
    asset = asset.save(attr, {
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
