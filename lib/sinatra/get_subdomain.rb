require 'sinatra/base'   

module Sinatra                                   
  module GetSubdomain  
    
    module Helpers  
      
      def subdomain
        request.subdomains.join('.')    
      end   
      
      def current_site 
        if subdomain.blank? 
          @current_site || Site.first
        else
          @current_site || Site.find_by_subdomain(subdomain) 
        end 
      end
      
    end 
      
    def self.registered(app) 
      app.helpers GetSubdomain::Helpers
      
      app.before do  
        
      end
          
    end
  end    

  register GetSubdomain 
end