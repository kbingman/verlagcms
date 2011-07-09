var Site = Model('site', function() {
  this.persistence(Model.SinatraREST, '/admin/sites'), 
 
  this.include({

  }),  
  
  this.extend({    
    toMustache: function(query) {
      return {
        sites: this.map(function(site){                           
          return site.attr() 
        })
      }
    } 
  });
  
});