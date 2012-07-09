Verlag.Model.Page = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/pages/' + this.id + '.json';
  // },
  
  urlRoot: '/api/v1/pages',
  
  initialize: function() {
    
  }, 
  
  children: function(){
    var self = this,
      children = Verlag.pages.select(function(page){
        return page.get('parent_id') == self.id;
      });
      
    return new Verlag.Collection.Pages(children);
  },
  
  childData: function(){
    return this.children().map(function(child){
      return child.pageData();
    });
  },
  
  pageData: function(){
    var attr = this.toJSON();
    
    attr['children'] = this.childData();
    return attr;
  },
  
  adminPath: function(){
    return '/admin/pages/' + this.id 
  }
  
  
});