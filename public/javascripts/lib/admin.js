jQuery(document).ready(function () {

  App.run();
  // AjaxUploader.initialize('#ajax_uploader');
  jQuery('#ajax_uploader').attr('multiple','multiple');
  jQuery('.js-only').show(); 
   
  // TODO move this to the utilities file
  jQuery('body').keydown(function(e){    
    switch (e.keyCode) {
      // Left Arrow
      case 37:
        $('a.previous').click();
        break;
      // Right Arrow
      case 39:
        $('a.next').click();
        break; 
      // 'W' key
      case 87:
        $('a.cancel').click();
        break; 
    }
  });   
  
  // Adds the '#' tag to all links if the history object is not available   
  if (!Modernizr.history) {     
    jQuery('a').live('click', function(e){
      e.preventDefault();
      document.location.hash = $(this).attr('href');
    });
    var search_form = jQuery('form#search-form');
    search_form.attr('action', '#' + search_form.attr('action'));
  }  
  // Temp. The zombie tests are failing with the history object...  
  
});

