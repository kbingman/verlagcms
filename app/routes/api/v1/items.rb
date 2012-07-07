class Main   
  
  namespace '/admin' do
    namespace '/items' do
      
      # Assets by folder
      # -------------------------------------------
      get '/?' do
        items = Item.where(parent_id: nil).where(site_id: current_site._id).all
        
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { items.to_json }
        end
      end
      
      # Assets by folder
      # -------------------------------------------
      get '/:folder_id/items/?' do
        folder = Item.find(params[:folder_id])
        assets = folder.children
      
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { assets.to_json }
        end
      end
      
      # Edit asset by folder
      # -------------------------------------------
      get '/:folder_id/items/:id/?' do
        folder = Item.find(params[:folder_id])
        item = Item.find(params[:id])
      
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { item.to_json }
        end
      end

      
    end
  end
  
end
