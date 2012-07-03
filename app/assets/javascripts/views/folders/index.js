Verlag.View.Folders = Verlag.View.Assets.extend({

  el: '#editor',
  tagName:  'div',

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    var id = options && options.id ? options.id : null;
    
    Verlag.fetchItemsByFolderId(id, function(assets, response){
      Verlag.assets = assets;
      
      assets.on('all', function(){
        self.render();
      });
      self.render();      
    });
  }

});
