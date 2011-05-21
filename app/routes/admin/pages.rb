class Main    
  
  module Admin 
    module Pages
      
      # page Index
      # -------------------------------------------
      get '/?' do
        # @pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
  
        respond_to do |format|
          format.html do  
            @root = Page.all_roots.first 
            admin_haml :'admin/pages/index'
          end 
          format.json do 
            pages = Page.all
            pages.to_json  
          end
        end
      end
      
      # Create page
      # -------------------------------------------
      post '' do    
        page = Page.new(params[:page]) 
   
        if page.save
          respond_to do |format|
            format.html { redirect('/pages') }
            format.json { page.to_json }
          end 
        end
      end
      
      # Show page
      # -------------------------------------------
      get '/:id/?' do
        @page = Page.find params['id']
        respond_to do |format|
          format.html { redirect('/pages') }
          format.json { @page.to_json }
        end
      end
      
      # Edit page
      # -------------------------------------------
      get '/:id/edit/?' do
        @page = Page.find params['id']                             
        admin_haml :'/admin/pages/edit'
      end
      
      # Update page
      # -------------------------------------------
      put '/:id' do
        page = Page.find params['id']  
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
        page = Page.find params['id']             
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