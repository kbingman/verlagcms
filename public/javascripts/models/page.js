var Page = Model('page', function() {
  this.persistence(Model.SinatraREST, "/admin/pages"), 
   
  // Instance methods
  this.include({  
    
    initialize: function() {
      // this.attr('children', this.childrenAsJSON());
    },
    
    children: function(){
      var self = this, 
        p;
        
      jQuery.each(self.attr('child_pages'),function(i, c){ 
        p = Page.find(c.id);
        if(!p){
          p = new Page(c); 
          Page.add(p);
        }
        p.children();
      });
      return Page.find_all_by_parent_id(this.id());
    },
    
    set_children: function(callback){
      var self = this, 
        children = Page.select(function() {
          return this.attr('parent_id') == self.id()
        }).all(),
        children_as_json = [];
      
      jQuery.each(children, function(i, c){
        c.set_children(function(){
          children_as_json.push(c.asJSON());
        });
      });
      self.merge({ 
        'children?': children_as_json.length ? true : false,
        'child_count': children_as_json.length,
        'child_pages': children_as_json 
      });
      if(callback){ callback.call(this); }
    },
    
    setPartAttributes: function(part_id, attributes){
      var parts = this.attr('contents');
      var part;
      jQuery.each(parts, function(i, p){
        if(part_id == p['id']){
          if(attributes['content']){ p['content'] = attributes['content']; }
          if(attributes['asset_id']){ p['asset_id'] = attributes['asset_id']; }
          if(attributes['path']){ p['path'] = attributes['path']; }
          part = p;
        }
      });
      return part;
    },
    
    findPartByName: function(name){
      var parts = this.attr('contents');
      var part;
      jQuery.each(parts, function(i, p){
        if(name == p['name']){
          part = p;
          return false;
        }
      });
      return part;
    },
    
    findPartById: function(id){
      var parts = this.attr('contents');
      var part;
      jQuery.each(parts, function(i, p){
        if(id == p['id']){
          part = p;
          return false;
        }
      });
      return part;
    },
    
    getChildren: function(callback){
      var self = this;
      var url = '/admin/pages/' + self.id()  + '/children.json';   
      
      jQuery.ajax({
        type: 'GET',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          
          $.each(results, function(i, data) {
            var page = new Page({ id: data.id });
            page.merge(data);
            Page.add(page);
          });
          self.attr({
            'children?' : true,
            'children'  : self.childrenAsJSON()
          });
          if(callback){ callback.call(this, results); }    
        }
      });
    },
    
    has_children: function(){  
      if(this.children().all().length > 0){
        return true
      }
    }, 
    
    parent: function(){
      return Page.find(this.attr('parent_id'));
    },
    
    // assets: function(){ 
    //   var self = this;
    //   var assets = self.attr('assets'); 
    //   var length = assets.length;                                 
    //   
    //   for (var i=0, l=length; i<l; ++i ){
    //     var asset_data = assets[i];
    //     var asset = new Asset({ id: asset_data.id });  
    //     asset.merge(asset_data);
    //     Asset.add(asset);
    //   } 
    //   return Asset;
    // },
    
    parts: function(){
      var self = this;
      // TODO Change back to parts...
      var parts = self.attr('contents'); 
      var length = parts.length;                                 
      Part.each(function(){ Part.remove(this); });
      
      for (var i=0, l=length; i<l; ++i ){
        var part_data = parts[i];
        var part = new Part({ id: part_data.id });  
        part.merge(part_data);
        part.attr('page_id', self.id());
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
          Page.add(self); 
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
    
    // asJSON: function(){
    //   return Page.map(function(item){ return item.attr() });
    // },  
    
    root: function(){
      return this.detect(function(){
        return this.attr('parent_id') == null
      });
    }, 
    
    site_map: function(callback){
      var root = Page.root();
      Page.node(root, callback);
    },
    
    node: function(page, callback){
      var children = Page.select(function() {
        return this.attr('parent_id') == page.id()
      }).all();
      
      jQuery.each(children, function(i, c){
        c.parent().set_children();
        Page.node(c, callback);
      });
      
      if(children.length == 0){
        if(callback){ callback.call(this); }
      } 
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
    
    find_by_path: function(path){
      return this.detect(function(){
        return this.attr('path') == path
      });
    },
    
    load_by_id: function(id, callback){
      var url = '/admin/pages/' + id  + '.json';   
      
      jQuery.ajax({
        type: 'GET',
        url: url,
        // contentType: "application/json",
        dataType: "json",                   
        success: function(results) {    
          var page = Page.find(results.id);
          if(!page){
            var page = new Page({ id: results.id });
          }
          page.merge(results);
          Page.add(page); 
          if(callback){ callback.call(this, results); }    
        }
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
          callback.call(this, results)
        }
      });
    }
  });

});