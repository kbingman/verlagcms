Verlag.View.DesignEdit = Backbone.View.extend({

  el: '#editor',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    // 'click a': 'showTemplate'
    'click input#save-layout': 'update'
  },

  initialize: function(options) {
    this.layout = Verlag.collections.templates.get(options.id);
    $(this.el).undelegate();
  },
  
  data: function(){
    return {
      'layout': this.layout.toJSON(),
      'layout?': false
    }
  },

  render: function() {
    var template = Verlag.compile_template('admin-templates-edit');
    
    $(this.el).html(template.render(this.data())); 
    this.intitializeAce();
  },
  
  intitializeAce: function(){
    var layout = this.layout,
        mode = layout.get('mode'),
        editorMode = Verlag.ace_modes[mode];
    
    window.editor = ace.edit('layout_content');
    window.editor.setTheme('ace/theme/textmate');
    window.editor.getSession().setMode(new editorMode);
    window.editor.session.setUseWrapMode(true);
    // Because Mustache screws up my liquid templates, I just set it manually, directly from the model
    // This also eleminates the FUC
    window.editor.getSession().setValue(layout.get('content'));  
  },
  
  update: function(e){
    e.preventDefault();
    
    var attributes = {
      content: window.editor.getSession().getValue(),
      title: 'test'
    };
    
    console.log(attributes)
    
    this.layout.save(attributes ,{
      success: function(model, response){
        console.log(model)
        Verlag.notify('Layout saved')
      }
    });
  }
  

});
