class Main  
  module Admin   
    
    # Redirects if no site is found
    # ------------------------------------------- 
    # before do
    #   unless current_site   
    #     redirect '/admin/sites' 
    #   end
    # end  
    
    get '/?' do
      admin_haml :'admin/index'  
    end    
  
  end   
  
end