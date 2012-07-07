Verlag.View.NewAsset = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'change button.js-upload': 'create'
  },

  initialize: function(options) {
    $(this.el).undelegate();
    
    this.folder = options.folder; // Verlag.folders.get(options.id);
    // this.asset = new Verlag.Asset({
    //   folder_id: options.id
    // })
    this.render();
  },

  render: function() {
    var template = HoganTemplates['assets/new'],
        data = {
          asset: {}
        };

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  create: function(e){
    e.preventDefault();
    
    var self = this,
        form = document.getElementById('uploader'),
        fileInput = document.getElementById('file'),
        files = fileInput.files,
        parent_id = this.folder ? this.folder.id : null;

    Verlag.count = 0;
    Verlag.files = files.length;
        
    $.each(files, function(i, file){
      var asset = new Verlag.Model.Asset({ parent_id: parent_id });
      asset.upload(file, function(asset, response){
        Verlag.count++;
        Verlag.assets.add(asset);
        Verlag.notify('uploaded');
      
        if (Verlag.count == Verlag.files){
          Verlag.closeModal();   
        }
        $('#progress').text(Verlag.count);
        
      });
    });
  }
  
});



