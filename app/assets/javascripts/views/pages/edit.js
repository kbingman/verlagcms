Verlag.View.EditPage = Backbone.View.extend({

  el: '#editor',
  tagName:  'div',

  events: {
    'click a.js-settings': 'settings', 
    'click a.js-remove': 'remove',
    'click a.js-new-child': 'new'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    
    this.page = Verlag.pages.get(options.id) || new Verlag.Model.Page({ id: options.id });    
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
    
    // TODO settle on one...
    Verlag.page = this.page;

    $(this.el).html(template.render(data, HoganTemplates));
    
    Verlag.sidebar = new Verlag.View.PageIndex();
    
    Verlag.iframe = new Verlag.View.Iframe({
      page: page
    });
    
    // TODO Make this a view?
    // Verlag.iFramer.initialize('.preview iframe', function(){
    //   Verlag.Editor.initialize();
    // }); 
    
    $('a.tab').removeClass('active');
    $('a#pages-tab').addClass('active');
  },
  
  settings: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.page,
      collection: 'pages'
    });
  },

  new: function(e){
    e.preventDefault();

    var id = $(e.target).data('id');
    var parent = Verlag.pages.get(id);
    var model = new Verlag.Model.Page({
      parent_id: id
    });
    
    parent.set({ 'children?': true, 'open?': true });
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'pages' 
    });
  },
  
  remove: function(e){
    e.preventDefault();
    var page = Verlag.pages.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: page, 
      collection: 'pages' 
    });
  }
  

});
