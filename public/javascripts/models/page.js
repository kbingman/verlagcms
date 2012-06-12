Verlag.Model.Page = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  url: function() {
    return '/admin/pages/' + this.id + '.json';
  },
  
  initialize: function() {
    
  }, 
  
  children: function(){
    var self = this,
      children = Verlag.pages.select(function(page){
        return page.get('parent_id') == self.id;
      });
      
    return new Verlag.Collection.Pages(children);
  },
  
  children_to_json: function(){
    return this.children().map(function(child){
      return child.to_json();
    });
  },
  
  to_json: function(){
    var self = this,
      attr = self.toJSON();
    
    attr['children'] = self.children_to_json()
    return attr;
  },
  
  admin_path: function(){
    return '/admin/pages/' + this.id 
  }
  
});