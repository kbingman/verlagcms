class Main    
  
  namespace '/api/v1' do 
    namespace '/assets' do
      
      # Asset Index
      # -------------------------------------------
      get '/?' do  
        @query = params[:query] ? params[:query].split('.')[0] : ''
        options = { order: 'created_at DESC' }
        # options[:per_page] = params[:limit] ? params[:limit] : Asset.per_page
        
        plucky_query = case
          when params[:query] then
            Asset.by_site(current_site).search_all_with_title(@query)
          when params[:folder_id]
            Asset.where(folder_id: params[:folder_id])
          else
            Asset.by_site(current_site)
          end
        
        assets = plucky_query.all(options) # paginate(options)
        assets.to_json 
      end
      
      # Create Asset
      # -------------------------------------------
      post '' do
        puts params
        
        asset = Asset.new()
        asset.file = params['file'][:tempfile]
        asset.file_name = params['file'][:filename]
        asset.folder_id = params['folder_id']
        asset.site = current_site

        if asset.save
          asset.to_json 
        else
          status 400
          content_type 'application/json'
          { :errors => asset.errors }.to_json
        end
      end

    end  
  end 
  
end