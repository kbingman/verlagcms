Verlag.View.DesignSettings = Verlag.View.Settings.extend({
  
  events: {
    'submit form.js-update': 'update',
    'click button.js-add-part': 'addPart',
    'click button.js-set-part': 'setPart'
  },
  
  render: function(id) {
    var model = this.model,
        template = HoganTemplates['shared/settings'],
        partials = { form: HoganTemplates[this.collection + '/form'] },
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
    var activeButton = $('div.add-parts button.active');
    var name = $('#new-part-type').val();
    
    if (activeButton.length && name) {
      var klass = activeButton.data('klass');
      console.log(name);
      console.log(klass);
      alert('ajax here')
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
  }

});