Verlag.View.New = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click button.js-create': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    
    this.model = options.model;
    this.parent = options.parent;
    this.collection = options.collection;
    this.render();
  },

  render: function() {
    var template = Verlag.compile_template('admin-shared-new'),
        partials = {
          form: Verlag.compile_template('admin-' + this.collection + '-new')
        },
        data = {
          model: this.model ? this.model.toJSON() : {},
          layouts: Verlag.templates.find_by_klass('Layout').map(function(l){
            return l.toJSON();
          })
        };

    $(template.render(data, partials)).hide().appendTo(this.$el).fadeIn('fast');
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
        Verlag[self.collection].add(model);
        Verlag.router.navigate(model.get('admin_path'), { trigger: true });
        Verlag.closeModal();
      }
    });
  }
  
});
