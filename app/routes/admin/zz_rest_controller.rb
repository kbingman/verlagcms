class Main  
  
  # Catchall REST actions.
  # Override these by simply adding a route above them
  # -------------------------------------------
  
  module Admin 
    
    helpers do
      def model
        @model ||= params['model']
      end
      
      def klass 
        @klass ||= model.singularize.titlecase.constantize if model 
      end    
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
        respond_to do |format|
          # format.html { redirect("/#{klass}") }
          format.json { resource.to_json }
        end 
      else
        respond_to do |format|
          format.json { { :errors => resource.errors }.to_json }
        end
      end
    end
    
    # Show
    # -------------------------------------------
    get '/:model/:id/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        respond_to do |format|
          # format.html { redirect("/#{klass}") }
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
      enforce_update_permission(resource)
      
      # resource = klass.find params['id']   
      if resource.update_attributes(params[model.singularize.to_sym])
        respond_to do |format|
          # format.html { redirect("/#{klass}") }
          format.json { resource.to_json }
        end 
      else
        respond_to do |format|
          format.json { { :errors => resource.errors }.to_json }
        end
      end
    end     
    
    # Delete 
    # -------------------------------------------
    delete '/:model/:id' do    
      resource = klass.by_site(current_site).find params['id'] 
      # resource = klass.find params['id']          
      if resource && resource.destroy
        respond_to do |format|
          # format.html { redirect("/#{klass}") }
          format.json {}
        end
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end