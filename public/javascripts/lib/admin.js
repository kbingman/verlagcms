jQuery(document).ready(function () {
  
  // Global ajax indicator
  var loader_el = jQuery('#loader');
  var image = jQuery('<img />', {'src': '/images/loader.png'});
  jQuery('body')
    .ajaxStart(function() {
      if(!window.ninja){
        Loader.start(loader_el);
      }
    }).ajaxSuccess(function() {
      Loader.stop(loader_el);
    });

  // Loads mustache templates and runs sammy app
  var login = jQuery('#login');   
  if(!login.length){
    jQuery.ajax({
      url: '/templates',
      success: function(results){
        jQuery('head').append(results);
        // Pages.run();
      }
    });
    // Gets one big object that loads everything at once
    jQuery.ajax({
      url: '/admin/sites/current.json',
      success: function(results){
        Updater.setup(results.pages, Page);
        Updater.setup(results.templates, Layout);
        // Updater.setup(results.assets, Asset);
        Updater.setup(results.folders, Folder);
        Base.run();
        window.timestamp = results.now;
      }
    });
  }

  // Grabs the keyboard shortcuts
  // Utilities.keyboard_nav();  
  // Utilities.check_browser_version(); 
  // Utilities.setNonHistoryLinks(); 
  
  // ACE Save. Only works with the ACE editor windows
  var canon = require("pilot/canon");  
  canon.addCommand({
    name: "save",
    bindKey: {
      win: "Ctrl-S",
      mac: "Command-S",
      sender: "editor"
    },
    exec: function() {
      jQuery('form.command-save').submit();
    }
  });
  
});
