var Verlag = {};

Verlag.Model = {};
Verlag.Collection = {};
Verlag.View = {};

// TODO make a view
Verlag.notify = function(message, options){
  var options = options || {};
  var klass = options['class'] || 'message';
  var notice = jQuery('.notice');
  
  notice
    .html(message) 
    .addClass(klass)
    .fadeIn('fast', function(){
      setTimeout(function(){
        if (!options['persist']){
          notice.fadeOut('slow');
        }
      }, 1800);
    });
}; 
  
Verlag.hide_notice = function(){
  jQuery('.notice').fadeOut('slow');    
};

// ACE Editor keyboard shortcuts
Verlag.ace_settings = function(){
  var canon = require('pilot/canon');  
  canon.addCommand({
    name: 'save',
    bindKey: {
      win: 'Ctrl-S',
      mac: 'Command-S',
      sender: 'editor'
    },
    exec: function() {
      jQuery('form.command-save').submit();
    }
  });
}

// ACE Editor modes depending on content type
Verlag.ace_modes = {
  'javascript' : require('ace/mode/javascript').Mode,
  'html'       : require('ace/mode/html').Mode,
  'css'        : require('ace/mode/css').Mode,
  'scss'       : require('ace/mode/scss').Mode,
  'sass'       : require('ace/mode/scss').Mode,
  // 'less'       : require('ace/mode/less').Mode,
  'textile'    : require('ace/mode/textile').Mode,
  // 'partial'    : require('ace/mode/scss').Mode,
  'none'       : require('ace/mode/scss').Mode
}
