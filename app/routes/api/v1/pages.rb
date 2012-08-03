class Main    
  
  namespace '/api/v1' do
    namespace '/pages' do
      
      # Page Index
      # -------------------------------------------
      get '/?' do
       # pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
        
        # active_page_ids = request.cookies['active_page_ids'] ? request.cookies['active_page_ids'].split(',') : nil
        # pages = current_site.active_pages(active_page_ids).sort_by{ |p| p.created_at }
        pages = current_site.pages
        pages.to_json
        
        # render :rabl, :'api/v1/pages/index', format: 'json'
      end
      
      # Create page
      # -------------------------------------------
      post '' do 
        attributes = JSON.parse(request.body.read.to_s)  
        
        page = Page.new(attributes) 
        page.site = current_site
        
        if page.save
          page.to_json
        else
          puts page.errors.inspect
          status 400
          content_type 'application/json'
          { errors: page.errors }.to_json
        end
      end
      
      # Show page children
      # -------------------------------------------
      get '/:id/children' do
        page = Page.by_site(current_site).find(params['id'])
        page.children.to_json
      end   
      
    end  
  end
end