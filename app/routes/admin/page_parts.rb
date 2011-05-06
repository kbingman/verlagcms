class Main  
  module Pages 
    
    # Page Parts Index (by Page)
    # -------------------------------------------
    get '/:page_id/parts' do
      page = Page.find(params[:page_id])
      parts = page.page_parts.sort_by{ |p| p.created_at }

      respond_to do |format| 
        format.html { 
          status 404
          haml :'errors/not_found' 
        }
        format.json { parts.to_json }
      end
    end
    
    # Create Page Part 
    # -------------------------------------------
    post '/:page_id/parts' do
      page = Page.find(params[:page_id])
      part = PagePart.new(params[:part]) 
      
      page.page_parts << part
      
      # Mongomapper seems to need to save the parent for this to work...   
      # Seems to be an identity map issue
      if page.save 
        respond_to do |format| 
          format.html { 
            status 404
            haml :'errors/not_found' 
          }
          format.json { part.to_json }
        end
      else
        'error'
      end
    end   
    
    # Delete Page Part
    # -------------------------------------------
    delete '/:page_id/parts/:id' do
      part = PagePart.find params['id']             
      if part.destroy
        respond_to do |format|
          format.html { redirect("/pages/#{@page.id}/edit") }
          format.json {}
        end
      end
    end
    
  end
end