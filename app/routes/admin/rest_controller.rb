class Main  
  
  # Catchall REST actions.
  # Override these by simply adding a route above them
  # -------------------------------------------
  
  module Admin 
    
    helpers do
  
    end
      
    # Index
    # -------------------------------------------
    get '/:model/?' do
      collection = klass.by_site(current_site).all
      collection.to_json  
    end
    
    # Create
    # -------------------------------------------
    post '/:model' do   
      resource = klass.new(params[model.singularize.to_sym]) 
      if resource.save
        resource.to_json
      else
        { :errors => resource.errors }.to_json 
      end
    end
    
    # Show
    # -------------------------------------------
    get '/:model/:id/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        resource.to_json
      else
        raise Sinatra::NotFound
      end
    end
    
    # Update 
    # -------------------------------------------
    put '/:model/:id' do
      resource = klass.by_site(current_site).find params['id']
      # resource = klass.find params['id']   
      test_enforce_update_permission(resource)
      
      if resource.update_attributes(params[model.singularize.to_sym])
        resource.to_json
      else
        { :errors => resource.errors }.to_json 
      end
    end     
    
    # Delete 
    # -------------------------------------------
    delete '/:model/:id' do    
      resource = klass.by_site(current_site).find params['id'] 
      # resource = klass.find params['id']     
           
      if resource && resource.destroy
        {}
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end