Verlag.View.New = Backbone.View.extend({

  el: 'body',

  events: {
    'click button.js-create': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate('button.js-create', 'click');
    
    this.model = options.model;
    this.parent = options.parent;
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    var template = HoganTemplates['shared/new'],
        partials = {
          form: HoganTemplates[this.collection + '/form']
        },
        data = {
          model: this.model ? this.model.toJSON() : {},
          layouts: Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON();
          })
        };
    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  create: function(e){
    e.preventDefault();
    var self = this;
    var form = $(e.target).parents('form');
    var attr = {};
    
    form.serializeArray().forEach(function(a){
      attr[a.name] = a.value;
    });
    
    this.model.save(attr, {
      success: function(model, response){
        Verlag.notify('created');
        if(Verlag[self.collection]){
          Verlag[self.collection].add(model);
        }
        Verlag.router.navigate(model.adminPath(), { trigger: true });
        $('.modal').modal('hide');  
      },
      error: function(model, response){
        alert('error')
        console.log(response.responseText);
      }
      
    });
  }
  
});
