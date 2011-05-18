var Asset = Model('asset', function() {
  // this.persistence(Model.REST, "/assets"), 
  
  // var invokeCallback = function (callbackName, instance) {
  //   if (instanceMethods[callbackName]) {
  //     instanceMethods[callbackName].call(instance);
  //   };
  // },
  
  this.include({
    saveRemote: function(callback){
      var url = '/assets/' + this.id() + '.json';
      var self = this;
      self.save();
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { 'asset': self.attributes },
        success: function(results) {
          self.merge(results);
          if(callback['success']){ callback['success'].call(this); }
        }
      });
    },  
    
    deleteRemote: function(callback){
      var url = '/assets/' + this.id() + '.json';
      var self = this;
      jQuery.ajax({
        type: 'DELETE',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          Asset.remove(self); 
          if(callback['success']){ callback['success'].call(this); }    
        }
      });
    },  
     
    // TODO this could all be handled with a general update?
    // Add to page
    addToPage: function(page_id, callback){
      var url = '/assets/' + this.id() + '.json';
      var self = this;   
      var page = Page.find(page_id)
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json", 
        data: { 'asset': { 'page_id': page_id } }, 
        dataType: "json",                   
        success: function(results) {
          self.merge(results);  
          // There might be a better way to do this without
          // hitting the server... 
          page.load(function(){
            if(callback){ callback.call(this); }   
          });            
        }
      });
    }, 
    
    // Remove from page
    removeFromPage: function(page_id, callback){
      var url = '/assets/' + this.id() + '.json';
      var self = this;   
      var page = Page.find(page_id)
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json", 
        data: { 'asset': { 'page_id': null } }, 
        dataType: "json",                   
        success: function(results) {
          self.merge(results);  
          // There might be a better way to do this without
          // hitting the server... 
          page.load(function(){
            if(callback){ callback.call(this); }   
          });            
        }
      });
    },
    
    // Returns the current asset as json, including the query and query_path
    toMustache: function(query){
      var asset = this; 
      var query_path = query ? '?' + decodeURIComponent(jQuery.param({'query': query})) : '';
      asset.merge({query_path: query_path, query: query}); 
      return asset.attr();
    },  
        
    // Returns the current asset as json, plus both neighbors, then preloads the images
    // Not sure if they should be preloaded here, rather after
    toMustacheWithNeighbors: function(query){
      var assets = Asset.all();
      var assetIndex = assets.indexOf(this);
      var assetAttr = this.toMustache(query);
      var nextAsset = assets[assetIndex + 1] ? Asset.all()[assetIndex + 1].toMustache(query) : null;
      var prevAsset = assets[assetIndex - 1] ? Asset.all()[assetIndex - 1].toMustache(query) : null; 
      
      // Image Preloaders
      jQuery('<img />')[0].src = '/images/large/' + assetAttr.id + '/' + assetAttr.file_name;
      if(nextAsset){
        jQuery('<img />')[0].src =  '/images/large/' + nextAsset.id + '/' + nextAsset.file_name;
      }
      if(prevAsset){
        jQuery('<img />')[0].src =  '/images/large/' + prevAsset.id + '/' + prevAsset.file_name;
      }
      
      return {
        'asset': assetAttr, 
        'next': nextAsset, 
        'previous': prevAsset
      }
    }
  }), 
  
  this.extend({
    // returns a json array of all assets, including the query and query_path
    toMustache: function(query) {
      var query_path = query ? '?' + decodeURIComponent(jQuery.param({'query': query})) : '';
      return {
        assets: this.map(function(asset){ 
          asset.merge({query_path: query_path, query: query}); 
          return asset.attr(); 
        }), 
        query: query
      }
    },  
    
    // This is hack 
    // I do it like this, as I don't have any assets loaded...
    removeFromPage: function(id, page_id, callback){
      var url = '/assets/' + id + '.json';
      var self = this;   
      var page = Page.find(page_id)
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json", 
        data: { 'asset': { 'page_id': null } }, 
        dataType: "json",                   
        success: function(results) { 
          // There might be a better way to do this without
          // hitting the server... 
          page.load(function(){
            if(callback){ callback.call(this); }   
          });            
        }
      });
    },

    searchRemote: function(query, callback) {
      var queryData = query != null ? decodeURIComponent(jQuery.param({'query': query})) : '';
      Asset.each(function(){ Asset.remove(this); });
      var url = '/search.json';
      jQuery.ajax({
        type: 'get',
        url: '/search.json',
        contentType: "application/json",
        dataType: "json",
        data: queryData,
        success: function(results) {
          jQuery.each(results, function(i, assetData) {
            var asset = new Asset({ id: assetData.id });
            asset.merge(assetData);
            Asset.add(asset);
          });
          callback.call(this);
        }
      });
    },

    searchAdmin: function(query, callback) {
      var queryData = query != null ? decodeURIComponent(jQuery.param({'query': query})) : '';
      Asset.each(function(){ Asset.remove(this); });
      var url = '/assets';
      jQuery.ajax({
        type: 'get',
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: queryData,
        success: function(results) {
          $.each(results, function(i, assetData) {
            var asset = new Asset({ id: assetData.id });
            asset.merge(assetData);
            Asset.add(asset);
          });
          callback.call(this);
        }
      });
    }
  });

});

