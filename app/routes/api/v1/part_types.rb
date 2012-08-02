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
      
      delete '/:template_id/parts/:id' do
        template = Template.find(params[:template_id])
        template.part_types.delete_if{ |p| p._id.to_s == params[:id] }  
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