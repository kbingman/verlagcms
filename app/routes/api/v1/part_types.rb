class Main   
  
  namespace '/api/v1' do
    namespace '/templates' do

      # Create Page Type 
      # -------------------------------------------
      post '/:id/parts' do
        attributes = JSON.parse(request.body.read.to_s)  
        template = Template.find(params[:id])
        part = PartType.new(attributes) 
        
        template.part_types << part
        
        # Mongomapper seems to need to save the parent for this to work...   
        # Seems to be an identity map issue
        if template.save 
          template.to_json 
        else
          { :errors => part.errors }.to_json  
        end
      end  
      
    end
  end
  
end