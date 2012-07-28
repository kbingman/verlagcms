Verlag.Model.Item = Backbone.Model.extend({
  
  urlRoot: '/api/v1/items',
  
  isImage: function(){
    return this.get('file_type') && this.get('file_type').match(/image/);
  },
  
  imagePath: function(){
    '/images/' + this.id + '/' + this.get('file_name') + '?w=240&amp;h=180&amp;c=t&amp;g=North';
  },
  
  adminPath: function(){
    var type = this.get('_type') ? this.get('_type').toLowerCase() + 's/'  : '';
    var path = '/admin/' + type + this.id;
    return path;
  }

});
