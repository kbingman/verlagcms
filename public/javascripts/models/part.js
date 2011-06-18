var Part = Model('part', function() {
  // this.persistence(Model.REST, "/assets"), 
 
  this.include({
    deleteRemote: function(page, callback){
      var self = this;
      var url = '/admin/pages/' + page.id() + '/parts/' + self.id() + '.json';   
      
      jQuery.ajax({
        type: 'DELETE',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          page.merge(results);
          callback.call(this);    
        }
      });
    }
  }),  
  
  this.extend({
    // returns a json array of all parts
    toMustache: function(query) {
      return {
        parts: this.map(function(part){                           
          return part.attr();
        })
      }
    },  
    
    create: function(attributes, callback){
      var url = '/admin/templates/' + attributes.template_id + '/parts.json';   
      var template = Layout.find(attributes.template_id);
      jQuery.ajax({
        type: 'post',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { part: attributes },
        success: function(results) {  
          template.merge(results);
          callback.call(this);
        }
      });
    }
    
    // load: function(page_id, callback) {
    //   Part.each(function(){ Part.remove(this); });
    //   var url = '/pages/' + page_id + '/parts.json';
    //   jQuery.ajax({
    //     type: 'get',
    //     url: url,
    //     contentType: "application/json",
    //     dataType: "json",  
    //     success: function(results) {
    //       jQuery.each(results, function(i, part_data) {
    //         var part = new Part({ id: part_data.id });
    //         part.merge(part_data);
    //         Part.add(part);
    //       });
    //       callback.call(this);
    //     }
    //   });
    // },

  });

});

