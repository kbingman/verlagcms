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
