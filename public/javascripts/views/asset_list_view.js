AssetListView = View('asset-list', {

  init: function () {
    var self = this;

    var reload = function () {
      self.reload(Asset.sortBy('created_at').reverse().toMustache());
    }
  }
  
});

AssetIndexView = View('asset-index', {

  init: function () {
    var self = this;

    var reload = function () {
      self.reload(Asset.toMustache());
    }

    Asset.bind('add', reload);
    Asset.bind('remove', reload);
  }
  
});

AssetDisplayView = View('asset-display', {

  init: function () {
    var self = this;

    var reload = function(asset) {
      self.reload(asset.attr());
    }
  },
  
  beforeRender: function () {
    this.html
      .find('img')
        .hide();
  },
  
  afterRender: function () {
    this.html
      .find('img')
        .fadeIn('slow');
  }
  
});

EditAssetView = View('edit-asset', {

  init: function () {
    var self = this;

    var reload = function(asset) {
      self.reload(asset.attr());
    }
  },
  
  beforeRender: function () {
    this.html
      .find('.html-only, img')
        .hide();
  },
  afterRender: function () {
    this.html
      .find('img')
        .fadeIn('slow');
  }
  
});  

RemoveAssetView = View('remove-asset', {

  init: function () {
    var self = this;

    var reload = function(asset) {
      self.reload(asset.attr());
    }
  },
  
  beforeRender: function () {
    this.html
      .find('.html-only, img')
        .hide();
  },
  afterRender: function () {
    this.html
      .find('img')
        .fadeIn('slow');
  }
  
});

NewPartView = View('new-part', {

  init: function () {
    var self = this;

    var reload = function(page) {
      self.reload(page.attr());
    }
  }
  
});

RemovePartView = View('remove-part',{}); 

RemovePageView = View('remove-page',{});  

NewPageView = View('new-page',{}); 

SearchFormView = View('search-form',{});

NodeView = View('node',{
  init: function () {
    var self = this;

    var reload = function(page) {
      self.reload(page.attr());
    }
  }
});

TableView = View('table',{
  init: function () {
    var self = this;

    var reload = function(page) {
      self.reload(page.attr());
    }
  }
});  

FormView = View('form',{
  
});