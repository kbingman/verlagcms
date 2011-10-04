var Base = Sammy(function (app) {   
  
  var context = this;  
   
  app.debug = false; 
  app.use(Sammy.JSON); 
  app.use(Sammy.Mustache);
  app.use(Sammy.NestedParams); 
  
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
        data: { 'updated': window.current },
        success: function(data){
          jQuery.each(data.models, function(i, item){
            if(item.class_name == 'Page'){ 
              applicaton.trigger('update-page', item.id);
            }
            if(item.class_name == 'Layout'){ 
              applicaton.trigger('update-layout', item.id);
            }
            // Sets window timestamp
            var now = new Date();
            window.current = now.getTime();
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
    app.updater = setInterval(function(){
      application.update();
    }, 5000);
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
  app.bind('update-page', function(page_id){
    page = Page.find(item.id);
    page.merge(item); 
    // Temp
    // var node = application.load(jQuery('script#admin-pages-node')).interpolate({ pages: [page.asJSON()] }, 'mustache');
    // node.replace(el);
    var el = jQuery('li#page-' + item.id);
    el.find('span.title a').text(page.attr('title'));
  });
  
  // Update Layout
  // ---------------------------------------------
  app.bind('update-layout', function(layout_id){
    layout = Layout.find(item.id); 
    layout.merge(item); 
    var el = jQuery('li#layout-' + item.id);
    el.find('span.title a').text(layout.attr('name'));
  });
  
  // Before Filters
  // ---------------------------------------------
  app.before(function(){
    // jQuery('.modal-editor').remove(); 
    Galerie.close(); 
  });
  
  // Sets active tab
  app.before(function(request) {
    // request.trigger('set-active-tab');
  });

});