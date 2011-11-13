var Editor = {
  
  initialize: function(){
    var buttons = jQuery('#testForm input[type=button]');
    var save = jQuery('#testForm input#save');
    buttons.click(function(){
      // alert(jQuery(this).attr('id'));
      var cmd = jQuery(this).data('cmd');
      var bool = false;
      var value = jQuery(this).data('value');
      if (value == 'promptUser'){
        value = prompt(jQuery(this).data('text'));
      }
      var iframe = jQuery('iframe')[0];
      if(cmd){
        iframe.contentDocument.execCommand(cmd, bool, value);
      }
    });
    
    save.click(function(){
      var pathHash = document.location.pathname.split('/');
      var id = pathHash[pathHash.length-1];
      var page = Page.find(id);
      var iframe = jQuery('iframe');
      var parts = {};
      iframe.contents().find('div.editable').each(function(){
        var self = jQuery(this);
        var name = self.attr('id').split('_')[0];
        parts[name] = self.html();
      });
      jQuery.each(parts, function(name, content){
        page.setPartContent(name, content);
      });
      page.save();
      
      // alert('Save me! ' + page.attr('title'));
      
    });
  },
  
  textilize: function(html, escape){
    // console.log(html)
    html = html.replace(/\s*<p>((.|[\r\n])*?)<\/p>\s*/gi, "\n\n$1\n\n");
    html = html.replace(/<br ?\/?>/gi, "\n");
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
  
}

