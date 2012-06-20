// resizes and centers modals vertically. 
// Horizontal centering is handled with CSS...
Verlag.loadModal = function(element, callback){
  var self = this;
  var container = jQuery(element);
  if(!container.length){ return }

  // Loader.start();

  var img = container.find('img');
  if(img.length){
    setTimeout(function(){
      if(container.height() < 20){
        img.load(function(){
          self.resizeModal(img, container, callback);
        });
      } else {
        self.resizeModal(img, container, callback);
      }
    }, 13);
  } else {
    // if there is no image. This needs to move to a function
    var docWidth = jQuery(window).width();
    var docHeight = jQuery(window).height();
      
    container.css({
      'width': '640px',
      'height': '480px',
      'margin-top': (docHeight - 540)/2 + 'px'
    });
    // Loader.stop();
    if(callback){ callback.call(this); }
  }
};

Verlag.resizeModal = function(img, container, callback){
  var temp_img = img.clone(),
   width = temp_img[0].width,
   height = temp_img[0].height,
   ratio = width / height,
   docWidth = jQuery(window).width(),
   docHeight = jQuery(window).height(),
   margins = 40;
     
     
  if(container.height() >= (docHeight - 40)){
    img
      .height(docHeight - 40)
      .width((docHeight - 40) * ratio);
    container
      .height(docHeight - 40)
      .width((docHeight - 40) * ratio);
  } 
    
  if(container.width() >= (docWidth - 40)){
    img
      .height((docWidth - 40) / ratio)
      .width(docWidth - 40);
    container
      .height((docWidth - 40) / ratio)
      .width(docWidth - 40);
    container.css({
      'margin-top': (docHeight - ((docWidth - 40) / ratio))/2
    });
  } 
  if(container.width() < (docWidth - 40) && container.height() < (docHeight - 40)) {
    container.css({
      'width': (container.height() * ratio) + 'px',
      'margin-top': (docHeight - container.height())/2
    });
  }
  // Loader.stop();
  if(callback){ callback.call(this); }
};

