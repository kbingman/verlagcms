$(document).ready(function(){
  
  $.ajax({
    url: '/admin/sites/current.json',
    success: function(response){
      Verlag.pages = new Verlag.Collection.Pages(response.pages);
      // Verlag.folders = new Verlag.Collection.Folders(response.folders);
      Verlag.templates = new Verlag.Collection.Templates(response.templates);
      Verlag.sites = new Verlag.Collection.Sites(response.sites);
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
    if(e.target.id == 'overlay'){
      e.preventDefault();
      Verlag.closeModal();
    }
  });
  
  // Modal Events
  $('a.close').live('click', function(e){
    e.preventDefault();
    Verlag.closeModal();
  });
  
  // Key Master
  $('body').on('keypress', function(e){
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
  
  
  // Ace Keybingings
  Verlag.ace_settings();
  
  
});