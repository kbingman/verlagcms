Verlag.View.EditPage = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    // 'submit form#editor-buttons': 'update',
    // 'click input#save': 'update',
    'click a.js-settings': 'openSettings', 
    'keyup .editable': 'update'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    
    this.page = Verlag.pages.get(options.id) || new Verlag.Model.Page({ id: options.id });    
    this.page.on('change', this.render);
    this.page.fetch({
      success: function(page, response){
        self.render();
      }
    });
  },

  render: function(id) {
    var page = this.page,
        template = HoganTemplates['pages/edit'],
        data = { page: page.toJSON() };

    $(this.el).html(template.render(data, HoganTemplates));
    
    Verlag.sidebar = new Verlag.View.PageIndex();
    
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
  },
  
  openSettings: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.page,
      collection: 'pages'
    });
  },
  
  update: function(e){
    e.preventDefault();
    var self = this; 
    if(self.timeOut){
      clearTimeout(self.timeOut);
    }
   
    this.timeOut = setTimeout(function(){
      var page = self.page;
      var parts = page.get('parts');
    
      $(self.el).find('div.editable').each(function(i, part){
        var id = $(part).attr('id').split('-')[1];
        var content = $(part).html();
        var p = _.detect(parts, function(p){ return p.id == id });
        if(p) p.content = content;
      });
    
      page.save({ 
        parts: parts 
      },{
        success: function(){
          Verlag.notify('Page saved')
        }
      });
      
    }, 720);
  }

});
