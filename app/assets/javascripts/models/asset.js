Verlag.Model.Asset = Backbone.Model.extend({
  
  // Makes nice rails style json urls 
  // url: function() {
  //   return '/admin/assets/' + this.id + '.json';
  // },
  
  urlRoot: '/admin/assets',
  
  initialize: function() {
    
  },
  
  admin_path: function(){
    return '/admin/folders/' + this.folder_id + '/assets/' + this.id 
  }
  
  // // Uploads a file using ajax to an existing asset
  // upload: function(params, callback){
  //     
  //   var self = this,
  //     file = params['file'],
  //     url = '/admin/assets.json',
  //     xhr = new XMLHttpRequest(),
  //     uuid = self.generate_uuid(),
  //     query_params = JSON.stringify({ 'folder_id': params['folder_id'] });
  // 
  //   // Hack?
  //   Asset.callback = callback;
  //     
  //   xhr.upload.uuid = uuid;
  //   xhr.upload.filename = file.name;
  //   xhr.upload.addEventListener('loadstart', Asset.onloadstartHandler, false);
  //   xhr.upload.addEventListener('progress', Asset.onprogressHandler);
  //   xhr.upload.addEventListener('load', Asset.onloadHandler, false);
  //   xhr.addEventListener('readystatechange', Asset.onreadystatechangeHandler, false);  
  //     
  //   // xhr.setRequestHeader("X-Query-Params", {'format':'json'});
  //   xhr.open('POST', url, true);
  //   xhr.setRequestHeader("Content-Type", "application/octet-stream");
  //   xhr.setRequestHeader("X-File-Name", file.name);
  //   xhr.setRequestHeader("X-Params", query_params);
  //   xhr.setRequestHeader("X-File-Upload", "true");
  //   xhr.send(file);   
  //   if(callback['before']){ callback['before'].call(this, {uuid: uuid, file_name: file.name}); } 
  // },    
  //   
  // onloadstartHandler: function(evt) {
  //   // var percent = AjaxUploader.processedFiles / AjaxUploader.totalFiles * 100;
  // },
  // 
  // onloadHandler: function(evt) { 
  //   // $('#ajax_uploader').attr('value', '');
  // },
  // 
  // onprogressHandler: function(evt) {
  //   var percent = Math.round(evt.loaded / evt.total * 100); 
  //   if(Asset.callback['progress']){ Asset.callback['progress'].call(this, evt.target.uuid, percent); }  
  // },
  //   
  // onreadystatechangeHandler: function(evt){
  //   var status = null;
  //   try { status = evt.target.status; }
  //   catch(e) { return; }
  //     
  //   // readyState 4 means that the request is finished
  //   if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
  //     var response = JSON.parse(evt.target.responseText);
  //     response.uuid = evt.target.upload.uuid;
  // 
  //     if(Asset.callback['success']){ Asset.callback['success'].call(this, response); }   
  //   }
  // },
  //   
  // generate_uuid: function(){
  //   // http://www.ietf.org/rfc/rfc4122.txt
  //   var s = [];
  //   var hexDigits = "0123456789ABCDEF";
  //   for (var i = 0; i < 32; i++) { s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
  //   s[12] = "4";                                       // bits 12-15 of the time_hi_and_version field to 0010
  //   s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  //   return s.join(''); 
  // }
  
});
