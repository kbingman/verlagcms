require 'sinatra/base'   

module Sinatra                                   
  module RespondTo  
    class UnhandledFormat < Sinatra::NotFound; end   
    
    module Helpers  
      
      # Provides rails style respond_to blocks for js and json, etc
      attr_accessor :format
    
      def respond_to(&block)
        wants = {}
        def wants.method_missing(type, *args, &handler)
          self[type] = handler
        end
        block.call(wants)
        raise UnhandledFormat if wants[format].nil?
    
        handler = wants[format]
        handler.call
      end 
      
    end 
      
    def self.registered(app) 
      app.helpers RespondTo::Helpers  

      # Pulls out the format before each request
      # but removes the param, so that the routes 
      # can be written as '/assets' instead of '/assets.:format'     
      # if no format is sent, uses the Headers 'Content-Type'
      # if neither of these are sent, then defaults to app.default_content_type
      app.before do  
        ext = Pathname(request.path_info).extname 
        request.path_info = request.path_info.sub!(/#{ext}$/,'')    
        
        content_type = request.content_type ? request.content_type.split(';').first.sub!(/^application\//,'') : nil   
        
        ext = ext.empty? ? content_type : ext.sub(/^./,'')   
        
        # HACK until I figure out what is sending this...      
        ext = ext == 'x-www-form-urlencoded' ? 'html' : ext 
        
        self.format = (ext || options.default_content_type).to_sym
        content_type format 
      end
          
    end
  end    

  register RespondTo 
end