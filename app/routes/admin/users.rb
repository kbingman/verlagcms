class Main  
  namespace '/admin' do 
      
    # Index
    # -------------------------------------------
    get '/users/?' do
      collection = current_user.is_admin? ? User.by_site(current_site).all : [current_user] # 
      respond_to do |format|
        format.html { admin_haml :'admin/index' }
        format.json { collection.to_json }
      end
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
        { :errors => resource.errors }.to_json
      end
    end
      
  end  
end