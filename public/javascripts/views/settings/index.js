Verlag.View.Settings = Backbone.View.extend({

  el: '#sidebar',
  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-new': 'new',
    'click a.js-remove': 'remove'
  },

  initialize: function() {
    $(this.el).undelegate();
    var self = this;
    
    $.ajax({
      url: '/admin/page_types.json',
      success: function(response){
        Verlag.page_types = new Verlag.Collection.PageTypes(response);
        Verlag.page_types.on('all', function(){
          self.render();
        });
        self.render();
      }
    });
  },
  
  data: function(){
    return {
      page_types: Verlag.page_types.toJSON()
    };
  },

  render: function() {
    var template = Verlag.compile_template('admin-settings-index');
    console.log(this.data())
        
    $(this.el).html(template.render(this.data()));
  }, 

  new: function(e){
    e.preventDefault();

    var model = new Verlag.Model.PageType();
    
    Verlag.modal = new Verlag.View.New({ 
      model: model, 
      collection: 'page_types' 
    });

  },
  
  show: function(e){
    e.preventDefault();

  },
  
  remove: function(e){
    e.preventDefault();
    var pageTypes = Verlag.page_types.get($(e.target).data('id'));
    
    Verlag.modal = new Verlag.View.Remove({ 
      model: pageTypes, 
      collection: 'page_types' 
    });

  }

});
