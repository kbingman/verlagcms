Verlag.View.Folders = Backbone.View.extend({

  el: '#sidebar',
  tagName: 'aside',
  
  events: {
    'click a.js-show-folder': 'show'
  },

  initialize: function() {
    Verlag.folders.on('all', this.render);
    
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    var template = HoganTemplates['folders/index'],
        partials = { node: HoganTemplates['folders/node'] },
        data = { 
          folders: Verlag.folders.map(function(f){
            attr = f.toJSON();
            attr.admin_path = f.adminPath();
            return attr;
          })
        };
        
    $(this.el).html(template.render(data, partials));
    $('a.tab').removeClass('active');
    $('a#folders-tab').addClass('active');
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.currentTarget).attr('href'),
      id = $(e.currentTarget).data('id');
    
    Verlag.router.navigate(path, { trigger: false });
    Verlag.editor = new Verlag.View.Assets({ id: id });
  }

});
