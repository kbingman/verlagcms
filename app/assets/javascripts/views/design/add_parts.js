Verlag.View.AddParts = Backbone.View.extend({

  el: 'body',
  
  events: {
    'click a.js-add-part': 'addPart'
  },
  
  initialize: function(options) {
    // $(this.el)
    //   .undelegate('form.js-update', 'submit')
    //   .undelegate('a.js-add-part', 'click');
    
    this.model = options.model;
    this.render();
  },
  
  render: function(id) {
    var model = this.model,
        template = HoganTemplates['templates/add_parts'],
        data = { 
          layout: model.toJSON(),
          types: [
            'image',
            'text',
            'collection'
          ]
        };
  
  
    $(template.render(data)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  addPart: function(e){
    e.preventDefault();
    alert('hey')
  }
  

});
