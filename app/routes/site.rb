class Main   
  include Canable::Enforcers 
  
  # CSS Templates 
  # -------------------------------------------
  # css_route = 
  get '/css/:name' do 
    name = "#{params[:name]}.#{format.to_s}"
    stylesheet = Stylesheet.by_site(current_site).find_by_name(name)  
    
    if stylesheet   
      cache_control :public, :max_age => 2 * 60
      etag Digest::MD5.hexdigest(stylesheet.updated_at.to_s)  
      
      stylesheet.render
    else
      raise Sinatra::NotFound   
    end
  end 
  
  # Javascript Templates
  # -------------------------------------------
  # js_route = 
  get '/js/:name' do
    cache_request(300)
    name = "#{params[:name]}.#{format.to_s}"
    js = Javascript.by_site(current_site).find_by_name(name) 
    
    if js    
      # cache_control :public, :max_age => 2 * 60
      etag Digest::MD5.hexdigest(js.updated_at.to_s)
      
      js.render 
    else
      raise Sinatra::NotFound   
    end
  end  
  
  # Site Preview
  # -------------------------------------------
  # preview_route = 
  get '/preview*' do   
    authenticate!
    path = params[:splat].first   
    # TODO change method to current_site.find_by_path
    page = current_site.find_by_path(path) if path
    
    if page 
      page.edit = true
      page.render({edit: true})
      # page.render(format, request)
    else   
      raise Sinatra::NotFound   
    end
  end
  
  # Site Pages
  # -------------------------------------------
  # pages_route = 
  get '*' do
    # authenticate! unless current_site.published?   
    
    activity = Activity.first :order => 'created_at DESC'
    etag Digest::MD5.hexdigest(activity.created_at.to_s)
    
    path = params[:splat].first
    page = current_site.find_by_path(path) if path
    
    if page 
      # cache_request(60) # unless authenticated?
      cache_control :public, :max_age => 5 * 60
      # etag Digest::MD5.hexdigest(page.updated_at.to_s)
      
      page.render
    else   
      raise Sinatra::NotFound   
    end
  end    
  
  error 404 do   
    # TODO Build custom pages
    status 404
    admin_haml :'errors/not_found'     
  end
  
  #  Error logging
  error 500 do   
    # Error logging
    e = request.env['sinatra.error']
    info = "Application error\n#{e}\n#{e.backtrace.join("\n")}"
    # logger.error info
    haml :'errors/500'     
  end
  
end
