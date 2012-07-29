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
          status 400
          content_type 'application/json'
          { :errors => template.errors }.to_json
        end
      end
      
    end  
  end
end