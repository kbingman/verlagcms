class Main  
  
  # Catchall REST actions.
  # Override these by simply adding a matching route above them
  # -------------------------------------------
  
  namespace '/api/v1' do
    
    helpers do
      def model
        @model ||= params['model']
      end
      
      def klass 
        begin
          @klass ||= model.singularize.camelize.constantize if model 
        rescue
          nil
        end
      end
    end
      
    # Index
    # -------------------------------------------
    get '/:model/?' do
      collection = klass.by_site(current_site).all
      collection.to_json 
    end  
    
    # Index
    # -------------------------------------------
    get '/:model/new/?' do
      resource = klass.new(params[model.singularize.to_sym]) 
      resource.to_json
    end
    
    # Create
    # -------------------------------------------
    post '/:model' do   
      attributes = JSON.parse(request.body.read.to_s)
      resource = klass.new(attributes)
      
      # TODO may break some things 
      resource.site = current_site
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
    
    # Edit
    # -------------------------------------------
    get '/:model/:id/edit/?' do
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
      attributes = JSON.parse(request.body.read.to_s)
      puts attributes
      resource = klass.by_site(current_site).find params['id']
      
      if resource.update_attributes(attributes)
        resource.to_json
      else
        status 400
        content_type 'application/json'
        { errors: resource.errors }.to_json 
      end
    end     
    
    # Delete 
    # -------------------------------------------
    delete '/:model/:id' do    
      resource = klass.by_site(current_site).find params['id'] 

      if resource && resource.destroy
        {}
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end