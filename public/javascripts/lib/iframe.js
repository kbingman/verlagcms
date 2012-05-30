Verlag.iFramer = {       
  initialize: function(element, callback){   
    var iframe = jQuery(element);  
    var loader_el = jQuery('#loader');
    
    if(!iframe.length) return;
    // iframe.hide()
    
    // console.log(trigger) 
    // Loader.start(loader_el);
    
    // The load event is not always being fired...
    iframe.load(function(){   
      var content = iframe.contents();  
      var areas = content.find('div.editable');
      var internal_links = content.find('a'); // iFrameContent.find('a[href^="/preview"]');
      // var editor = iFrameContent.find('span.part-editor');
      // var flags = editor.find('a'); 
      
      // Sets the editable parts so they can actually be edited live
      areas.attr('contenteditable','true').css({'background': 'hsla(210, 77%, 90%, 0.4)' });
      
      // Loader.stop(loader_el); 
      // self.setEditFlags(editor); 
      // iframe.fadeIn('fast');           

      // Sets preview links to change the sammy.js routes instead of the usual route
      
      // internal_links.click(function(e){
      //   var self = jQuery(this);
      //   // if(!self.hasClass('verlag-editor')){
      //     var link_path = self.attr('href').split('?')[0].replace('/preview','');
      //     var page = Page.find_by_path(link_path);
      //     if (page){
      //       e.preventDefault();
      //       Pages.setLocation(page.attr('admin_path'));
      //     }
      //   // }
      // });
      // 
      // var image_links = content.find('a.insert-image');
      // image_links.click(function(e){
      //   e.preventDefault();
      //   var href = jQuery(this).attr('href');
      //   Base.trigger('image-browser', href);
      // });
      
      if(callback){ callback.call(this); } 
    }); 
  }
}
