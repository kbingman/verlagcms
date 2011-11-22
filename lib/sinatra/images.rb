require 'sinatra/base'   

module Sinatra                                   
  module Images  

    def self.registered(app)  
      
      app.get '/templates/files/:id/:filename.?:ext?' do

        cache_request(3600 * 24 * 30) # 30 day cache 
        # response['Cache-Control'] = "max-age=#{3600 * 24}, public"    
        begin
          file = Upload.find params[:id]

          status 200 
          content_type(file.file_type)
          file.file.read
        rescue BSON::InvalidObjectId
          status 404 
          haml :'site/404'
        end
      end
      
      app.get '/images/:id/:filename' do
        # cache_request(3600 * 24) # 24 Hour cache
        cache_control :public, :max_age => 3600 * 24
        etag Digest::MD5.hexdigest(params.to_s)
        
        h = params['h']
        w =  params['w']
        crop = params['c'] == 't' ? true : false
        gravity = params['g'] || 'Center' 

        begin
          asset = Asset.find params[:id]
          status 200 
          content_type(asset.file_type)
          
          if params['h'] || params['w']
            image = asset.render_image(w.to_i, h.to_i, {:crop => crop, :gravity => gravity})
            image.to_blob
          else
            asset.file.read
          end
          
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
          image = asset.render_image(w.to_i, h.to_i, {:crop => crop})

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