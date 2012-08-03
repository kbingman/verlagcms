Verlag.View.DesignSettings = Verlag.View.Settings.extend({
  
  events: {
    'submit form.js-update': 'update',
    'click button.js-add-part': 'addPart',
    'click button.js-set-part': 'setPart',
    'click a.js-remove-part': 'removePart'
  },
  
  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/settings'],
        partials = { 
          form: HoganTemplates[this.collection + '/form'],
          part_types: HoganTemplates['layouts/part_types']
        },
        data = { 
          model: model.toJSON(),
          layouts: Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON();
          }),
          types: [
            { name: 'image', klass: 'ImagePart' },
            { name: 'text', klass: 'TextPart' },
            { name: 'collection', klass: 'CollectionPart' }
          ]
        };
        
    $(template.render(data, partials)).appendTo(this.$el).modal().on('hidden', function() {
      $(this).remove();
    });
  },
  
  addPart: function(e){
    e.preventDefault();
    var activeButton = $('div.add-parts button.active'),
        name = $('#new-part-type').val(),
        model = this.model;
    
    if (activeButton.length && name) {
      var klass = activeButton.data('klass'),
          part = new Verlag.Model.PartType({
            template_id: this.model.id
          });
      
      part.save({
        name: name, 
        kind: klass 
      }, {
        success: function(model, response){
          model.set(response);
          var html = HoganTemplates['layouts/part_types'].render({
            part_types: model.get('part_types')
          });
          $('.parts-list').html(html);
          $('button.js-set-part').removeClass('active');
          $('#new-part-type').val('');
        }
      })
    } else {
      // TODO Move to real error handling
      alert('Please choose a part type and enter a name');
    }
  },
  
  setPart: function(e){
    e.preventDefault();
    var target = $(e.target);
    $('button.js-set-part').removeClass('active');
    target.addClass('active');
  },
  
  removePart: function(e){
    e.preventDefault();
    var target = $(e.target);
    var id = target.data('id');
    var model = this.model;
    var part = new Verlag.Model.PartType({
      template_id: this.model.id,
      id: id
    });
    part.destroy({
      success: function(model, response){
        model.set(response);
        var html = HoganTemplates['layouts/part_types'].render({
          part_types: model.get('part_types')
        });
        $('.parts-list').html(html);
      }
    });
  }

});