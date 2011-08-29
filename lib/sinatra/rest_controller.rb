require 'sinatra/base'   

module Sinatra                                   
  module RestController  
    
    module Helpers  
      
      def model
        @model ||= params['model']
      end

      def klass 
        @klass ||= model.singularize.titlecase.constantize if model 
      end
      
    end

    def self.registered(app)  
      app.helpers RestController::Helpers   

      # Catchall REST actions.
      # Override these by simply adding a route above them
      # -------------------------------------------
      

      # Index
      # -------------------------------------------
      app.get '/:model/?' do
        collection = klass.by_site(current_site).all
        collection.to_json  
      end
      
      
      # Create
      # -------------------------------------------
      app.post '/:model' do   
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
      app.get '/:model/:id/?' do
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
      app.put '/:model/:id' do
        resource = klass.by_site(current_site).find params['id']
        # resource = klass.find params['id']   
        test_enforce_update_permission(resource)
      
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
      app.delete '/:model/:id' do    
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

  register RestController 
end