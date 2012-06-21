var Folder = Model('folder', function() {
  this.persistence(Model.SinatraREST, '/admin/folders'), 
 
  this.include({
    
    loadAssets: function(callback) {
      Asset.each(function(){ Asset.remove(this); });
      var self = this;
      var url = '/admin/folders/' + self.attr('id') + '/assets.json';
      jQuery.ajax({
        type: 'get',
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(results) {
          jQuery.each(results, function(i, assetData) {
            var asset = new Asset({ id: assetData.id });
            asset.merge(assetData);
            Asset.add(asset);
          });
          if(callback){ callback.call(this); }
        }
      });
    }
    
  }),  
  
  this.extend({   
    
    // Returns a JSON object with all folders 
    asJSON: function(){
      return Folder.map(function(item){ return item.attr() });
    }
    
  });
  
});