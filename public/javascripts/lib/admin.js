jQuery(document).ready(function () {

  // Loads mustache templates and runs sammy app
  var login = jQuery('#login');   
  if(!login.length){
    jQuery.ajax({
      url: '/templates',
      success: function(results){
        jQuery('head').append(results);
        Pages.run('#/pages');
      }
    });
  }
  
  // Global ajax indicator
  var loader_el = jQuery('#loader');
  jQuery('body')
    .ajaxStart(function() {
      if(!window.ninja){
        Loader.start(loader_el);
      }
    }).ajaxSuccess(function() {
      Loader.stop(loader_el);
    });
    
  // Grabs the keyboard shortcuts
  Utilities.keyboard_nav();  
  Utilities.check_browser_version();    
  
});

