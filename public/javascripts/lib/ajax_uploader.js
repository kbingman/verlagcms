AjaxUploader = {
  initialize: function(element){
    var fileInput = $(element);
    if(!fileInput.length){ return }
    
    fileInput.attr('multiple','multiple').change(function() {
      var files = this.files;
      var url = fileInput.parents('form:first').attr('action') + '.json';
      
      AjaxUploader.totalFiles = files.length;
      AjaxUploader.processedFiles = 0;
      
      for(var i = 0; i < AjaxUploader.totalFiles; i++) {
        var file = files[i];
        AjaxUploader.sendRequest(url, file);
      }
    });
  },
  
  sendRequest: function (url, file) {
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('loadstart', AjaxUploader.onloadstartHandler, false);
    xhr.upload.addEventListener('progress', AjaxUploader.onprogressHandler, false);
    xhr.upload.addEventListener('load', AjaxUploader.onloadHandler, false);
    xhr.addEventListener('readystatechange', AjaxUploader.onreadystatechangeHandler, false);
    // xhr.setRequestHeader("X-Query-Params", {'format':'json'});
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-File-Name", file.name);
    xhr.send(file);
  }, 
  
  onloadstartHandler:function (evt) {
    // $('#upload-status').html('Upload started!');
    var percent = AjaxUploader.processedFiles / AjaxUploader.totalFiles * 100;
  },
  
  onloadHandler: function (evt) {
    // $('#upload-status').html('Upload successful!');
    $('#ajax_uploader').attr('value', '');
  },
  
  onprogressHandler: function (evt) {
    var percent = evt.loaded / evt.total * 100;
    $('#upload_progress .bar').width(percent + '%');
  },
  
  onreadystatechangeHandler: function (evt, i) {
    var status = null;

    // readyState 4 means that the request is finished
    // console.log(evt.target.readyState)
    try {
      status = evt.target.status;
    }
    catch(e) {
      return;
    }
  
    if (status == '200' && evt.target.readyState == 4 && evt.target.responseText) {
      var response = JSON.parse(evt.target.responseText),
        results = response;
        
      // TODO This needs to move to the model
      var asset = new Asset({ id: results.id });
      asset.merge(results);
      Asset.add(asset);     
               
      // var assetIndex = new AssetIndexView(Asset.toMustache());
      // assetIndex.render();
        
      AjaxUploader.processedFiles = AjaxUploader.processedFiles + 1;
      var percent = AjaxUploader.processedFiles / AjaxUploader.totalFiles * 100;
      $('#total_progress .bar').width(percent + '%');
    }
  }
  
}


