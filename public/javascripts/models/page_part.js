var PagePart = Model('page_part', function() {
  // this.persistence(Model.REST, "/assets"), 
 
  this.include({

  }),
  this.extend({
    // returns a json array of all assets, including the query and query_path
    toMustache: function(query) {
      return {
        parts: this.map(function(part){                           
          return part.attr(); 
        })
      }
    },  
    
    create: function(attributes, callback){
      alert(JSON.stringify(attributes));
      var url = '/pages/' + attributes.page_id + '/parts.json';
      jQuery.ajax({
        type: 'post',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { part: attributes },
        success: function(results) {       
          var part = new PagePart({ id: results.id });
          part.merge(results);
          PagePart.add(part);
          callback.call(this);
        }
      });
    },
    
    load: function(page_id, callback) {
      PagePart.each(function(){ PagePart.remove(this); });
      var url = '/pages/' + page_id + '/parts.json';
      jQuery.ajax({
        type: 'get',
        url: url,
        contentType: "application/json",
        dataType: "json",  
        success: function(results) {
          jQuery.each(results, function(i, part_data) {
            var part = new PagePart({ id: part_data.id });
            part.merge(part_data);
            PagePart.add(part);
          });
          callback.call(this);
        }
      });
    },

  });

});

