Verlag.View.Settings = Backbone.View.extend({

  el: 'body',

  events: {
    'submit form.js-update': 'update'
  },

  initialize: function(options) {
    $(this.el).undelegate('form.js-update', 'submit');
    this.model = options.model;
    this.render();
    this.success = options.success;
  },

  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/settings'],
        partials = { form: HoganTemplates[this.collection + '/form'] },
        data = { 
          model: model.toJSON(),
          layouts: Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON();
          })
        };


    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  update: function(e){
    e.preventDefault();
    
    console.log(this.model)
    
    var form = $(e.target),
        callback = this.success,
        attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        Verlag.notify('Saved');
        if(callback){
          callback(model, response);
        }
          
        $('.modal').modal('hide');      
      }, 
      error: function(model, response){
        alert('error')
        console.log(response.responseText);
      }
    });
  }

});
