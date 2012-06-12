Verlag.View.NewFolder = Backbone.View.extend({

  el: 'body',
  tagName:  'div',

  // Cache the template function for a single item.
  // template: Hogan.compile($('#carousel_template').html()),

  // The DOM events specific to an item.
  events: {
    'click a.close': 'close_modal',
    'click #overlay': 'close_overlay',
    'click form#new-folder button': 'create_folder'
  },

  initialize: function(options) {
    $(this.el).undelegate();
  },

  render: function() {
    var template = Verlag.compile_template('admin-folders-new'),
        data = {};

    $(template.render(data)).hide().appendTo(this.$el).fadeIn('fast');
  },
  
  close_modal: function(){
    $('#overlay').fadeOut('fast', function(){
      $(this).remove();
    });
    // Verlag.router.navigate('/admin/folders', { trigger: false });
  },
  
  close_overlay: function(e){
    e.preventDefault();
    if(e.target.id == 'overlay'){
      this.close_modal(e);
    }
  },
  
  create_folder: function(e){
    e.preventDefault();
    var form = $(e.target).parents('form');
    var name = form.find('input#folder-name').val();
    var self = this;

    var folder = new Verlag.Model.Folder();
    folder.save({ name: name }, {
      success: function(){
        Verlag.notify('Folder created');
        Verlag.folders.add(folder)
        self.close_modal();
      }
    });
  }
  
});
