$(document).ready(function(){
  
  $.ajax({
    url: '/admin/sites/current.json',
    success: function(response){
      Verlag.pages = new Verlag.Collection.Pages(response.pages);
      Verlag.folders = new Verlag.Collection.Folders(response.folders);
      Verlag.templates = new Verlag.Collection.Templates(response.templates);
      
      Verlag.current_user = new Verlag.Model.User(response.current_user);
      
      Verlag.router = new Verlag.Router();
      Backbone.history.start({ pushState: true });
    }
  });
  
  // Main navigation - perhaps needs to be moved to a view
  $('div.nav a.tab').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    
    Verlag.router.navigate(href, { trigger: true });
  });  
  
  // Modal Events
  $('#overlay').live('click', function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      Verlag.closeModal();
    }
  });
  
  // Modal Events
  $('a.close').live('click', function(e){
    e.preventDefault();
    Verlag.closeModal();
  });
  
  Verlag.ace_settings()
  key('command+s, ctrl+s', function(e){
    e.preventDefault();
    console.log('Hijacked Command+S or Ctrl+S, damn!');
  });
  
});