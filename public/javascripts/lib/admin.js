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
  Utilities.setNonHistoryLinks(); 
  
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
  
  // TODO move to utilities or base.js
  // Reloads iframe
  jQuery('a.page-reload').live('click', function(){
    var id = jQuery(this).attr('href').split('/')[3];
    var pageFrame = jQuery('iframe#page-iframe-' + id);
    // var src = pageFrame.attr('src');
    pageFrame.attr('src', pageFrame.attr('src'));
    Utilities.hideNotice();
  });
  
  // Temp? Hides notices when changing pages...
  jQuery('div#sidebar a').live('click', function(){
    Utilities.hideNotice();
  });
  
  // Resizes Modals on window resize
  jQuery(window).resize(function(){
    var container = jQuery('div#asset-editor'); 
    Utilities.loadModal(container);
  });
  
  // Events
  // TODO Organize all live events into a central spot 
  // and bind them with sammy events
  jQuery('a.insert-file').live('click', function(e){ 
    e.preventDefault();
    window.editor.insert($(this).attr('href')); 
  });

  
});

// Sets the default styles in the sanskrit iFrame
Sanskrit.defaultStyle = 'html { padding:0; cursor:text; } body { font-family: "Helvetica Neue", Arial, helvetica; color: #333; background: #fff; font-size: 100%; margin:0; padding:0.5em; cursor:text; } p { margin: 0.5em 0; }';

