Verlag.View.DesignEdit = Backbone.View.extend({

  el: '#editor',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'showLayout',
    // 'click a.js-new-part': 'newPart',
    // 'submit form#edit-layout': 'update',
    'keyup #code-editor': 'saveOnKeyUp', 
    'click a.js-settings': 'showSettings',
    'click a.js-insert': 'insert',
    'click a.js-remove': 'remove'
  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'update', 'saveOnKeyUp', 'aceSettings', 'showSettings');
    var self = this; 
    
    this.model = Verlag.templates.get(options.id); 
    this.model.fetch({
      success: function(model, response){
        self.aceSettings();
        if(Verlag.aceEditor){
          Verlag.aceEditor.destroy();
        }
        self.render();
      }
    });
    $(self.el).undelegate();
  },

  render: function() {
    var template = HoganTemplates['templates/edit'],
        data = {
          'layouts': Verlag.templates.findByKlass('Layout').map(function(l){
            return l.toJSON()
          }),
          'layout': this.model.toJSON(),
          'layout?': false
        };
    
    $(this.el).html(template.render(data)); 
    this.intitializeAce();
    $('a.tab').removeClass('active');
    $('a#templates-tab').addClass('active');
    
    
    Verlag.sidebar = new Verlag.View.DesignIndex({
      layout: this.model.get('klass') == 'Layout' ? this.model.toJSON() : null
    });
    
  },
  
  intitializeAce: function(){
    var layout = this.model,
        mode = layout.get('mode'),
        editorMode = this.ace_modes[mode];
        
    Verlag.aceEditor = ace.edit('code-editor');
    Verlag.aceEditor.setTheme('ace/theme/textmate');
    Verlag.aceEditor.getSession().setMode(new editorMode);
    Verlag.aceEditor.session.setUseWrapMode(true);
    Verlag.aceEditor.getSession().setValue(layout.get('content'));  
  },
  
  saveOnKeyUp: function(e){
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(this.update, 720);
  },
  
  update: function(){
    var attributes = {
      content: Verlag.aceEditor.getSession().getValue()
    };
    
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    
    this.model.save(attributes, {
      success: function(model, response){
        Verlag.notify('Layout saved')
      }
    });    
  }, 
  
  // newPart: function(e){
  //   e.preventDefault();
  //   var klass = $(e.target).data('klass');
  //   var partType = new Verlag.Model.PartType();
  //   
  //   Verlag.modal = new Verlag.View.New({ 
  //     model: partType, 
  //     collection: 'partType' 
  //   });
  // },
  
  insert: function(e){
    e.preventDefault();
    Verlag.modal = new Verlag.View.Insert({ 
      model: this.model
    });
  },
  
  showSettings: function(e){
    Verlag.modal = new Verlag.View.Settings({ 
      model: this.model,
      collection: this.model.get('klass').toLowerCase() + 's',
      success: this.render
    });
  },
  
  showLayout: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  }, 

  remove: function(e){
    e.preventDefault();
    var template = this.model;
  
    Verlag.modal = new Verlag.View.Remove({ 
      model: template, 
      collection: 'templates' 
    });
  },  
  
  // ACE Editor keyboard shortcuts
  aceSettings: function(){
    var self = this;
    var canon = require('pilot/canon');  
    
    // ACE Editor modes depending on content type
    this.ace_modes = {
      'javascript' : require('ace/mode/javascript').Mode,
      'html'       : require('ace/mode/html').Mode,
      'css'        : require('ace/mode/css').Mode,
      'scss'       : require('ace/mode/scss').Mode,
      'sass'       : require('ace/mode/scss').Mode,
      // 'less'       : require('ace/mode/less').Mode,
      'textile'    : require('ace/mode/textile').Mode,
      // 'partial'    : require('ace/mode/scss').Mode,
      'none'       : require('ace/mode/scss').Mode
    }
    
    
    canon.addCommand({
      name: 'save',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S',
        sender: 'editor'
      },
      exec: this.update
    });
  }

});
