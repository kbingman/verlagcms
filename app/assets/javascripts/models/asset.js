Verlag.Model.Asset = Backbone.Model.extend({
      
  urlRoot: '/api/v1/assets',
  
  isImage: function(){
    return this.get('file_type') && this.get('file_type').match(/image/);
  },
  
  imagePath: function(){
    return '/images/' + this.id + '/' + this.get('file_name');
  },
  
  adminPath: function(){
    return '/admin/assets/' + this.id;
  },
  
  upload: function(file, callback){
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    var asset = this;

    var generateUuid = function(){
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = '0123456789ABCDEF';
      for (var i = 0; i < 32; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
      s[12] = '4';                                       // bits 12-15 of the time_hi_and_version field to 0010
      s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      return s.join(''); 
    };
  
    var onprogressHandler = function(evt){
      var percent = evt.loaded / evt.total * 100;
      $('#percent').text(percent + '%'); 
      console.log(asset.get('uuid'))
    };
  
    var onreadystatechangeHandler = function(evt){
      var status = null;
      try { status = evt.target.status; }
      catch(e) { return; }
  
      // readyState 4 means that the request is finished
      if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
        var response = JSON.parse(evt.target.responseText);
        asset.set(response);
        console.log(response)
        callback(asset, response);
      }
    };
    
    asset.set('uuid', generateUuid());
    formData.append('file', file);
    formData.append('folder_id', this.get('folder_id'));  
    
    xhr.upload.addEventListener('progress', onprogressHandler, false);
    xhr.addEventListener('readystatechange', onreadystatechangeHandler, false);
    xhr.open('POST', asset.urlRoot + '.json', true);
    xhr.send(formData);
  }
  
  
});
