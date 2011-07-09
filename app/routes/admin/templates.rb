class Main    
  
  module Admin 
    module Templates 
      
      # layout Index
      # -------------------------------------------
      get '/?' do
        @templates = current_site.templates  
        
        respond_to do |format|
          format.html do  
            admin_haml :'admin/layouts/index'
          end 
          format.json do  
            @templates.to_json  
          end
        end
      end
      
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
      
      # Show layout
      # -------------------------------------------
      get '/:id/?' do
        @template = Template.by_site(current_site.id).find(params['id'])
        respond_to do |format|
          format.html { redirect('/layouts') }
          format.json { @template.to_json }
        end
      end
      
      # Edit layout
      # -------------------------------------------
      get '/:id/edit/?' do
        @template = Template.by_site(current_site.id).find(params['id'])                             
        admin_haml :'/admin/layouts/edit'
      end
      
      # Update layout
      # -------------------------------------------
      put '/:id' do
        template = Template.by_site(current_site.id).find(params['id'])  
        parts = params['template']['parts'] if params['template']
                
        if template.update_attributes(params['template'])
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
      
      # Delete layout
      # -------------------------------------------
      delete '/:id' do
        template = Template.by_site(current_site.id).find(params['id'])             
        if template.destroy
          respond_to do |format|
            format.html { redirect('/layouts') }
            format.json {}
          end
        end
      end
      
    end  
  end
end