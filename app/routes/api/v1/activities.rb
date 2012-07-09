class Main    
  namespace '/api/v1' do
    
    helpers do
      before do
        authenticate!
        content_type 'application/json'
      end
    end
      
    # Activity Index
    # -------------------------------------------
    get '/activity/?' do  
      collection = Activity.all :limit => 10, :order => ('created_at DESC')
      
      collection.to_json 
    end
    
    # Activity responder
    # -------------------------------------------
    post '/activity/?' do  
      last_updated = params['updated'].to_i
      collection = Activity.where(:now.gte => last_updated).all
      if collection.length > 0
        @models = collection.collect{ |a| a.loggable }
      else
        @models = []
      end
      
      { :models => @models, :errors => [] }.to_json
    end
 
  end  
end