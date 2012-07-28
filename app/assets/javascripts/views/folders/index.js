Verlag.View.Folders = Verlag.View.Assets.extend({

  el: '#editor',
  tagName:  'div',

  initialize: function(options) {
    $(this.el).undelegate();
    var self = this;
    
    $.ajax({
      url: '/api/v1/items.json',
      success: function(response){
        var assets = new Verlag.Collection.Assets(response);
        Verlag.assets = assets;
      
        assets.on('all', function(){
          self.render();
        });
        self.render(); 
      }
    });
  }

});
