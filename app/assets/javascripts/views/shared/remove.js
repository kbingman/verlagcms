Verlag.View.Remove = Backbone.View.extend({

  el: 'body',

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
        Verlag.router.navigate('/admin/' + self.collection, { trigger: true });                       
      }
    });

  }
  
});
