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
        end
      end
      
      # Show layout
      # -------------------------------------------
      get '/:id/?' do
        @layout = Layout.by_site(current_site.id).find(params['id'])
        respond_to do |format|
          format.html { redirect('/layouts') }
          format.json { @layout.to_json }
        end
      end
      
      # Edit layout
      # -------------------------------------------
      get '/:id/edit/?' do
        @layout = Layout.by_site(current_site.id).find(params['id'])                             
        admin_haml :'/admin/layouts/edit'
      end
      
      # Update layout
      # -------------------------------------------
      put '/:id' do
        template = Template.by_site(current_site.id).find(params['id'])  
        parts = params['layout']['parts']
                
        if template.update_attributes(params['layout'])
          respond_to do |format|
            format.html { redirect('/layouts') }
            format.json { template.to_json }
          end 
        else
          # error handling
        end
      end     
      
      # Delete layout
      # -------------------------------------------
      delete '/:id' do
        layout = Layout.by_site(current_site.id).find(params['id'])             
        if layout.destroy
          respond_to do |format|
            format.html { redirect('/layouts') }
            format.json {}
          end
        end
      end
      
    end  
  end
end