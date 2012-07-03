Verlag.View.Asset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',
  
  events: {
    'click #overlay'          : 'close_overlay',
    'click #overlay a.cancel' : 'close_modal',
    'click input#save-asset'  : 'update'
  },

  initialize: function(options) {
    var id = options.id,
        folder_id = options.folder_id;
      
    // this.folder = Verlag.folders.get(folder_id);
    this.asset = Verlag.assets.get(id);
    
    $(this.el).undelegate();
  },

  render: function() {
    var template = Verlag.compile_template('admin-assets-edit'),
        data = { 
          asset: this.asset.toJSON()
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
    
    // Verlag.router.navigate(this.folder.get('admin_path'), { 
    //   trigger: false 
    // });
  },
  
  update: function(e){
    e.preventDefault();

    var target = $(e.currentTarget);
    var form = target.parents('form');
    var tag_list = form.find('#asset_tag_list').val();
    var title = form.find('#asset_title').val();
    var asset = this.asset;
    
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
