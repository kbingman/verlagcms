var zombie = require("zombie");
var assert = require("assert");

// Welcome page
// Load the page from localhost
zombie.visit("http://localhost:4567/", function (err, browser, status) {
  // Browser Title
  assert.equal(browser.text("title"), "The Daily Scan – Home");
  
  // Make sure we have an element with the ID container.
  assert.ok(browser.querySelector("#container"));
});

// Main Search
// zombie.visit("localhost:4567/search", function (err, browser, status) {
//   console.log(browser.html());  
  // browser.fill("search-query", "smut").pressButton("Search", function(err, browser, status) {
  //   setTimeout(function(){
  //     console.log('ASSETS: waited 13 ms');
  //     // var response = browser.lastResponse.body;
  //     // console.log(response);
  //     // assert.ok(response.assets.length > 0);
  //     // assert.ok(response.artist == null);
  //     // console.log(browser.html('#query_field'));
  //     console.log(browser.html());
  //   }, 13);   
  // });

// });

// zombie.visit("http://davisapp.dev/", function(err, browser, status){
//   
//   browser.location = "#/admin/artists"; 
//   browser.wait(function(err, browser) {
//     var response = JSON.parse(browser.lastResponse.body);
//     console.log('ASSETS: waited 0 ms');
//     console.log(response.artists.length);
//     assert.ok(response.assets == null);
//     assert.ok(response.artists.length > 0); 
//     console.log(browser.html('#content'));
//     console.log();
//   });
//   
// });

