var Page = Model('page', function() {
  // this.persistence(Model.REST, "/assets"), 
 
  this.include({

  }),
  this.extend({
    // returns a json array of all assets, including the query and query_path
    toMustache: function(query) {
      return {
        pages: this.map(function(page){                           
          return page.attr(); 
        })
      }
    },  
    
    create: function(attributes, callback){
      alert(JSON.stringify(attributes));
      var url = '/pages.json';
      jQuery.ajax({
        type: 'post',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { page: attributes },
        success: function(results) {       
          var page = new Page({ id: results.id });
          page.merge(results);
          Page.add(page);
          callback.call(this);
        }
      });
    },
    
    load: function(page_id, callback) {
      Page.each(function(){ Page.remove(this); });
      var url = '/pages.json';
      jQuery.ajax({
        type: 'get',
        url: url,
        contentType: "application/json",
        dataType: "json",  
        success: function(results) {
          jQuery.each(results, function(i, results) {
            var page = new Page({ id: results.id });
            page.merge(results);
            Page.add(page);
          });
          callback.call(this);
        }
      });
    },

  });

});