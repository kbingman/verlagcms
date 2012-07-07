class Main    
  
  namespace '/admin' do
    namespace '/pages' do
      
      # Page Index
      # -------------------------------------------
      get '/?' do
       # pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
        
        # active_page_ids = request.cookies['active_page_ids'] ? request.cookies['active_page_ids'].split(',') : nil
        # pages = current_site.active_pages(active_page_ids).sort_by{ |p| p.created_at }
        pages = current_site.pages
        
        respond_to do |format|
          format.html do  
            # @root = current_site.root
            # admin_haml :'admin/pages/index'
            admin_haml :'admin/index'
          end 
          format.json do  
            pages.to_json
          end
        end
      end
      
      # Create page
      # -------------------------------------------
      post '' do 
        attributes = JSON.parse(request.body.read.to_s)  
        
        page = Page.new(attributes) 
        page.site = current_site
        
        if page.save
          page.to_json
          # respond_to do |format|
          #   format.html { redirect('/admin/pages') }
          #   format.json { page.to_json }
          # end 
        else
          puts page.errors.inspect
          { :errors => page.errors }
        end
      end
      
      # Show page children
      # -------------------------------------------
      get '/:id/children' do
        @page = Page.by_site(current_site).find(params['id'])
        respond_to do |format|
          # format.html { redirect('/pages') }
          format.json { @page.children.to_json }
        end
      end
      
      # Update page
      # -------------------------------------------
      put '/:id' do
        page = Page.by_site(current_site).find(params['id']) 
        attributes = JSON.parse(request.body.read.to_s)

        # enforce_update_permission(page) 
        
        # HACK!! TODO FIX THIS!
        attributes['parts'] = attributes['contents']
                
        if page.update_attributes(attributes)
          respond_to do |format|
            format.html { redirect("/admin/pages/#{page.id}/edit") }
            format.json { page.to_json }
          end 
        else
          respond_to do |format|
            format.html { redirect("/admin/pages/#{page.id}/edit") }
            format.json do
              { :errors => page.errors }.to_json  
            end
          end
        end
      end     
      
    end  
  end
end