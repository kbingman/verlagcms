class Main    
  
  module Admin 
    module Pages 
      
      # Redirects if no site is found
      # ------------------------------------------- 
      before do
        unless current_site   
          redirect '/admin/sites' 
        end
      end
      
      # page Index
      # -------------------------------------------
      get '/?' do
        # @pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
  
        respond_to do |format|
          format.html do  
            @root = Page.by_site(current_site.id).all_roots.first 
            admin_haml :'admin/pages/index'
          end 
          format.json do 
            pages = Page.by_site(current_site.id).all
            pages.to_json  
          end
        end
      end
      
      # Create page
      # -------------------------------------------
      post '' do    
        page = Page.new(params[:page]) 
        page.site = current_site
        
        if page.save
          respond_to do |format|
            format.html { redirect('/pages') }
            format.json { page.to_json }
          end 
        else
          logger.info(page.errors.inspect)
        end
      end
      
      # Show page
      # -------------------------------------------
      get '/:id/?' do
        @page = Page.by_site(current_site.id).find(params['id'])
        respond_to do |format|
          format.html { redirect('/pages') }
          format.json { @page.to_json }
        end
      end
      
      # Edit page
      # -------------------------------------------
      get '/:id/edit/?' do
        @page = Page.by_site(current_site.id).find(params['id'])                             
        admin_haml :'/admin/pages/edit'
      end
      
      # Update page
      # -------------------------------------------
      put '/:id' do
        page = Page.by_site(current_site.id).find(params['id'])  
        parts = params['page']['parts']
                
        if page.update_attributes(params['page'])
          respond_to do |format|
            format.html { redirect('/pages') }
            format.json { page.to_json }
          end 
        else
          # error handling
        end
      end     
      
      # Delete page
      # -------------------------------------------
      delete '/:id' do
        page = Page.by_site(current_site.id).find(params['id'])             
        if page.destroy
          respond_to do |format|
            format.html { redirect('/pages') }
            format.json {}
          end
        end
      end
      
    end  
  end
end