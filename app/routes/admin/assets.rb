class Main    
  
  namespace '/admin' do 
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

        respond_to do |format|
          format.html { admin_haml :'admin/index' }
          format.json { assets.to_json  }
        end
      end
      
      # Create Asset
      # -------------------------------------------
      post '' do
        folder_id = params['folder_id']
        asset = Asset.new({ 
          file: params['file'][:tempfile] ,
          file_name: params['file'][:filename], 
          folder_id: folder_id,
          site: current_site
        })

        if asset.save
          respond_to do |format|
            format.html { redirect("/admin/folders/#{folder_id}") }
            format.json { asset.to_json }
          end
        else
          { :errors => asset.errors }.to_json
        end
      end

    end  
  end 
  
end