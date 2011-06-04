var Layout = Model('layout', function() {
  // this.persistence(Model.REST, "/assets"), 
   
  // Instance methods
  this.include({  
    // extract this for general use...
    saveRemote: function(callback){ 
      var self = this;  
      var url = '/admin/templates/' + self.id() + '.json';
      
      self.save();
      jQuery.ajax({
        type: 'PUT',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { 'layout': self.attributes },
        success: function(results) {
          self.merge(results);
          if(callback['success']){ callback['success'].call(this); }
        }
      }); 
    }
  }), 
  
  // Class methods
  this.extend({ 
    
    // returns a json array of all assets, including the query and query_path
    toMustache: function() {
      return {
        layouts: this.map(function(layout){                           
          return layout.attr() 
        })
      }
    },
    
    asJSON: function(layout_id){
      return Layout.map(function(item){  
        if(layout_id == item.id()){ item.attr('selected', 'selected') } 
        return item.attr(); 
      });
    }, 
    
    find_by_class: function(klass){
      return this.detect(function(){
        return this.attr('klass') == klass
      });
    },  
    
    find_all_by_class: function(klass){
      return this.select(function(){
        return this.attr('klass') == klass
      });
    }, 
    
    asJSON_by_class: function(klass){
      return this.find_all_by_class(function(){
        return klass.map(function(item){ return item.attributes });
      });
    },
    
    load: function(callback) {
      Layout.each(function(){ Layout.remove(this); });  
      var url = '/admin/templates.json';  
      
      jQuery.ajax({
        type: 'get',
        url: url,
        contentType: "application/json",
        dataType: "json",  
        success: function(results) {  
          jQuery.each(results, function(i, results) {
            var page = new Layout({ id: results.id });
            page.merge(results);
            Layout.add(page);
          });
          if(callback){ callback.call(this); }
        }
      });
      
    },  
    
    create: function(attributes, callback){
      var url = '/admin/templates.json';
      jQuery.ajax({
        type: 'post',
        url: url,
        // contentType: "application/json",
        dataType: "json",
        data: { template: attributes },
        success: function(results) {       
          var layout = new Layout({ id: results.id });
          layout.merge(results);
          Layout.add(layout);
          callback.call(this);
        }
      });
    },

  });

}); 

