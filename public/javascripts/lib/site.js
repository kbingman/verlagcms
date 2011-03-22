$(document).ready(function () {

  App.start()

});

App = Davis(function (app) {

  this.use(Davis.title)

  this.bind('start', function () {
    //alert('hey');
  });
  
  // Shows a search result of assets
  this.get('/search/:query', function (req){
    var query = req.params['query'].replace(/\+/g, ' ')
    $('h1').text('Search: ' + query);
    req.setTitle('Search: ' + query);
  });
  
  // This just sanitizes the url and redirects to the assets route
  this.get('/search', function (req) {
    var query = req.params['query'] ? req.params['query'].replace(/ /g, '+') : null;
    if(query){
      req.redirect(req.path + '/' + query);
    }
  });
  
  this.get('/:page', function (req) {
    var page = req.params['page'];
    $('h1').text('Page ' + page);
    $('#search-query').attr('value', '');
    // req.setTitle('Page: ' + page);
  });
  
  this.get('/', function (req) {
    $('h1').text('Start Page');
    
  });

});
