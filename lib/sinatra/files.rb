require 'sinatra/base'   

module Sinatra                                   
  module Files  

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
    end
    
  end    

  register Files 
end