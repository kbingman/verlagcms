require 'sinatra/base'   

module Sinatra                                   
  module GetSubdomain  
    
    module Helpers  
      
      def subdomain
        request.subdomains.join('.')    
      end 
    
      # def domain_name
      #   request.env['HTTP_HOST']
      # end
      # 
      # def current_site 
      #   @current_site ||= Site.where('$or' => [{ :domain_name => domain_name }, { :subdomain => subdomain }]).first
      #   if @current_site.nil?
      #     @current_site ||= Site.first
      #   else
      #     @current_site
      #   end 
      # end
      
      def current_site 
        if subdomain.blank? 
          @current_site ||= Site.first
        else
          @current_site ||= Site.find_by_subdomain(subdomain) 
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