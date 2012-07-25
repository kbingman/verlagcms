Verlag.View.Toolbar = Backbone.View.extend({

  el: 'body',

  // The DOM events specific to an item.
  events: {
    'click': 'hide',
    'click .toolbar': 'toolbar'
  },

  initialize: function(options) {
    var iframe = $('iframe');
    this.page = options.page;
    this.left = options.offset.left + iframe.offset().left;
    this.top = options.offset.top + iframe.offset().top;
    this.render();
  },

  render: function() {
    var template = HoganTemplates['pages/toolbar'];
    
    $(this.el).append(template.render());
    $(this.el).find('.toolbar').css({
      top: this.top - 42 + 'px',
      left: this.left + 'px'
    });
  },
  
  leave: function(){
    this.off;
    
    $('.toolbar').fadeOut('fast', function(){
      $(this).remove();
    });  
  },
  
  hide: function(e){
    this.leave();
  }, 
  
  toolbar: function(e){
    e.stopPropagation();
  }

});
