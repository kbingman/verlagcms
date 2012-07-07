Verlag.View.PagePreview = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    // 'submit form#editor-buttons': 'update',
    'click input#save': 'update'
  },

  initialize: function(options) {
    this.page = Verlag.pages.get(options.id);
    $(this.el).undelegate('input#save', 'click');
    this.render();
  },

  render: function(id) {
    var page = this.page,
        template = HoganTemplates['pages/show'],
        data = { page: page.toJSON() };

    $(this.el).html(template.render(data));
    $('#sidebar li.node').removeClass('active')
    $('li#page-' + page.id).addClass('active');
    
    Verlag.iFramer.initialize('.preview iframe', function(){
      Verlag.Editor.initialize();
    }); 
    
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
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
