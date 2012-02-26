Verlag.View.Asset = Backbone.View.extend({

  tagName:  'div',

  events: {
    'click #overlay a': 'redirect'
  },

  initialize: function() {
    $(this.el).undelegate('click #overlay a', 'click');
  },

  render: function(folder_id, id) {
    var folder = Verlag.collections.folders.get(folder_id, id),
      asset = folder.assets.get(id),
      template = Verlag.compile_template('admin-assets-edit'),
      data = { 
        asset: asset.toJSON()
      };
    $('body').append(template.render(data));
    Verlag.loadModal('div#asset-editor', function(){
      jQuery('div#asset-editor').fadeIn(500); 
    }); 
  },
  
  redirect: function(e){
    e.preventDefault();
    href = $(e.currentTarget).attr('href');
    Verlag.router.navigate(href, { trigger: true });
  }

});
