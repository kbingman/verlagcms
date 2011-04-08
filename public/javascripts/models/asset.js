var Asset = Model('asset', {
  // persistence: Model.REST("/assets"),
  toMustache: function(query) {
    return {
      assets: this.map(function(asset){ return asset.attr() }), 
      query: query
    }
  },
  searchRemote: function(query, callback) {
    var queryData = decodeURIComponent(jQuery.param({'query': query}));
    Asset.each(function(){ Asset.remove(this); });
    var url = '/search.json?' + queryData;
    $.getJSON(url, function(data) {
      $.each(data, function(i, assetData) {
        var asset = new Asset({ id: assetData.id });
        assetData.query = query;
        asset.merge(assetData);
        Asset.add(asset);
      });
      callback.call(this);
    });
  }
});

