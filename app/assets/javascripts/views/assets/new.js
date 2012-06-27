Verlag.View.NewAsset = Backbone.View.extend({

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
    
    this.folder = Verlag.folders.get(options.id);
    // this.asset = new Verlag.Asset({
    //   folder_id: options.id
    // })
    this.render();
  },

  render: function() {
    var template = Verlag.compile_template('admin-assets-new'),
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
        folder_id = this.folder ? this.folder.id : null;
        
    Verlag.count = 0;
    Verlag.files = files.length;
        
    $.each(files, function(i, file){
      self.upload(file, folder_id, form);
    });
  },
  
  upload: function(file, folder_id, form){
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
      
    formData.append('file', file);
    formData.append('folder_id', folder_id);  
    
    xhr.upload.addEventListener('progress', this.onprogressHandler, false);
    xhr.addEventListener('readystatechange', this.onreadystatechangeHandler, false);
    xhr.open('POST', form.getAttribute('action') + '.json', true);
    xhr.send(formData);
  },
  
  onprogressHandler: function(evt){
    var percent = evt.loaded / evt.total * 100;
    $('#percent').text(percent + '%'); 
  },
  
  onreadystatechangeHandler: function(evt){
    var status = null;
    try { status = evt.target.status; }
    catch(e) { return; }
  
    // readyState 4 means that the request is finished
    if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
      var attr = JSON.parse(evt.target.responseText);
      var asset = new Verlag.Model.Asset(attr);
      
      Verlag.count++;
      Verlag.assets.add(asset);
      Verlag.notify('uploaded');
      
      console.log(Verlag.count);
      if (Verlag.count == Verlag.files){
        Verlag.closeModal();   
        console.log('close')
      }
      
      

      $('#progress').text(Verlag.count)
    }
  }
  
});



