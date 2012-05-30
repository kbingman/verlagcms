Verlag.View.PagePreview = Backbone.View.extend({

  //... is a div tag.
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    // 'submit form#editor-buttons': 'update',
    'click input#save': 'update'
  },

  initialize: function() {
    $(this.el).undelegate('input#save', 'click');
  },

  render: function(id) {
    var self = this,
        page = Verlag.collections.pages.get(id),
        template = Verlag.compile_template('admin-pages-show'),
        data = { 
          page: page.to_json()
        };
    
    self.page = page;
    $('#editor').html(template.render(data));
    $('#sidebar li.node').removeClass('active')
    $('li#page-' + page.id).addClass('active');
    
    Verlag.iFramer.initialize('.preview iframe', function(){
      Verlag.Editor.initialize();
    }); 
  },
  
  update: function(e){
    e.preventDefault();
    var page = this.page;
    var iframe = $(this.el).find('iframe');
    var parts = page.get('contents');
    
    iframe.contents().find('div.editable').each(function(i, part){
      var id = $(part).attr('id').split('-')[1];
      var content = $(part).html();
      var p = _.detect(parts, function(p){ return p.id == id });
      if(p) p.content = content;
    });
    
    page.save({ 
      contents: parts 
    },{
      success: function(){
        Verlag.notify('Page saved')
      }
    });
  }

});
