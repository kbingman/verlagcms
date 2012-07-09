Verlag.View.Remove = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click button.js-delete': 'delete'
  },

  initialize: function(options) {
    this.model = options.model;
    this.domId = options.domId;
    this.collection = options.collection;
    $(this.el).undelegate();
    this.render();
  },

  render: function() {
    
    var template = HoganTemplates['shared/remove'],
        data = { 
          model: this.model.toJSON()
        };

    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function () {
      $(this).remove();
    });
  },
  
  delete: function(e){
    var self = this;
    
    if(this.domId){
      $(this.domId).fadeOut('fast', function(){
        $(this).remove();
      })
    }

    e.preventDefault();
    this.model.destroy({
      success: function(){
        Verlag.notify('removed');
        $('.modal').modal('hide');                         
      }
    });

  }
  
});
