Verlag.Model.PartType = Backbone.Model.extend({
  
  urlRoot: function(){
    return '/api/v1/templates/' + this.get('template_id') + '/parts';
  }
  
});
