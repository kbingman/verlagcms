Verlag.Model.Page = Backbone.Model.extend({
  
  urlRoot: '/api/v1/pages',
  
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