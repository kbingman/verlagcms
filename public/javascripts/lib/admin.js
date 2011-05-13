jQuery(document).ready(function () {

  Assets.run();   
  Pages.run()
  // AjaxUploader.initialize('#ajax_uploader');
  jQuery('#ajax_uploader').attr('multiple','multiple');
  jQuery('.js-only').show();  
  
  // Grabs the keyboard shortcuts
  Utilities.keyboard_nav();  
  Utilities.check_browser_version(); 
  
});

