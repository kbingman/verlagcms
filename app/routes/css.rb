class Main   
  module Css 
  
    get '/:stylesheet' do 
      # cache_request(600) # One Hour cache    
      content_type 'text/css', :charset => 'UTF-8'  
      sass :"css/#{params[:stylesheet]}"
    end   
  
  end  
end
