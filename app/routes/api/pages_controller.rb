class Main  
  
  # Public API for Pages
  # -------------------------------------------
  
  namespace '/api' do
    
    helpers do
      before do
        content_type 'application/json'
      end
    end
      
    # Page Index
    # -------------------------------------------
    get '/pages/?' do
      per_page = params['limit'] || nil
      collection = Page.by_site(current_site).paginate(:order => 'created_at DESC', :per_page => per_page, :page => params[:page])
      collection.to_json  
    end
    
    # Show page
    # -------------------------------------------
    get '/pages/:id/?' do
      resource = Page.by_site(current_site).find params['id']
      if resource
        resource.to_json
      else
        raise Sinatra::NotFound
      end
    end
    
    # Show page children
    # -------------------------------------------
    get '/pages/:id/children' do
      @page = Page.by_site(current_site).find(params['id'])
      respond_to do |format|
        # format.html { redirect('/pages') }
        format.json { @page.children.to_json }
      end
    end
      
  end  
end