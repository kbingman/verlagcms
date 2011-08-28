class Main    
  
  module Admin 
    module Sites
      
      # site Index
      # -------------------------------------------
      get '/?' do
        collection = current_user.is_super_user? ? Site.all : current_user.sites
        collection.to_json
      end
      
    end  
  end
end