Verlag.View.PageIndex = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-remove': 'remove',
    'click a.js-new': 'new'
  },

  initialize: function() {
    var self = this;
    Verlag.pages.on('all', function(){
      self.render()
    });
    
    $(this.el).undelegate();
    this.render();
  },
  
  data: function(){
    return { 
      root: Verlag.pages.root().pageData()
    };
  },

  render: function() {
    var template = Verlag.compile_template('admin-pages-index'),
        partials = { 
         node:  Verlag.compile_template('admin-pages-node') 
        };
        
    $(this.el).html(template.render(this.data(), partials));
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
  
  show: function(e){
    e.preventDefault();
    var href = $(e.target).attr('href'),
      id = href.split('/')[3];
    
    Verlag.router.navigate(href, { trigger: false });
    Verlag.editor = new Verlag.View.PagePreview({ id: id });
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