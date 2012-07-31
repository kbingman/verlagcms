Verlag.View.DesignSettings = Verlag.View.Settings.extend({
  
  events: {
    'submit form.js-update': 'update',
    'click a.js-add-part': 'addPart'
  },
  
  addPart: function(e){
    e.preventDefault();
    alert('hey')
    // var modal = new Verlag.View.AddParts();
  }

});