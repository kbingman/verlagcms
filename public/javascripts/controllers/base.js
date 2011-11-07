var Base = Sammy(function (app) {   
   
  app.debug = false; 
  app.use(Sammy.JSON); 
  app.use(Sammy.Mustache);
  app.use(Sammy.NestedParams); 
  app.template_engine = 'mustache'
  
  // Base Helpers
  // ------------------------------------------------------------------------------------------
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
  
  // Base Events
  // ------------------------------------------------------------------------------------------
  
  // Initialize App
  // ---------------------------------------------
  app.bind('run', function(){
    var application = this;
    // Starts the updater
    // app.updater = setInterval(function(){
    //   application.update();
    // }, 5000);
    
    // Starts page tree opener
    jQuery('#sidebar .opener').live('click', function(e){
      application.trigger('toggle-children', this);
      return false;
    });
    
    // Start the sidebar toggle
    application.trigger('toggle-sidebar');
    // TODO This needs to be abstracted or a css class or both...
    // if(jQuery.cookie('toggle-sidebar') == 'closed'){
    //   var sidebar = jQuery('div#sidebar');
    //   var editor =  jQuery('div#editor');
    //   var toggle = jQuery('div#toggle');
    //   
    //   sidebar.css({'width':'24px'}).toggleClass('closed');
    //   editor.css({'left':'24px'});
    //   toggle.css({'left':'24px'});
    // }
  });
 
  // Set Active Tab
  // ---------------------------------------------
  app.bind('set-active-tab', function(e, path){
    var tabs = jQuery('div#tabs a.tab');
    // TODO make this a decent regex    
    var name = path.split('?')[0].split('/')[2];
    // var name = 'folders' ? 'assets' : name;
    var active_tab = jQuery('#' + name + '-tab');
    
    tabs.removeClass('active');
    active_tab.addClass('active');
  });
  
  // Update Page
  // ---------------------------------------------
  app.bind('update-page', function(e, item){
    var page = Page.find(item.id);
    page.merge(item); 
    // Is this needed? Need to check js-model docs...
    page.save();

    jQuery('li#page-' + item.id).find('span.title a').text(page.attr('title'));
    // Sets page title
    jQuery('h1#page-title-' + page.id()).text(page.attr('title'));
    
    var iframe =jQuery('#page-iframe-' + page.id());
    if (iframe.length){
      var message = 'This page has been changed. Click here to reload.';
      Utilities.notice('<a class="page-reload" href="' + page.attr('admin_path') + '">' + message + '</span>', { 'persist': true, 'class': 'warning' });
    }
  });
  
  // Update Layout
  // ---------------------------------------------
  app.bind('update-layout', function(e, item){
    var layout = Layout.find(item.id); 
    layout.merge(item); 
    layout.save();
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
        }
      }); 
    });
    setTimeout(function(){
      textareas.fadeIn('fast');
    }, 420);
  });
  
  // Sidebar Toggle
  // ---------------------------------------------
  app.bind('toggle-sidebar', function(e){
    var sidebar = jQuery('div#sidebar');
    var editor =  jQuery('div#editor');
    var toggle = jQuery('p#toggle');
    var sidebarToggle = toggle.find('a');
    sidebarToggle.click(function(e){
      e.preventDefault();
      if(sidebar.hasClass('closed')){
        var width = '300';
        jQuery.cookie('sidebar_toggled', '');
      } else {
        var width = '24';
        jQuery.cookie('sidebar_toggled', 'closed');
      }
      if(!Modernizr.cssanimations){
        sidebar.animate({'width':width}, 200).toggleClass('closed');;
        editor.animate({'left':width}, 200).toggleClass('open');
        toggle.animate({'left':width}, 200).toggleClass('open');
      }else{
        console.log('Move.js goes here')
        sidebar.animate({'width':width}, 200).toggleClass('closed');;
        editor.animate({'left':width}, 200).toggleClass('open');
        toggle.animate({'left':width}, 200).toggleClass('open');
      }

    })
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
    var path = request.path;
    if(request && request.verb == 'get'){
      request.trigger('set-active-tab', path);
    }
  });

});