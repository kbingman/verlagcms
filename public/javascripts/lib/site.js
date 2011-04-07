$(document).ready(function () {

  App.start();
  
});

App = Davis(function (app) {

  this.use(Davis.title)

  // this.bind('start', function () {
  //   alert('hey');
  // });
  
  // Shows a search result of assets
  this.get('/search/:query', function (req){
    var query = req.params['query'].replace(/\+/g, ' ');
    // First makes a json request to the sinatra app with the query, 
    // then renders the result using a mustache template
    alert(query)
    Asset.searchRemote(query, function(){
      var assetList = new AssetListView (Asset.toMustache(query));
      alert(JSON.stringify(assetList))
      // assetList.render();
    });
    req.setTitle('Search: ' + query);
  });
  
  // This just sanitizes the url and redirects to the assets route
  this.get('/search', function (req) {
    var query = req.params['query'] ? req.params['query'].replace(/ /g, '+') : null;
    if(query){
      req.redirect(req.path + '/' + query);
    }
  });
  
  this.get('/assets/:query/:id', function(req){
    var asset = Asset.find(req.params['id']);
    console.log(asset);
    var assetDisplay = new AssetDisplayView(asset);
    assetDisplay.render();
  });
  
  this.get('/:page', function (req) {
    var page = req.params['page'];
    $('h1').text('Page ' + page);
    $('#search-query').attr('value', '');
    req.setTitle('Page: ' + page);
  });
  
  this.get('/', function (req) {
    $('h1').text('Start Page');
    $('#asset-list-container').html();
    $('#asset-display-container').html();
  });

});
