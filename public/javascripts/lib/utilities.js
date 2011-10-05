var Galerie = {
  open: function(html, callback){
    $('body').append('<div id="overlay"></div>').append('<div id="modal_wrapper"><div id="modal"></div></div>');

    var modalWindow = $('#modal');
    modalWindow.html(html);

    var modalWrapper = $('#modal_wrapper');
    var docHeight =  $(window).height();
    var modalHeight =  modalWindow.height() + 42;
    var topMargin = (docHeight - modalHeight) / 2;

    $('#overlay').css({
      'height': docHeight
    }).hide().fadeIn('fast');

    modalWrapper.hide().fadeIn('fast').css({
      'top': topMargin
    });
    if(callback){ callback.call(this); }
  },

  close: function(){
    // if($('#modal_wrapper').visible()){
    //   alert('you can see me')
    // }
    $('#modal_wrapper').fadeOut('fast', function(){
      $(this).remove();
      $('#overlay').fadeOut('fast', function(){
        $(this).remove();
      });
    });
  }
}    

var logger = {
  info: function(message){
    if(window.console){
      console.log(message);
    } 
  },
  
  debug: function(message){
    if(window.console){
      console.log(message);
    } 
  }
}

var Utilities = { 
  
  notice: function(message){
    var notice = jQuery('.notice');
    notice.text(message); 
    notice.fadeIn('fast', function(){
      setTimeout(function(){
        notice.fadeOut('fast');
      }, 1000);
    });
  },     
  
  keyboard_nav: function(){      
    jQuery('body').keydown(function(e){ 
      // logger.info(e.keyCode);  
      switch (e.keyCode) {    
        // Cmd s
        // case 91 && 83:  
        //   logger.info('Save me!');     
        //   // this needs to change...
        //   var form = jQuery('form.command-save');
        //   form.submit();    
        //   // return false;
        //   e.preventDefault();
        //   break;
        // // Ctrl S
        // case 17 && 83: 
        //   logger.info('Save me!');       
        //   // this needs to change...
        //   // var form = jQuery('form.command-save');
        //   // form.submit(); 
        //   e.preventDefault();    
        //   break;
        // Left Arrow
        case 37:
          $('a.previous').click();
          break;
        // Right Arrow
        case 39:
          $('a.next').click();
          break; 
        // 'W' key
        // case 87:
        //   $('a.cancel').click();
        //   break; 
      }
    });
  }, 
  
  // Adds the '#' tag to all links if the history object is not available   
  // Temp. The zombie tests are failing with the history object...
  check_browser_version: function(){
    if (!Modernizr.history) {     
      jQuery('a').live('click', function(e){
        e.preventDefault();
        document.location.hash = $(this).attr('href');
      });
      var search_form = jQuery('form#search-form');
      search_form.attr('action', '#' + search_form.attr('action'));
    }
  },
  
  formObserver: function(element){      
    // jQuery(element).keyup(function() {
    //   delay(function(){
    //     var form = jQuery(element).parents('form:first');
    //     form.submit();
    //   }, 800);
    // });
  }  
  
} 

var Loader = {
  start: function(element){
    element.show();
    Loader.timer = setInterval(function(){
      var y = element.css('background-position-y').replace('px','');
      element.css({'background-position-y':  (y - 40) + 'px'});
    }, 67);
  },
  
  stop: function(element){
    element.hide();
    clearInterval(Loader.timer);
  }
}

var Updater = {
  
  setup: function(data, model){
    jQuery.each(data, function(i, item){
      var object = new model({ id: item.id });  
      object.merge(item);
      model.add(object);
    });
  },
  
  update: function(){
    window.ninja = true;
    jQuery.ajax({
      url: '/admin/activity.json',
      type: 'POST',
      data: { 'updated': window.current },
      success: function(data){
        jQuery.each(data.models, function(i, item){
          var object = Page.find(item.id);
          object.merge(item);
          console.log(item.id)
          var now = new Date();
          window.current = now.getTime();;
        });
        window.ninja = false;
      }
    });
  }
}

// Sets the ACE Editor modes depending on content type
var aceModes = {
  'javascript' : require('ace/mode/javascript').Mode,
  'html'       : require('ace/mode/html').Mode,
  'css'        : require('ace/mode/css').Mode,
  'scss'       : require('ace/mode/scss').Mode,
  'sass'       : require('ace/mode/scss').Mode,
  'none'       : require('ace/mode/text').Mode
}

var iFramer = {       
  initialize: function(element, callback){   
    var trigger = jQuery(element);  
    var loader_el = jQuery('#loader');
    var self = this;
    if(!trigger.length) return;
    
    Loader.start(loader_el);
 
    trigger.load(function(){   
      var iframe = $(this);

      var iFrameContent = iframe.contents();  
      var editor = iFrameContent.find('span.part-editor');
      var flags = editor.find('a'); 
      
      Loader.stop(loader_el); 
      self.setEditFlags(editor); 
      iframe.fadeIn('fast');
      
      // Sets preview links to change the sammy.js routes instead of the usual route
      var internal_links = iFrameContent.find('a[href^="/preview"]');
      internal_links.click(function(e){
        var link_path = $(this).attr('href').split('?')[0].replace('/preview','');
        var page = Page.find_by_path(link_path);
        if (page){
          e.preventDefault();
          // TODO This whole thing needs to be moved to sammy to have access to the routes
          document.location.path = page.attr('admin_path');
        }
      });
      
      flags.click(function(){  
        window.top.trigger = $(this);
        // TODO Use history object here
        window.top.location.hash = $(this).attr('href');  
        return false;
      });
      if(callback){ callback.call(this); } 
    }); 
  },
  
  setEditFlags: function(element){  
    element.css({
      'position': 'relative',  
      'display':  'block',
      'height':   '0',
      'width':    '0',
      'text-decoration': 'none'    
    }).find('span').css({
      'display': 'block',
      'position': 'absolute', 
      'top': '-24px',
      'left': '12px',
      'padding': '4px 8px', 
      'width': '100px',
      'background': 'rgba(255, 255, 0, 0.7)'
    });
  }
} 

var TabControl = {
  initialize: function(element){
    var tabs = jQuery(element);  
    if(!tabs) return;
    var self = this; 
    tabs.each(function(i, tab){
      $(tab).hide();
    }); 
    tabs.first().show();   
    self.tabControl(jQuery('.tab-control'));
  },
  
  tabControl: function(element){  
    element.click(function(){  
      var partId = $(this).find('label').attr('for').split('-')[1];
      var tabId = 'tab-' + partId;   
      
      jQuery('.tab').hide(); 
      jQuery('#' + tabId).show();
    })
  }
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
