require 'sinatra/base'   

module Sinatra                                   
  module Logger      
      
    def self.registered(app)  

      # Logging info
      app.before do
        @start = Time.now
        logger.info "Starting: #{request.request_method} #{request.path} #{response.status}"
        puts "Parameters: #{params.inspect}" 
        logger.debug "Content Type:  #{request.content_type}"   
        logger.debug "Subdomain:  #{subdomain}"
        # logger.debug "Format: #{format}" if format 
      end

      app.after do    
        unless @start.nil?      
          logger.info "Completed in: #{Time.now - @start}s" 
          logger.info "#{1 / (Time.now - @start)} Requests per second" 
        end 
        logger.debug ""
      end
    
    end
  end    

  register Logger 
end