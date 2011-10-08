var Base = Sammy(function (app) {   
   
  app.debug = false; 
  app.use(Sammy.JSON); 
  app.use(Sammy.Mustache);
  app.use(Sammy.NestedParams); 
  app.template_engine = 'mustache'
  
  // Helper Methods 
  // ---------------------------------------------
  app.helpers({  
    
    setup: function(data, model){
      jQuery.each(data, function(i, item){
        var object = new model({ id: item.id });  
        object.merge(item);
        model.add(object);
      });
    },

    update: function(){
      var application = this;
      // Sets invisible (no indicator) Ajax requests
      window.ninja = true;
      jQuery.ajax({
        url: '/admin/activity.json',
        type: 'POST',
        data: { 'updated': window.timestamp },
        success: function(data){ 
          jQuery.each(data.models, function(i, item){
            if(item.class_name == 'Page'){ 
              application.trigger('update-page', item);
            }
            if(item.class_name == 'Layout'){ 
              application.trigger('update-layout', item);
            }
            // Sets window timestamp
            Utilities.setTimestamp();
          });
          window.ninja = false;
        }
      });
    }

  });
  
  // Initialize App
  // ---------------------------------------------
  app.bind('run', function(){
    var application = this;
    // Starts the updater
    // app.updater = setInterval(function(){
    //   application.update();
    // }, 5000);
  });
 
  // Set Active Tab
  // ---------------------------------------------
  app.bind('set-active-tab', function(request){
    var tabs = jQuery('div#tabs a.tab');
    // TODO make this a decent regex
    var name = request.path.split('?')[0].split('/')[2];
    var active_tab = jQuery('#' + name + '-tab');
    
    tabs.removeClass('active');
    active_tab.addClass('active');
  });
  
  // Update Page
  // ---------------------------------------------
  app.bind('update-page', function(e, item){
    page = Page.find(item.id);
    page.merge(item); 
    // Temp
    // var node = application.load(jQuery('script#admin-pages-node')).interpolate({ pages: [page.asJSON()] }, 'mustache');
    // node.replace(el);
    var el = jQuery('li#page-' + item.id);
    el.find('span.title a').text(page.attr('title'));
    // Sets page title
    jQuery('h1#page-title-' + page.id()).text(page.attr('title'));
    
    var iframe =jQuery('#page-iframe-' + page.id());
    if (iframe.length){
      var message = 'This page has been changed. Click here to reload.'
      Utilities.notice('<a class="page-reload" href="' + page.attr('admin_path') + '">' + message + '</span>', { persist: true, class: 'warning' });
      // Reloads page
      // Utilities.notice(message);
      // var pageFrame = jQuery('iframe#page-iframe-' + page.id());
      // var src = pageFrame.attr('src');
      // pageFrame.attr('src', src);
      // // Sets page title
      // jQuery('h1#page-title-' + page.id()).text(page.attr('title'));
    }
  });
  
  // Update Layout
  // ---------------------------------------------
  app.bind('update-layout', function(e, item){
    layout = Layout.find(item.id); 
    layout.merge(item); 
    var el = jQuery('li#layout-' + item.id);
    el.find('span.title a').text(layout.attr('name'));
    // Utilities.notice('Updated layout');
  });
  
  // Initialize Sanskrit Editor
  // ---------------------------------------------
  app.bind('sanskrit', function(e, element){
    if(!element.length){ return }
    
    var textareas = element.find('textarea.sanskrit');
    // textareas.hide();
    textareas.each(function(i, t){
      var editor = new Sanskrit(t, {
        toolbar: {
          // onEm: function(){
          //   alert('image goes here!') 
          // },
          actions: {
            'strong': 'B', 
            'em': 'I', 
            'ins': 'ins', 
            'del': 'del', 
            'link': 'link', 
            'unlink': 'unlink',
            'textile': 'Textile'
          }  
        },
      }); 
    });
    setTimeout(function(){
      textareas.fadeIn('fast');
    }, 420);
  });
  
  // Before Filters
  // ---------------------------------------------
  app.before(function(){
    // jQuery('.modal-editor').remove(); 
    Galerie.close(); 
    // Utilities.hideNotice();
  });
  
  // Sets active tab
  app.before(function(request) {
    // request.trigger('set-active-tab');
  });

});