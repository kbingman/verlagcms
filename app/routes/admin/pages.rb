class Main    
  
  module Admin 
    module Pages 
      
      # page Index
      # -------------------------------------------
      get '/?' do
        # @pages = params[:query] ? Page.search_all(@query).all(:order => 'created_at DESC') : Page.all(:order => 'created_at DESC') 
        
        respond_to do |format|
          format.html do  
            @root = current_site.root
            admin_haml :'admin/pages/index'
          end 
          format.json do  
            active_page_ids = request.cookies['active_page_ids'] ? request.cookies['active_page_ids'].split(',') : nil
            pages = current_site.active_pages(active_page_ids).sort_by{ |p| p.created_at }
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
      
      # Show page children
      # -------------------------------------------
      get '/:id/children' do
        @page = Page.by_site(current_site).find(params['id'])
        respond_to do |format|
          format.html { redirect('/pages') }
          format.json { @page.children.to_json }
        end
      end
      
      # Update page
      # -------------------------------------------
      put '/:id' do
        page = Page.by_site(current_site).find(params['id']) 
        # enforce_update_permission(page) 
        
        # This is a bit of a hack needed to get the parts to save when sent by jQuery / js-model
        if params['page']['parts'] && !params['page']['parts'].kind_of?(Array)
          parts = []
          params['page']['parts'].each{|k,v| parts << v if v }
          params['page']['parts'] = parts
        end
                
        if page.update_attributes(params['page'])
          respond_to do |format|
            format.html { redirect("/admin/#/pages/#{page.id}/edit") }
            format.json { page.to_json }
          end 
        else
          logger.debug "Page errors: #{page.errors}"
          respond_to do |format|
            # format.html { redirect("/admin/#/pages/#{page.id}/edit") }
            format.json do
              { :errors => page.errors }.to_json  
            end
          end
        end
      end     
      
    end  
  end
end