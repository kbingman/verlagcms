$(document).ready(function(){
  
  $.ajax({
    url: '/admin/sites/current.json',
    success: function(response){
      Verlag.collections.pages = new Verlag.Collection.Pages(response.pages);
      Verlag.collections.folders = new Verlag.Collection.Folders(response.folders);
      Verlag.current_user = new Verlag.Model.User(response.current_user);
      
      Verlag.router = new Verlag.Router();
      Backbone.history.start({ pushState: true });
    }
  });
  
  // Main navigation - perhaps needs to be moved to a view
  $('div#tabs a.tab').bind('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    
    Verlag.router.navigate(href, { trigger: true });
  });  
  
  // Modal links 
  $('#overlay').live('click', function(e){
    var href = $('a.cancel').attr('href');
    if(e.target.id == 'overlay'){
      Verlag.router.navigate(href, { trigger: true });
    }
  })
  
});