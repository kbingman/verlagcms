class Main   
  
  module Admin 
    module Folders 
      
      # Assets by folder
      # -------------------------------------------
      get '/:folder_id/assets' do
        folder = Folder.find(params[:folder_id])
        assets = folder.assets
      
        respond_to do |format| 
          format.html { admin_haml :'admin/index' }
          format.json { assets.to_json }
        end
      end
      
    end
  end
  
end