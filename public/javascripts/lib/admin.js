jQuery(document).ready(function () {

  // logger.info('Starting!!!')
  
  var login = jQuery('#login');   
  if(!login.length){
    Pages.run('#/pages');
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

