Verlag.View.Settings = Backbone.View.extend({

  el: 'body',

  events: {
    'submit form.js-update': 'update',
  },

  initialize: function(options) {
    $(this.el).undelegate();
    this.model = options.model;
    this.render();
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
    
    var form = $(e.target),
        attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        if(!response.errors){
          Verlag.notify('Saved')
          // TODO make this automatic
          Verlag.editor.render();
          $('.modal').modal('hide');  
        } else {
          alert('error')
          console.log(response.errors);
        }        
      }
    });
  }

});
