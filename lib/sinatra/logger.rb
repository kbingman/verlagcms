require 'sinatra/base'   

module Sinatra                                   
  module Logger      
      
    def self.registered(app)  

      # Logging info
      app.before do
        @start = Time.now
        logger.info "Starting: #{request.request_method} #{request.path} #{response.status}"
        logger.info "Parameters: #{params.inspect}" 
        logger.info "Content Type:  #{request.content_type}"
        logger.info "Format: #{format}" if format 
      end

      app.after do    
        unless @start.nil?      
          logger.info "Completed in: #{Time.now - @start}s" 
          logger.info "#{1 / (Time.now - @start)} Requests per second" 
        end 
        logger.info ""
      end
    
    end
  end    

  register Logger 
end