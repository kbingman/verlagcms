var Site = Model('site', function() {
  // this.persistence(Model.REST, "/assets"), 
 
  this.include({

  }),  
  
  this.extend({  
    load: function(callback) {
      Site.each(function(){ Site.remove(this); });
      var url = '/admin/sites.json';
      jQuery.ajax({
        type: 'get',
        url: url,
        // contentType: "application/json",
        dataType: "json",  
        success: function(results) {
          jQuery.each(results, function(i, results) {
            var site = new Site({ id: results.id });
            site.merge(results);
            Site.add(site);
          });
          if(callback){ callback.call(this); }
        }
      });
    },    
    
    toMustache: function(query) {
      return {
        sites: this.map(function(site){                           
          return site.attr() 
        })
      }
    }, 
    
    create: function(attributes, callback){
      var url = '/admin/sites.json';
      jQuery.ajax({
        type: 'post',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { site: attributes },
        success: function(results) { 
          console.log(results)  
          if(results.errors){
            if(callback['error']){ callback['error'].call(this); } 
          }else{
            var site = new Site({ id: results.id });
            site.merge(results);
            Site.add(site);
            if(callback['success']){ callback['success'].call(this); }   
          }   
        }
      });
    }
  });
  
});