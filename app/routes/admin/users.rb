class Main  
  module Admin 
      
    # Index
    # -------------------------------------------
    get '/users/?' do
      collection = current_user.is_admin? ? User.by_site(current_site).all : [current_user] # 
      collection.to_json  
    end
      
  end  
end