class Main   
  
  namespace '/api/v1' do
    namespace '/folders' do
      
      # Top Level
      # -------------------------------------------
      get '/?' do
        folders = Folder.where(parent_id: nil).where(site_id: current_site._id).all
        folders.to_json
      end
      
      
      # Assets by folder
      # -------------------------------------------
      get '/:folder_id/children/?' do
        folder = Folder.find(params[:folder_id])
        children = folder.children
        children.to_json
      end
      
      # Edit asset by folder
      # -------------------------------------------
      get '/:folder_id/children/:id/?' do
        folder = Folder.find(params[:folder_id])
        children = folder.children
        children.to_json
      end
      
    end
  end
  
end