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
      
    end  
  end
end