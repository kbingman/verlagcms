Sites = Sammy(function (app) {
  
  var application = this; 
  
  // this.use(Sammy.Title);  
  this.use(Sammy.JSON); 
  this.use(Sammy.Mustache); 
  this.use(Sammy.NestedParams);  
  
  // Helper Methods 
  // ---------------------------------------------  
  this.helpers({  

  });

  this.bind('run', function () {
    application.modal = false; 
    application.first_run = true;  
  }); 
  
  // Asset Index
  // ---------------------------------------------
  this.get('#/sites', function(request){ 
    alert('sites')
  }); 
  
});