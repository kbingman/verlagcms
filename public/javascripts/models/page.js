var Page = Model('page', function() {
  // this.persistence(Model.REST, "/assets"), 
   
  // Instance methods
  this.include({  
    
    children: function(){ 
      var children = [];
      return Page.find_all_by_parent_id(this.id())
    },  
    
    parts: function(){ 
      var self = this;
      var parts = self.attr('parts'); 
      var length = parts.length;                                 
      
      for (var i=0, l=length; i<l; ++i ){
        var part_data = parts[i];
        var part = new Part({ id: part_data.id });  
        part.merge(part_data);
        Part.add(part);
      } 
      return Part;
    },  
    
    load: function(callback){
      var self = this;
      var url = '/admin/pages/' + self.id()  + '.json';   
      
      jQuery.ajax({
        type: 'GET',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          self.merge(results);    
          callback.call(this);    
        }
      });
    }, 
    
    // exatract this for general use...
    saveRemote: function(callback){
      var url = '/admin/pages/' + this.id() + '.json';
      var self = this;
      self.save();
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { 'page': self.attributes },
        success: function(results) {
          self.merge(results);
          if(callback['success']){ callback['success'].call(this); }
        }
      });
    },
    
    deleteRemote: function(callback){
      var self = this;
      var url = '/admin/pages/' + self.id()  + '.json';   
      
      jQuery.ajax({
        type: 'DELETE',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          Page.remove(self);    
          callback.call(this);    
        }
      });
    }  
    
  }), 
  
  // Class methods
  this.extend({
    // returns a json array of all assets, including the query and query_path
    toMustache: function(query) {
      return {
        pages: this.map(function(page){                           
          return page.attr() 
        })
      }
    },  
    
    root: function(){
      return this.detect(function(){
        return this.attr('parent_id') == null
      });
    }, 
    
    find_by_parent_id: function(parent_id){
      return this.detect(function(){
        return this.attr('parent_id') == parent_id
      });
    },
    
    find_all_by_parent_id: function(parent_id){
      return this.select(function(){
        return this.attr('parent_id') == parent_id
      });
    },
    
    create: function(attributes, callback){
      var url = '/admin/pages.json';
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
    
    load: function(callback) {
      Page.each(function(){ Page.remove(this); });
      var url = '/admin/pages.json';
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
          if(callback){ callback.call(this); }
        }
      });
    }

  });

});