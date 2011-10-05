class Main  
  
  # Catchall REST actions.
  # Override these by simply adding a route above them
  # -------------------------------------------
  
  module Admin 
      
    # Index
    # -------------------------------------------
    get '/:model/?' do
      collection = klass.by_site(current_site).all
      respond_to do |format|
        format.html { admin_haml :'admin/index' }
        format.json { collection.to_json }
      end
    end
    
    # Create
    # -------------------------------------------
    post '/:model' do   
      resource = klass.new(params[model.singularize.to_sym]) 
      if resource.save
        resource.to_json
        respond_to do |format|
          format.html { redirect "/admin/#{model}" }
          format.json { resource.to_json }
        end
      else
        { :errors => resource.errors }.to_json 
      end
    end
    
    # Show
    # -------------------------------------------
    get '/:model/:id/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        respond_to do |format|
          format.html { admin_haml :'admin/index' }
          format.json { resource.to_json }
        end
      else
        raise Sinatra::NotFound
      end
    end
    
    # Edit
    # -------------------------------------------
    get '/:model/:id/edit/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        respond_to do |format|
          format.html { admin_haml :'admin/index' }
          format.json { resource.to_json }
        end
      else
        raise Sinatra::NotFound
      end
    end
    
    # Update 
    # -------------------------------------------
    put '/:model/:id' do
      resource = klass.by_site(current_site).find params['id']
      # resource = klass.find params['id']   
      enforce_update_permission(resource)
      
      if resource.update_attributes(params[model.singularize.to_sym])
        respond_to do |format|
          format.html { redirect "/admin/#{model}/#{resource.id}/" }
          format.json { resource.to_json }
        end
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