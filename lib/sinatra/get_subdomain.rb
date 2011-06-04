require 'sinatra/base'   

module Sinatra                                   
  module GetSubdomain  
    
    module Helpers  
      
      def subdomain
        request.subdomains.join('.')    
      end   
      
      def current_site  
       @current_site || Site.find_by_subdomain(subdomain)
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