Verlag.View.Iframe = Backbone.View.extend({

  el: '.preview',
  tagName:  'div',

  events: {

  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'update', 'saveOnKeyup', 'editor');
    this.page = options.page;
    this.iframe = $(this.el).find('iframe');
    this.render();
  },

  render: function(id) {
    var self = this;
    var iframe = this.iframe;
        
    iframe.load(function(){  
      var contents = iframe.contents();
      
      // Sets the editable areas. This is the main editor
      self.editor(contents);
        
      // Gets the links and fires the correct verlag routes 
      self.setPageLinks(contents);
      
      self.hideToolbar(contents);
      
      // reposition editor
      // contents.on('scroll', function(){
      //   console.log('hey');
      // })
    });
  },
  
  saveOnKeyup: function(e){
    e.preventDefault();
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(this.update, 700);
  },
  
  update: function(){
    var page = this.page,
        editableAreas = this.editableAreas,
        parts = page.get('parts');

    editableAreas.each(function(i, part){
      var id = $(part).attr('id').split('-')[1],
          content = $(part).html(),
          p = _.detect(parts, function(p){ return p.id == id });
      if(p) p.content = content;
    });
    
    page.save({ 
      parts: parts 
    },{
      success: function(model, response){
        if(!response.errors){
          Verlag.notify('Page saved')
        } else {
          console.log(response);
          alert('error');
        }
      },
      error: function(reponse){
        console.log(response);
        alert('error');
      }
    });

  }, 
  
  editor: function(contents){
    var self = this; 
    var iframe = this.iframe;
    
    this.editableAreas = contents.find('div.editable');
    this.editableAreas
      .attr('contenteditable','true')
      .css({
        'background': 'hsla(1, 0%, 0%, 0.05)'
      })
      .on('click', function(e){
        e.stopPropagation();
      })
      .on('keyup', this.saveOnKeyup)
      .on('focus', function(e){
        $(this).css({

        });
        Verlag.toolbar = new Verlag.View.Toolbar({
          page: self.page,
          iframe: iframe,
          offset: $(e.target).offset()
        });
      })
      .on('blur', function(){
        $(this).css({
 
        });
      });
        
    // Command / Control S to save
    contents.on('keypress', function(e){
      if(e.keyCode == '115' && e.metaKey == true){
        e.preventDefault();
        self.update();
      }
    });
  },
  
  setPageLinks: function(contents){
    var links = contents.find('a');
    links.on('click', function(e){
      var path = $(this).attr('href');
      var page = Verlag.pages.findByPath(path);
      
      if (page){
        e.preventDefault();
        Verlag.router.navigate(page.get('admin_path'), { trigger: true });
      }
    });  
  }, 
  
  hideToolbar: function(contents){
    contents.on('click', function(e){
      console.log('hey');
      if(Verlag.toolbar){
        Verlag.toolbar.leave();
      }
    });
  }
  
});
