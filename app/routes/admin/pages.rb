class Main  
  module Pages
    
    # page Index
    # -------------------------------------------
    get '/?' do
      # @pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
      @root = Page.all_roots.first 
      
      respond_to do |format|
        format.html { admin_haml :'admin/pages/index' }
        format.json { @root.to_json }
      end
    end
    
    # Create page
    # -------------------------------------------
    post '' do
      page = Page.new(:file => params[:page])
      page.save
      respond_to do |format|
        format.html { redirect('/pages') }
        format.json { page.to_json }
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
        
      parts.each do |attr|
        part = page.page_parts.find attr['id'] 
        part.update_attributes(attr)
      end          
      if page.update_attributes(params['page'])
        respond_to do |format|
          format.html { redirect('/pages') }
          format.json { page.to_json }
        end
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