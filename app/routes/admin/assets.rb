class Main    
  
  module Admin  
    module Assets  
      
      # Redirects if no site is found
      # ------------------------------------------- 
      before do
        unless current_site   
          redirect '/admin/sites' 
        end
      end
      
      # Asset Index
      # -------------------------------------------
      get '/?' do  
        @query = params[:query] ? params[:query].split('.')[0] : ''
        @assets = params[:query] ? Asset.by_site(current_site.id).search_all(@query).all(:order => 'created_at DESC') : Asset.by_site(current_site.id).all(:order => 'created_at DESC') 
        # @assets = params[:query] ? Asset.search_all(@query).all(:order => 'created_at DESC') : Asset.all(:order => 'created_at DESC') 
        
        respond_to do |format|
          format.html { admin_haml :'admin/assets/index' }
          format.json { @assets.to_json }
        end
      end
      
      # Create Asset
      # -------------------------------------------
      post '' do
        asset = Asset.new(:file => params[:file][:tempfile])
        asset.file_name = params[:file][:filename]    
        asset.site = current_site
        asset.save
        respond_to do |format|
          format.html { redirect('/assets') }
          format.json { asset.to_json }
        end
      end
      
      # Show Asset
      # -------------------------------------------
      get '/:id/?' do
        @asset = Asset.find params['id']  
        #  @asset = Asset.by_site(current_site.id).find params['id']  
        respond_to do |format|
          format.html { redirect('/assets') }
          format.json { @asset.to_json }
        end
      end
      
      # Edit Asset
      # -------------------------------------------
      get '/:id/edit/?' do
        # @asset = Asset.by_site(current_site.id).find params['id']   
        @asset = Asset.find params['id']  
        @query = params[:query] ? params[:query].split('.')[0] : ''
        admin_haml :'/admin/assets/edit'
      end
      
      # Update Asset
      # -------------------------------------------
      put '/:id' do
        # asset = Asset.by_site(current_site.id).find params['id']
        asset = Asset.find params['id']
        logger.info "Asset: #{params.inspect}"
        if asset.update_attributes(params['asset'])
          respond_to do |format|
            format.html { redirect('/assets') }
            format.json { asset.to_json }
          end
        end
      end     
      
      # Delete Asset
      # -------------------------------------------
      delete '/:id' do  
        # asset = Asset.by_site(current_site.id).find params['id']   
        asset = Asset.find params['id']             
        if asset.destroy
          respond_to do |format|
            # format.html { redirect('/assets') }
            format.json { {:message => 'success!'}.to_json }
          end
        end
      end
      
    end  
  end 
  
end