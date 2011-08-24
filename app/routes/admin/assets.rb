class Main    
  
  module Admin  
    module Assets  
      
      # Asset Index
      # -------------------------------------------
      get '/?' do  
        @query = params[:query] ? params[:query].split('.')[0] : ''
        per_page = params[:limit] ? params[:limit] : Asset.per_page
        plucky_query = if params[:query]
          Asset.by_site(current_site).search_all(@query)
        else
          Asset.by_site(current_site)
        end
        @assets = plucky_query.paginate(:order => 'created_at DESC', :per_page => per_page, :page => params[:page])
        
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

    end  
  end 
  
end