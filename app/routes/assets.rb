class Main    
  
  module Assets  
    
    # Asset Index
    # -------------------------------------------
    get '' do  
      @query = params[:query] ? params[:query].split('.')[0] : ''
      # @assets = params[:query] ? Asset.by_site(current_site.id).search_all(@query).all(:order => 'created_at DESC') : Asset.by_site(current_site.id).all(:order => 'created_at DESC') 
      @assets = params[:query] ? Asset.search_all(@query).all(:order => 'created_at DESC') : Asset.all(:order => 'created_at DESC') 
      
      respond_to do |format|
        # format.html { admin_haml :'admin/assets/index' }  
        format.html { haml :'assets/index' } 
        format.js   { partial :'assets/index' }
        format.json { @assets.to_json }
      end
    end
    
    # Create Asset
    # -------------------------------------------
    post '' do
      @asset = Asset.new(:file => params[:file][:tempfile])
      @asset.file_name = params[:file][:filename]    
      @asset.site = current_site
      @asset.save
      respond_to do |format|
        format.html { redirect('/') } 
        format.js   { partial :'assets/show' }
        format.json { @asset.to_json }
      end
    end
    
    # Show Asset
    # -------------------------------------------
    get '/:id/?' do
      # @asset = Asset.by_site(current_site.id).find params['id']
      @asset = Asset.find params['id']
      respond_to do |format|
        format.html { haml :'assets/show' } 
        format.js   { partial :'assets/show' }
        format.json { @asset.to_json }
      end
    end 
    
    # Update Asset
    # -------------------------------------------
    put '/:id' do
      # asset = Asset.by_site(current_site.id).find params['id']
      @asset = Asset.find params['id']  
      if @asset.update_attributes(params['asset'])
        respond_to do |format|
          format.html { redirect('/') } 
          format.js   { partial :'assets/show' }
          format.json { @asset.to_json }
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
          format.html { redirect('/') }   
          format.json {}
        end
      end
    end
      
  end
end