var Asset = Model('asset', function() {
  this.persistence(Model.REST, "/admin/assets"), 
  
  // var invokeCallback = function (callbackName, instance) {
  //   if (instanceMethods[callbackName]) {
  //     instanceMethods[callbackName].call(instance);
  //   };
  // },
  
  this.include({
    
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
    
    asJSON: function(){
      return Asset.map(function(item){ return item.attr() });
    }, 
    
    tags: function(){
      tags = []
      Asset.map(function() {
        tags = tags.concat(this.attr("tags"));
      });                                     
      return tags;
    },

    searchRemote: function(query, callback) {
      var queryData = query != null ? decodeURIComponent(jQuery.param({'query': query})) : '';
      Asset.each(function(){ Asset.remove(this); });
      var url = '/search.json';
      jQuery.ajax({
        type: 'get',
        url: url,
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
      var url = '/admin/assets.json';
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
    },
    
    // Ajax uploader code
    create: function (file, callback) { 
      var url = '/admin/assets.json';
      Asset.callback = callback;
      
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('loadstart', Asset.onloadstartHandler, false);
      xhr.upload.addEventListener('progress', Asset.onprogressHandler, false);
      xhr.upload.addEventListener('load', Asset.onloadHandler, false);
      xhr.addEventListener('readystatechange', Asset.onreadystatechangeHandler, false);   
      
      // xhr.setRequestHeader("X-Query-Params", {'format':'json'});
      xhr.open('POST', url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.setRequestHeader("X-File-Name", file.name);
      xhr.send(file); 
    },  
    
    onloadstartHandler:function (evt) {
      // console.log('started')
      // var percent = AjaxUploader.processedFiles / AjaxUploader.totalFiles * 100;
    },

    onloadHandler: function (evt) { 
      // console.log('success');   
      // $('#ajax_uploader').attr('value', '');
    },

    onprogressHandler: function (evt) {
      var percent = evt.loaded / evt.total * 100; 
      // console.log(percent); 
      // $('#upload_progress .bar').width(percent + '%');
    },
    
    onreadystatechangeHandler: function(evt){
      var status = null;
      
      try { status = evt.target.status; }
      catch(e) { return; }
      
      // readyState 4 means that the request is finished
      if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
        var response = JSON.parse(evt.target.responseText);
        var asset = new Asset({ id: response.id });  
        
        asset.merge(response);
        Asset.add(asset); 

        if(Asset.callback){ Asset.callback.call(this); }   
      }
    }
  });

});

