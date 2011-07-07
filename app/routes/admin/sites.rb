class Main    
  
  module Admin 
    module Sites
      
      # site Index
      # -------------------------------------------
      get '/?' do
        @sites = Site.all
        respond_to do |format|
          format.html do  
            admin_haml :'admin/sites/index'
          end 
          format.json do 
            @sites.to_json  
          end
        end
      end
      
      # Create site
      # -------------------------------------------
      post '' do    
        site = Site.new(params[:site]) 
   
        if site.save
          respond_to do |format|
            format.html { redirect('/sites') }
            format.json { site.to_json }
          end 
        end
      end
      
      # Show site
      # -------------------------------------------
      get '/:id/?' do
        @site = Site.find params['id']
        respond_to do |format|
          format.html { redirect('/sites') }
          format.json { @site.to_json }
        end
      end
      
      # Edit site
      # -------------------------------------------
      get '/:id/edit/?' do
        @site = Site.find params['id']                             
        admin_haml :'/admin/sites/edit'
      end
      
      # Update site
      # -------------------------------------------
      put '/:id' do
        site = Site.find params['id']  
        parts = params['site']['parts']
                
        if site.update_attributes(params['site'])
          respond_to do |format|
            format.html { redirect('/sites') }
            format.json { site.to_json }
          end 
        else
          # error handling
        end
      end     
      
      # Delete site
      # -------------------------------------------
      delete '/:id' do
        site = Site.find params['id']             
        if site.destroy
          respond_to do |format|
            format.html { redirect('/sites') }
            format.json {}
          end
        end
      end
      
    end  
  end
end