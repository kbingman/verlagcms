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
      window.ninja = true;
      jQuery.ajax({
        url: '/admin/activity.json',
        type: 'POST',
        data: { 'updated': window.current },
        success: function(data){
          jQuery.each(data.models, function(i, item){
            // console.log(item.class_name);
            if(item.class_name == 'Page'){ 
              Page.find(item.id).merge(item); 
              //  application.trigger('page-index');
            }
            if(item.class_name == 'Layout'){ 
              Layout.find(item.id).merge(item); 
              // Render Index
            }
            var now = new Date();
            window.current = now.getTime();;
          });
          window.ninja = false;
        }
      });
    }

  });
  
  app.bind('run', function(){
    var application = this;
    app.updater = setInterval(function(){
      application.update();
    }, 5000);
  });
  
  app.bind('set-active-tab', function(request){
    var tabs = jQuery('div#tabs a.tab');
    // TODO make this a decent regex
    var name = request.path.split('?')[0].split('/')[2];
    var active_tab = jQuery('#' + name + '-tab');
    
    tabs.removeClass('active');
    active_tab.addClass('active');
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