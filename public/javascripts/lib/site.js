$(document).ready(function () {

  App.run();
  
});

App = Sammy(function (app) {

  this.use(Sammy.title)

  this.bind('run', function () {
    // alert('hey');
    app.modal = false;
  });
  
  // Shows a search result of assets
  this.get('/search/:query', function (req){
    Galerie.close();
    var query = req.params['query'] ? req.params['query'].replace(/ /g, '+') : null;
    // First makes a json request to the sinatra app with the query, 
    // then renders the result using a mustache template
    if(!app.modal){
      Asset.searchRemote(query, function(){
        var assetList = new AssetListView (Asset.toMustache(query));
        assetList.render();
      });
    }
    app.modal = false;
    // req.setTitle('Search: ' + query);
  });
  
  // This just sanitizes the url and redirects to the assets route
  this.get('/search', function (req) {
    Galerie.close();
    var query = req.params['query'] ? req.params['query'].replace(/ /g, '+') : null;
    if(!app.modal){
      Asset.searchRemote(query, function(){
        var assetList = new AssetListView(Asset.toMustache(query));
        assetList.render();
      });
    }
    app.modal = false;
  });
  
  this.get('/assets/:query/:id', function(req){     
    // This removes the default non js div when we land directly on this page. 
    $('#display').remove(); 
    
    var query = req.params['query'] ? req.params['query'] : null;  
    var displayContents = $('<div />').attr('id', 'asset-display-container');
    Galerie.open(displayContents, function(){
      var asset = Asset.find(req.params['id']); 
      // Checks the local storage for assets and renders it
      // If no asset it found, calls the search api and gets it
      if(asset){
        var assetDisplay = new AssetDisplayView({'asset': asset.attr()});
        assetDisplay.render();   
      }else{
        Asset.searchRemote(query, function(){      
          var asset = Asset.find(req.params['id']);              
          var assetDisplay = new AssetDisplayView({'asset': asset.attr()});
          assetDisplay.render();
        });
      }
      // sets a flag so the the search results are not reloaded
      app.modal = true;
      
    });
  });
  
  this.get('/:page', function (req) {
    var page = req.params['page'];
    $('h1').text('Page ' + page);
    $('#search-query').attr('value', '');
    // req.setTitle('Page: ' + page);
    $('#asset-list-container').html('');
    $('#asset-display-container').html();
  });
  
  this.get('/', function (req) {
    $('h1').text('Start Page');
  });

});
