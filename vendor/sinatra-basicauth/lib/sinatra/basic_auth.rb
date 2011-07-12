require 'sinatra/base'   

module Sinatra      
                          
  module BasicAuth   
     
    
    module Helpers  
      
      def authorized?
        session[:authorized] 
      end     
      
      def authorize! 
        redirect '/login' unless authorized?
      end     
      
      def logout! 
        session[:authorized] = false
      end 
      
    end 
      
    def self.registered(app) 
      app.helpers BasicAuth::Helpers  
      
      app.set :username, 'frank' 
      app.set :password, 'changeme'  
      
      app.get '/login' do 
        admin_haml :'site/login'
      end 
      
      app.get '/logout' do 
        logout!  
        redirect '/login'  
      end   
      
      app.post '/login' do 
        if params[:username] == options.username && params[:password] == options.password
          session[:authorized] = true
          redirect '/admin/' 
        else
          session[:authorized] = false
          redirect '/login' 
        end
      end 
    
    end
  end    

  register BasicAuth 
end