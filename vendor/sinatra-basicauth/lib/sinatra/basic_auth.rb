require 'sinatra/base'   

module Sinatra      
                          
  module BasicAuth   
    module Helpers  
      
      # The main accessor for the warden proxy instance
      def warden
        request.env['warden']
      end

      # Proxy to the authenticated? method on warden
      def authenticated?
        warden.user ? true : false
      end
      alias_method :logged_in?, :authenticated?

      # Access the currently logged in user
      def current_user(*args)
        warden.user(*args)
      end

      def authenticate!(failure_path=nil)
        session[:return_to] = request.fullpath
        redirect(failure_path ? failure_path : "/login") unless authenticated?
      end
      alias_method :login_required, :authenticate!
      
    end 
      
    def self.registered(app) 
      app.helpers BasicAuth::Helpers  
      
      app.set :username, 'frank' 
      app.set :password, 'changeme'  
      
      app.get '/login' do 
        admin_haml :'site/login'
      end 
      
      app.get '/logout' do 
        session['warden.user.default.key'] = nil
        redirect '/login'  
      end   
      
      app.post '/login' do 
        warden.custom_failure!       
        puts params.inspect
        warden.authenticate(:fibble)
        puts current_user
        
        if warden.authenticated?
          redirect '/admin/'
        else
          admin_haml :'site/login'
        end
      end 
    
    end
  end  
  
  # HACK: blows up on test environment
  unless RACK_ENV == 'test' 
    Warden::Strategies.add(:fibble) do
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
      
      def valid?
        params['username'] && params['password'] && current_site
      end
    
      def authenticate!
        # Not sure I want to use the current site to authenticate, or rather
        # use permissions higher in the stack
        user = User.authenticate(current_site, params['username'], params['password'])
        user ? success!(user) : fail!("Could not log in") 
      end
    end
  end

  Warden::Manager.serialize_into_session do |user|
    user.id
  end

  Warden::Manager.serialize_from_session do |id|
    User.find id
  end
   

  register BasicAuth 
end