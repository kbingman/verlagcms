class Main    
  
  module Admin  
      
      # Asset Index
      # -------------------------------------------
      # get '/activity/?' do  
      #   last_updated = params['updated'].to_i
      #   collection = Activity.where(:now.gte => last_updated).all
      #   if collection.length > 0
      #     @models = collection.collect{ |a| a.loggable }
      #   else
      #     @models = []
      #   end
      #   
      #   respond_to do |format|
      #     format.html { admin_haml :'admin/index' }
      #     format.json {{ :models => @models }.to_json }
      #     # format.json { render :rabl, :'admin/activity/index', :format => "json" }
      #   end
      # end
      
      # Create Asset
      # -------------------------------------------
      post '/activity/?' do  
        last_updated = params['updated'].to_i
        collection = Activity.where(:now.gte => last_updated).all
        if collection.length > 0
          @models = collection.collect{ |a| a.loggable }
        else
          @models = []
        end
        
        respond_to do |format|
          format.html { admin_haml :'admin/index' }
          format.json {{ :models => @models, :errors => [] }.to_json}
          # format.json { render :rabl, :'admin/activity/index', :format => "json" }
        end
      end
 
  end 
  
end