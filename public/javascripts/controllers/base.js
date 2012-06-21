Verlag.Routes.Base = Sammy(function (app) {   
   
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
        data: { 'updated': Verlag.timestamp },
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
    if(jQuery.cookie('toggle-sidebar') == 'closed'){
      var sidebar = jQuery('div#sidebar');
      var editor =  jQuery('div#editor');
      var toggle = jQuery('div#toggle');
      
      sidebar.toggleClass('closed');
      editor.css({'left':'0'});
      toggle.css({'left':'0'});
    }
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
      Utilities.notice('<a class="page-reload" href="' + page.attr('admin_path') + '">' + message + '</span>', { 
        'persist': true, 
        'class': 'warning' 
      });
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
  
  // Image Browser
  // ---------------------------------------------
  app.bind('image-browser', function(e, href){
    var application = this,
    page_id = href.split('/')[3],
    part_id = href.split('/')[5],
    page = Page.find(page_id),
    part = page.findPartById(part_id),
    params = { 'limit': 12, 'page': 1 };

    Asset.searchAdmin(params, function(){
      var html = application.load(jQuery('script#admin-image_parts-index')).interpolate({ 
        assets: Asset.asJSON(), 
        part: part.attributes
      }, 'mustache');
      html.appendTo('body').then(function(){
        jQuery('ul.assets .image a').click(function(e){
          // e.preventDefault();
          var target = jQuery(e.currentTarget);
          var target_src = target.find('img').attr('src').split('?')[0];
          var asset_id = target.attr('id').split('-')[2];
          
          var iframe = jQuery('iframe#page-iframe-' + page.id());
          if(iframe.length){
            var img = iframe.contents().find('img[src^="' + part['path'] + '"]').first();
          }else{
            var img = jQuery('img[src^="' + part['path'] + '"]').first();
          }

          // Sets new image src. This may not be entirely reliable...
          var new_src = img.attr('src').replace(img.attr('src').split('?')[0], target_src);
          img.attr('src', new_src);
          
          jQuery('#overlay').fadeOut('fast', function(){
            jQuery(this).remove();
          });
          
          page.setPartAttributes(part_id, { 
            'asset_id': asset_id,
            'path': new_src
          });
          page.save();
          return false;
        }); 
      });

    });
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
        var width = '0';
        jQuery.cookie('sidebar_toggled', 'closed');
      }
      if(!Modernizr.cssanimations){
        sidebar.animate({'width':width}, 200).toggleClass('closed');;
        editor.animate({'left':width}, 200).toggleClass('open');
        toggle.animate({'left':width}, 200).toggleClass('open');
      }else{
        console.log('Move.js goes here');
        // sidebar.css({
        //   '-webkit-transform': 'width(0)',
        //   '-moz-transform': 'width(0)',
        //   'transform': 'width(0)',
        //   '-webkit-transition': 'all 0.5s ease-in'
        // });
        sidebar.animate({'width':width}, 200).toggleClass('closed');;
        editor.animate({'left':width}, 200).toggleClass('open');
        toggle.animate({'left':width}, 200).toggleClass('open');
      }

    });
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