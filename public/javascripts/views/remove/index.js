Verlag.View.Remove = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click a.close': 'close_modal',
    'click #overlay': 'close_overlay',
    'click form#remove button': 'delete'
  },

  initialize: function(options) {
    this.model = options.model;
    $(this.el).undelegate();
  },

  render: function() {
    
    var template = Verlag.compile_template('admin-pages-remove'),
        data = { 
          model: this.model.toJSON()
        };

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  // TODO These two need to be centralized
  close_modal: function(){
    $('#overlay').fadeOut('fast', function(){
      $(this).remove();
    });
  },
  
  close_overlay: function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      this.close_modal(e);
    }
  },
  
  delete: function(e){
    e.preventDefault();
    var form = $(e.target).parents('form');
    var name = form.find('input#folder-name').val();
    var self = this;

  }
  
});
