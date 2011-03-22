# Controls the actual images. 
# Resizes the images from the GridFS image, then caches it using either varnish or Rack-Cache. 

class Main  
  
  get '/images/:size/:id/:filename' do
    cache_request(3600) # One Hour cache
    
    options = {}
    h, w, options = case params[:size]
      when 'display' then [640, 480, {}]
      when 'thumbnails' then [120, 120, {}]
      when 'icons' then [72, 72, {:crop => true}]
    else
      [nil, nil, {}]
    end  

    begin
      asset = Asset.find params[:id]
      image = asset.render_image(h, w, options)
      
      status 200 
      content_type(asset.file_type)
      image.to_blob
    rescue BSON::InvalidObjectId
      status 404 
      haml :'site/404'
    end
  end
  
end