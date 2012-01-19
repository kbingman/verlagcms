var iFramer = {       
  initialize: function(element, callback){   
    var trigger = jQuery(element);  
    var loader_el = jQuery('#loader');
    var self = this;
    if(!trigger.length) return;
    
    // console.log(trigger) 
    // Loader.start(loader_el);
    
    // The load event is not always being fired...
    trigger.load(function(){   
      var iframe = $(this);  
      var content = iframe.contents();  
      var areas = content.find('div.editable');
      // var editor = iFrameContent.find('span.part-editor');
      // var flags = editor.find('a'); 
      
      // Sets the editable parts so they can actually be editted live
      areas.attr('contenteditable','true').css({'background': 'hsla(30, 17.7%, 61%, 0.3)' });
      
      // Loader.stop(loader_el); 
      // self.setEditFlags(editor); 
      // iframe.fadeIn('fast');           

      // Sets preview links to change the sammy.js routes instead of the usual route
      var internal_links = content.find('a'); // iFrameContent.find('a[href^="/preview"]');
      internal_links.click(function(e){
        var self = jQuery(this);
        // if(!self.hasClass('verlag-editor')){
          var link_path = self.attr('href').split('?')[0].replace('/preview','');
          var page = Page.find_by_path(link_path);
          if (page){
            e.preventDefault();
            Pages.setLocation(page.attr('admin_path'));
          }
        // }
      });
      
      var image_links = content.find('a.insert-image');
      image_links.click(function(e){
        e.preventDefault();
        var href = jQuery(this).attr('href');
        Base.trigger('image-browser', href);
      });
      // 
      // flags.click(function(e){  
      //   e.preventDefault();
      //   window.top.trigger = $(this);
      //   // TODO Use history object here
      //   // window.top.location.hash = $(this).attr('href');  
      //   var path = $(this).attr('href');  
      //   history.pushState({part: path}, "Part", path);
      //   // return false;
      // });
      
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