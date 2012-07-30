Verlag.View.DesignIndex = Backbone.View.extend({

  el: '#sidebar',

  tagName:  'div',

  // The DOM events specific to an item.
  events: {
    'click a.js-show': 'show',
    'click a.js-new': 'new'
  },

  initialize: function(options) {
    var self = this;
    Verlag.templates.on('all', function(){
      self.render();
    });
    $(this.el).undelegate();
    this.render();
  },
  
  data: function(){

    return {
      templates: [{
        title: 'Layouts',
        klass: 'Layout',
        models: Verlag.templates.findByKlass('Layout').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Partials',
        klass: 'Partial',
        models: Verlag.templates.findByKlass('Partial').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Stylesheets',
        klass: 'Stylesheet',
        models: Verlag.templates.findByKlass('Stylesheet').map(function(l){
          return l.toJSON()
        })
      },{
        title: 'Javascripts',
        klass: 'Javascript',
        models: Verlag.templates.findByKlass('Javascript').map(function(l){
          return l.toJSON()
        })
      }]
    }
  },

  render: function() {
    var template = HoganTemplates['templates/index'];
    
    $(this.el).html(template.render(this.data())); 
    $('a.tab').removeClass('active');
    $('a#templates-tab').addClass('active');
  },
  
  new: function(e){
    e.preventDefault();
    var klass = $(e.target).data('klass');
    var template = new Verlag.Model.Template({
      klass: klass,
      content: ' '
    });
    
    Verlag.modal = new Verlag.View.New({ 
      model: template, 
      collection: 'templates' 
    });
  },
  
  show: function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    Verlag.router.navigate(path, { trigger: true });
  }
  
});
