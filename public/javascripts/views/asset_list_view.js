AssetListView = View("asset-list", {

  init: function () {
    var self = this;

    var reload = function () {
      self.reload(Asset.toMustache());
    }

    Asset.bind('add', reload);
    Asset.bind('remove', reload);
  }
  
});

AssetDisplayView = View("asset-display", {

  init: function () {
    var self = this;

    var reload = function(asset) {
      self.reload(asset.attr());
    }
  }
  
});