var Layout = Model('template', function() {
  this.persistence(Model.SinatraREST, "/admin/templates"), 
   
  // Instance methods
  this.include({  

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
    
    asLayoutJSON: function(layout_id){
      return Layout.find_all_by_class('Layout').map(function(item){    
        if(layout_id == item.id()){ 
          item.attr('selected', 'selected="selected"') 
        }else{
          item.attr('selected', '')  
        } 
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
    }

  });

}); 

