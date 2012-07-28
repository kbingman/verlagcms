Verlag.View.SiteSettings = Backbone.View.extend({

  el: '#editor',
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
      url: '/api/v1/page_types.json',
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
      page_types: Verlag.page_types.toJSON(),
      users: Verlag.users.toJSON(),
      sites: Verlag.sites.toJSON()
    };
  },

  render: function() {
    var template = HoganTemplates['settings/index'];

    $(this.el).html(template.render(this.data()));
    $('a.tab').removeClass('active');
    $('a#settings-tab').addClass('active');
    
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
