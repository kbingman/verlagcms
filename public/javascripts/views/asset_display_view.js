AssetDisplayView = View("asset-display", {

  init: function () {
    var self = this;

    var reload = function(asset) {
      self.reload(asset.attr());
    }
  }
  
});