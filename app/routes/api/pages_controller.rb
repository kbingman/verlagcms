class Main  
  
  # Catchall REST actions.
  # Override these by simply adding a route above them
  # -------------------------------------------
  
  module Api 
    
    helpers do
  
    end
      
    # Index
    # -------------------------------------------
    get '/pages/?' do
      per_page = params['limit'] || nil
      collection = klass.by_site(current_site).paginate(:order => 'created_at DESC', :per_page => per_page, :page => params[:page])
      collection.to_json  
    end
    
    # Show
    # -------------------------------------------
    get '/pages/:id/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        resource.to_json
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end