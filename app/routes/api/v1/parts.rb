class Main   
  
  namespace '/api/v1' do
    namespace '/pages' do
      
      # Edit Page Parts
      # -------------------------------------------
      get '/:page_id/parts/:id/edit' do
        page = Page.find(params[:page_id])
        parts.to_json 
      end
      
      # TEMP
      get '/:page_id/image_parts/:id/edit' do
        page = Page.find(params[:page_id])
        # parts = page.parts.sort_by{ |p| p.created_at }
        parts.to_json 
      end
      
      # Create Page Part 
      # -------------------------------------------
      # post '/:page_id/parts' do
      #   page = Page.find(params[:page_id])
      #   part = Part.new(params[:part]) 
      #   
      #   page.parts << part
      #   
      #   # Mongomapper seems to need to save the parent for this to work...   
      #   # Seems to be an identity map issue
      #   if page.save 
      #     respond_to do |format| 
      #       format.html { 
      #         status 404
      #         haml :'errors/not_found' 
      #       }
      #       format.json { page.to_json }
      #     end
      #   else
      #     'error'
      #   end
      # end   
      # 
      # # Delete Page Part
      # # -------------------------------------------
      # delete '/:page_id/parts/:id' do      
      #   page = Page.find params['page_id']  
      #   part_id = params['id']   
      #   page.parts.delete_if{ |part| part._id.to_s == part_id }  
      #             
      #   if page.save
      #     respond_to do |format|
      #       format.html { redirect("/pages/#{page.id}/edit") }
      #       format.json { page.to_json}
      #     end
      #   end
      # end
      
    end 
  end
  
end