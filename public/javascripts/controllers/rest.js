Sites = Sammy(function (app) {
  
  var context = this; 
  
  this.debug = false;
  this.disable_push_state = true;  
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache); 
  this.use(Sammy.NestedParams);  
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({  

  });

  this.bind('run', function () {
    context.modal = false;
    context.refresh_pages = true; 
  }); 
  
  // Site Index
  // ---------------------------------------------
  this.get('#/:model', function(request){ 
    var test = this.params['model'].toObject();
    alert(this.params['model'])
  });  
 
  
});