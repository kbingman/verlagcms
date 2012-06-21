// Basic Namespace for the app
// Creating a new instance of this object makes the correct calls
// to instantiate all the models, editors, etc. 
var Verlag = (function(){
  
  if (!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
      
  var self = this;  
  
  self.init = function(){
    self.global_responders();
    self.ace_settings();
    self.load_models();
  };  
  
  // Global ajax indicator
  self.global_responders = function(){
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
  };

  // Loads mustache templates and runs sammy app
  self.load_models = function(){
    var login = jQuery('#login');   
    if(!login.length){
      jQuery.ajax({
        url: '/admin/sites/current.json',
        success: function(results){
          self.setup_models(results.pages, Page);
          Page.site_map();    
        
          // Adds the current user
          Verlag.current_user = new User(results.current_user);
          self.setup_models(results.templates, Layout);
          self.setup_models(results.folders, Folder);
          Verlag.Routes.Base.run();
          Verlag.timestamp = results.now;
        }
      });
    }
  };
  
  // Creates a model from JSON
  self.setup_models = function(data, model){
    jQuery.each(data, function(i, item){
      var object = new model({ id: item.id });  
      object.merge(item);
      model.add(object);
    });
  };
  
  // ACE Save. Only works with the ACE editor windows
  self.ace_settings = function(){
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
  }
  
  self.init();
}());

// ACE Editor modes depending on content type
Verlag.ace_modes = {
  'javascript' : require('ace/mode/javascript').Mode,
  'html'       : require('ace/mode/html').Mode,
  'css'        : require('ace/mode/css').Mode,
  'scss'       : require('ace/mode/scss').Mode,
  'sass'       : require('ace/mode/scss').Mode,
  'textile'    : require('ace/mode/textile').Mode,
  'none'       : require('ace/mode/scss').Mode
}

Verlag.Routes = {};
Verlag.Models = {};
Verlag.Utils = {};

