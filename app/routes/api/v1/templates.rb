class Main    
  
  namespace '/api/v1' do    
    namespace '/templates' do
      
      # Create layout
      # -------------------------------------------
      post '' do 
        attributes = JSON.parse(request.body.read.to_s)
        
        klass = attributes['klass'].titlecase.constantize

        template = klass.new(attributes) 
        template.site = current_site
        
        if template.save
          template.to_json
        else   
          puts template.errors.inspect
          { :errors => template.errors }.to_json
        end
      end
      
      
      # Update 
      # -------------------------------------------
      # put '/:id' do
      #   resource = Template.by_site(current_site).find params['id']
      #   # resource = klass.find params['id']   
      #   # enforce_update_permission(resource)
      #   
      #   attributes = JSON.parse(request.body.read.to_s)
      # 
      #   if resource.update_attributes(attributes)
      #     respond_to do |format|
      #       format.html { redirect "/admin/#{model}/#{resource.id}/" }
      #       format.json { resource.to_json }
      #     end
      #   else
      #     { :errors => resource.errors }.to_json 
      #   end
      # end
      
    end  
  end
end