
class Main  
  namespace '/api/v1' do 
      
    # Index
    # -------------------------------------------
    get '/users/?' do
      collection = current_user.is_admin? ? User.by_site(current_site).all : [current_user] # 
      collection.to_json
    end
    
    # Create
    # -------------------------------------------
    post '/users' do   
      attributes = JSON.parse(request.body.read.to_s)
      resource = User.new(attributes) 
      resource.sites << current_site
      if resource.save
        resource.to_json
      else
        status 400
        content_type 'application/json'
        { :errors => resource.errors }.to_json
      end
    end
      
  end  
end