class Main   
  
  namespace '/api/v1' do
    namespace '/templates' do

      # Create Part Type 
      # -------------------------------------------
      post '/:id/parts' do
        attributes = JSON.parse(request.body.read.to_s)  
        template = Template.find(params[:id])
        part = PartType.new(attributes) 
         
        template.part_types << part
        
        if template.save 
          template.to_json 
        else
          status 400
          content_type 'application/json'
          { :errors => part.errors }.to_json  
        end
      end  
      
    end
  end
  
end