class Main   
  
  module Admin 
    module Templates

      # Create Page Part 
      # -------------------------------------------
      post '/:id/parts' do
        template = Template.find(params[:id])
        part = PartType.new(params[:part]) 
        
        template.part_types << part
        
        # Mongomapper seems to need to save the parent for this to work...   
        # Seems to be an identity map issue
        if template.save 
          respond_to do |format| 
            format.html { }
            format.json { template.to_json }
          end
        else
          'error'
        end
      end  
      
    end
  end
  
end