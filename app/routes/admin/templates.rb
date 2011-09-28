class Main    
  
  module Admin 
    module Templates 
      
      # Create layout
      # -------------------------------------------
      post '' do 
        klass = params[:template][:klass].titlecase.constantize
        logger.debug("Klass: #{klass}")   
        template = klass.new(params[:template]) 
        template.site = current_site
        
        if template.save
          template.to_json
        else   
          logger.info(template.errors.inspect)  
          { :errors => template.errors }.to_json
        end
      end
      
      
      # Update 
      # -------------------------------------------
      put '/:id' do
        resource = Template.by_site(current_site).find params['id']
        # resource = klass.find params['id']   
        enforce_update_permission(resource)

        if resource.update_attributes(params['layout'])
          respond_to do |format|
            format.html { redirect "/admin/#{model}/#{resource.id}/" }
            format.json { resource.to_json }
          end
        else
          { :errors => resource.errors }.to_json 
        end
      end
      
    end  
  end
end