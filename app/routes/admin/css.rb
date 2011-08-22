class Main 
  module Admin 
  
    get '/css/:stylesheet' do 
      cache_request(3600) # One Hour cache    
      content_type 'text/css', :charset => 'UTF-8'  
      sass :"admin/css/#{params[:stylesheet]}"
    end   
  
  end
end
