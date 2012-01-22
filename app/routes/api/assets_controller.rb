class Main  
  
  # Public API for Assets
  # -------------------------------------------
  
  namespace '/api' do
    
    helpers do
  
    end
      
    # Assets Index
    # -------------------------------------------
    get '/assets/?' do  
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
    
    # Show Asset
    # -------------------------------------------
    get '/assets/:id/?' do
      resource = klass.by_site(current_site).find params['id']
      if resource
        resource.to_json
      else
        raise Sinatra::NotFound
      end
    end
      
  end  
end