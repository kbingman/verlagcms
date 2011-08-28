require 'sinatra/base'   

module Sinatra                                   
  module Images  

    def self.registered(app)   
      
      app.get '/images/originals/:id/:filename' do
        # cache_request(3600 * 24) # 24 Hour cache  
        response['Cache-Control'] = "max-age=#{3600 * 24}, public"    

        begin
          asset = Asset.find params[:id]
          file = asset.file.read

          status 200 
          content_type(asset.file_type)
          file
        rescue BSON::InvalidObjectId
          status 404 
          haml :'site/404'
        end
      end
      
      app.get '/images/:size/:id/:filename' do
        # cache_request(3600 * 24) # 24 Hour cache 
        response['Cache-Control'] = "max-age=#{3600 * 24}, public"    
        
        h, w, crop = [nil, nil, {}]
        monk_settings(:images).each do |key, value|  
          if key.to_s == params[:size] 
            h, w, crop = value 
          end      
        end    

        begin
          asset = Asset.find params[:id]
          image = asset.render_image(h.to_i, w.to_i, {:crop => crop})

          status 200 
          content_type(asset.file_type)
          image.to_blob
        rescue BSON::InvalidObjectId
          status 404 
          haml :'site/404'
        end
      end
     
    end
  end    

  register Images 
end