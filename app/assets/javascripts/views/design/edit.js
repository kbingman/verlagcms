Verlag.View.DesignEdit = Backbone.View.extend({

  el: '#editor',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'showLayout',
    'click a.js-new-part': 'newPart',
    'submit form#edit-layout': 'update'
  },

  initialize: function(options) {
    this.layout = Verlag.templates.get(options.id);
    $(this.el).undelegate();
    if(Verlag.aceEditor){
      Verlag.aceEditor.destroy();
    }
    this.render();
  },
  
  data: function(){
    return {
      'layouts': Verlag.templates.findByKlass('Layout').map(function(l){
        return l.toJSON()
      }),
      'layout': this.layout.toJSON(),
      'layout?': false
    }
  },

  render: function() {
    var template = HoganTemplates['templates/edit'];
    
    $(this.el).html(template.render(this.data())); 
    this.intitializeAce();
    $('a.tab').removeClass('active');
    $('a#templates-tab').addClass('active');
    
    
    Verlag.sidebar = new Verlag.View.DesignIndex({
      layout: this.layout.get('klass') == 'Layout' ? this.layout.toJSON() : null
    });
    
  },
  
  intitializeAce: function(){
    var layout = this.layout,
        mode = layout.get('mode'),
        editorMode = Verlag.ace_modes[mode];
        
    Verlag.aceEditor = ace.edit('layout_content');
    Verlag.aceEditor.setTheme('ace/theme/textmate');
    Verlag.aceEditor.getSession().setMode(new editorMode);
    Verlag.aceEditor.session.setUseWrapMode(true);
    // Because Mustache screws up my liquid templates, 
    // I just set it manually, directly from the model
    // This also eleminates the FUC
    Verlag.aceEditor.getSession().setValue(layout.get('content'));  
  },
  
  update: function(e){
    e.preventDefault();
    
    var attributes = {
      content: Verlag.aceEditor.getSession().getValue(),
      name: $(e.target).find('input#layout_name').val()
    };
    
    this.layout.save(attributes, {
      success: function(model, response){
        Verlag.notify('Layout saved')
      }
    });
  }, 
  
  newPart: function(e){
    e.preventDefault();
    var klass = $(e.target).data('klass');
    var partType = new Verlag.Model.PartType();
    
    Verlag.modal = new Verlag.View.New({ 
      model: partType, 
      collection: 'partType' 
    });
  },
  
  showLayout: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  },
  
  

});
