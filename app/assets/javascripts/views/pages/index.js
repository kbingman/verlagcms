Verlag.View.PageIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show'
  },

  initialize: function() {
    var self = this;
    Verlag.pages.on('all', this.render);
    
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    var template = HoganTemplates['pages/index'],
        data ={ root: Verlag.pages.root().pageData() },
        partials = { 
         node: HoganTemplates['pages/node']
        };
        
    $(this.el).html(template.render(data, partials));
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
  }, 
  
  show: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    // Verlag.editor = new Verlag.View.PagePreview({ id: id });
    Verlag.editor = new Verlag.View.EditPage({ id: id });
  }

});