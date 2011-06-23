class Main    
  
  # Admin Mustache Templates   
  template_route = get '/templates/*' do  
    cache_request  
    name =  params[:splat] 
    partial :'layouts/template', :locals => { :template => "/#{params[:splat]}" }
  end   
  
  # Redirects to '/admin/' so that the page hash looks pretty
  get '/admin' do
    redirect '/admin/'
  end
  
  # Site admin interface
  admin_route = get '/admin/' do
    admin_haml :'admin/index'  
  end
  
  # CSS Templates 
  css_route = get '/css/:name' do 
    name = "#{params[:name]}.#{format.to_s}"
    css = Stylesheet.by_site(current_site.id).find_by_name(name)  
    if css    
      css.render 
    else
      raise Sinatra::NotFound   
    end
  end 
  
  # Javascript Templates
  js_route = get '/js/:name' do
    name = "#{params[:name]}.#{format.to_s}"
    js = Javascript.by_site(current_site.id).find_by_name(name) 
    if js    
      js.render 
    else
      raise Sinatra::NotFound   
    end
  end  
  
  preview_route = get '/preview*' do
    path = params[:splat].first   
    page = Page.find_by_path(path, current_site) 
    
    unless page.nil? 
      page.render(format, request)
    else   
      raise Sinatra::NotFound   
    end
  end
  
  # Site Pages
  pages_route = get '*' do   
    cache_request     
         
    path = params[:splat].first
    page = Page.find_by_path(path, current_site) 
    
    if page 
      page.render(format, request)
    else   
      raise Sinatra::NotFound   
    end
    # if current_site 
    # else
    #   haml :'pages/welcome'   
    # end
  end    
  
  error 404 do   
    haml :'errors/not_found'     
  end
  
  #  Error logging
  error 500 do   
    # Error logging
    e = request.env['sinatra.error']
    info = "Application error\n#{e}\n#{e.backtrace.join("\n")}"
    logger.error info
    haml :'errors/500'     
  end
  
end
