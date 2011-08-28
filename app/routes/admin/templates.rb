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
          respond_to do |format|
            format.html { redirect('/layouts') }
            format.json { template.to_json }
          end 
        else   
          logger.info(template.errors.inspect)  
          respond_to do |format|
            format.json { { :errors => template.errors }.to_json }
          end
        end
      end
      
    end  
  end
end