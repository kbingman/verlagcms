class Main  
  
  # Public API for Assets
  # -------------------------------------------
  
  namespace '/api/public' do
      
    # Assets Index
    # -------------------------------------------
    get '/layouts/?' do  
      templates = Layout.by_site(current_site).all
      templates.to_json 
    end
    
    # Show Asset
    # -------------------------------------------
    get '/layouts/:id/?' do
      template = Layout.by_site(current_site).find params['id']
      if resource
        resource.to_json
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end
