jQuery(document).ready(function () {

  // logger.info('Starting!!!')
  
  jQuery('body').ajaxStart(function() {
    logger.info('starting');
  });
  
  jQuery('body').ajaxSuccess(function() {
    logger.info('success!');
  });
  
  var login = jQuery('#login');   
  if(!login.length){
    // loads mustache templates
    jQuery.ajax({
      url: '/templates',
      success: function(results){
        jQuery('head').append(results);
        Pages.run('#/pages');
      }
    });
  }


  // AjaxUploader.initialize('#ajax_uploader');
  // jQuery('#ajax_uploader').attr('multiple','multiple');
  // jQuery('.js-only').show();  
  
  // Grabs the keyboard shortcuts
  Utilities.keyboard_nav();  
  Utilities.check_browser_version();    
   
  // needs to fire on page load, too
  // var tabs = jQuery('#tabs a'); 
  // tabs.live('click', function(){   
  //   tabs.removeClass('active');
  //   $(this).addClass('active'); 
  // });
  
});

