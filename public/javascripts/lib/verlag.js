var Verlag = {};

Verlag.Model = {};
Verlag.Collection = {};
Verlag.View = {};

Verlag.collections = {};
Verlag.views = {};
Verlag.templates = {};

// Precompile and cache a given template with Hogan.js
// compiling is the most expensive part of Mustache templates
// so we attempt to only do it once
Verlag.compile_template = function(template){
  if (Verlag.templates[template]){
    return Verlag.templates[template];
  } else {
    Verlag.templates[template] = Hogan.compile($('#' + template).html());
    return Verlag.templates[template];
  }
};

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
  


  
