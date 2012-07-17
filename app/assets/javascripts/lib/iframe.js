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
      
      // TODO Centralize this
      content.on('keypress', function(e){
        if(e.keyCode == '115' && e.metaKey == true){
          e.preventDefault();
          // console.log(e.metaKey)
          // console.log('Hijacked Command+S or Ctrl+S, damn!');
          
          var form = $('form.command-save');
          if (form.length){
            form.find('input#save').trigger('click');
          }
        }
      });

      // Sets preview links to change the sammy.js routes instead of the usual route
      
      internal_links.click(function(e){
        var path = $(this).attr('href'); //.split('?')[0].replace('/preview','');
        var page = Verlag.pages.findByPath(path);
        
        if (page){
          e.preventDefault();
          Verlag.router.navigate(page.get('admin_path'), { trigger: true });
        }
      });
      // 
      var image_links = content.find('a.insert-image');
      image_links.click(function(e){
        e.preventDefault();
        
        var path = jQuery(this).attr('href');
        alert(path)
        // Base.trigger('image-browser', href);
      });
      
      if(callback){ callback.call(this); } 
    }); 
  }
}
