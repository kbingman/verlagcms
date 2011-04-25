class Main  
  module Search

    get '' do
      @query = params[:query] ? params[:query].split('.')[0] : ''
      @assets = Asset.search_all(@query).all :order => 'created_at DESC'
      respond_to do |format|
        format.html { haml :'search/assets' }
        format.json { @assets.to_json }
      end
    end
     
    get '/:id' do
      @query = params[:query] ? params[:query].split('.')[0] : ''
      @asset = Asset.find params['id']
    
      respond_to do |format|
        format.html { haml :'search/asset' }
        format.json { @assets.to_json }
      end
    end
  
  end
end