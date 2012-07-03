class Main   
  
  namespace '/admin' do
    namespace '/folders' do
      
      # Top Level
      # -------------------------------------------
      get '/?' do
        folders = Folder.where(parent_id: nil).where(site_id: current_site._id).all
        
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { folders.to_json }
        end
      end
      
      
      # Assets by folder
      # -------------------------------------------
      get '/:folder_id/children/?' do
        folder = Folder.find(params[:folder_id])
        children = folder.children
      
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { children.to_json }
        end
      end
      
      # Edit asset by folder
      # -------------------------------------------
      get '/:folder_id/children/:id/?' do
        folder = Folder.find(params[:folder_id])
        children = folder.children
      
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { children.to_json }
        end
      end
      
    end
  end
  
end