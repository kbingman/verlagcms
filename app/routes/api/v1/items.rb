class Main   
  
  namespace '/api/v1' do
    namespace '/items' do
      
      # Assets by folder
      # -------------------------------------------
      get '/?' do
        items = Item.where(parent_id: nil).where(site_id: current_site._id).all
        items.to_json
      end
      
      # Assets by folder
      # -------------------------------------------
      get '/:folder_id/items/?' do
        folder = Item.find(params[:folder_id])
        assets = folder.children
        assets.to_json
      end
      
      # Edit asset by folder
      # -------------------------------------------
      get '/:folder_id/items/:id/?' do
        folder = Item.find(params[:folder_id])
        item = Item.find(params[:id])
        item.to_json
      end

    end
  end
  
end
