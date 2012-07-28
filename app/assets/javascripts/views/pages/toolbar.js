Verlag.View.Toolbar = Backbone.View.extend({

  el: 'body',

  // The DOM events specific to an item.
  events: {
    'click': 'hide',
    'click .toolbar': 'toolbar',
    'click .toolbar input': 'buttonCmd'
  },

  initialize: function(options) {
    _.bindAll(this, 'render', 'buttonCmd');
    $(this.el).undelegate();
    this.iframe = options.iframe;
    this.page = options.page;
    this.left = options.offset.left + this.iframe.offset().left;
    this.top = options.offset.top + this.iframe.offset().top;
    this.render();
  },

  render: function() {
    var template = HoganTemplates['pages/toolbar'];
    
    $(template.render()).hide().appendTo($(this.el)).fadeIn('fast');
    
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
  },
  
  buttonCmd: function(e){
    e.stopPropagation();
    e.preventDefault();
    
    var target = $(e.target),
        cmd = target.data('cmd'),
        bool = false,
        value = target.data('value'),
        iframe = this.iframe[0];
      
    if (value == 'promptUser'){
      value = prompt(target.data('text'));
    }
    if(cmd){
      iframe.contentDocument.execCommand(cmd, bool, value);
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(function(){
        Verlag.iframe.update();
      }, 500);
      
    }
  },
  
  textilize: function(html, escape){
    html = html.replace(/\s*<p>((.|[\r\n])*?)<\/p>\s*/gi, "\n\n$1\n\n\n");
    // html = html.replace(/<br ?\/?>/gi, "\n");
    html = html.replace(/\s*<h1>((.|[\r\n])*?)<\/h1>\s*/gi, "h1. $1\n\n");
    html = html.replace(/\s*<h2>((.|[\r\n])*?)<\/h2>\s*/gi, "h2. $1\n\n");
    html = html.replace(/\s*<h3>((.|[\r\n])*?)<\/h3>\s*/gi, "h3. $1\n\n");
    html = html.replace(/\s*<h4>((.|[\r\n])*?)<\/h4>\s*/gi, "h4. $1\n\n");
    html = html.replace(/\s*<h5>((.|[\r\n])*?)<\/h5>\s*/gi, "h5. $1\n\n");
    html = html.replace(/\s*<h6>((.|[\r\n])*?)<\/h6>\s*/gi, "h6. $1\n\n");
    html = html.replace(/<(?:b|strong)>((.|[\r\n])*?)<\/(?:b|strong)>/gi, '*$1*');
    html = html.replace(/<(?:i|em)>((.|[\r\n])*?)<\/(?:i|em)>/gi, '_$1_');
    html = html.replace(/<(?:strike|del)>((.|[\r\n])*?)<\/(?:strike|del)>/gi, '-$1-');
    html = html.replace(/<(?:u|ins)>((.|[\r\n])*?)<\/(?:u|ins)>/gi, '+$1+');
    html = html.replace(/<a href="(.*?)">((.|[\r\n])*?)<\/a>/gi, '"$2":$1');
    html = html.replace(/<code.*?>((.|[\r\n])*?)<\/code>/gi, '@$1@');
    if (escape){
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');//Escape any remaining HTML
    }
    html = html.replace(/(\r\n|\n){3,}/g, "\n\n");
    html = html.replace(/^[\r\n]+|[\r\n]+$/g, '');
    return html;
  }
  

});
