class Main    
  
  namespace '/api/v1' do 
    namespace '/assets' do
      
      # Asset Index
      # -------------------------------------------
      get '/?' do  
        @query = params[:query] ? params[:query].split('.')[0] : ''
        options = { :order => 'created_at DESC',  :page => params[:page] }
        options[:per_page] = params[:limit] ? params[:limit] : Asset.per_page

        plucky_query = if params[:query]
          Asset.by_site(current_site).search_all_with_title(@query)
        else
          Asset.by_site(current_site)
        end
        
        assets = plucky_query.paginate(options)
        assets.to_json 
      end
      
      # Create Asset
      # -------------------------------------------
      post '' do
        asset = Asset.new({ 
          file: params['file'][:tempfile] ,
          file_name: params['file'][:filename], 
          parent_id:  params['parent_id'],
          site: current_site
        })

        if asset.save
          asset.to_json 
        else
          { :errors => asset.errors }.to_json
        end
      end

    end  
  end 
  
end