class Main    
   
  # get '/:page' do
  #   @title = params[:page]
  #   haml :'pages/page' 
  # end 
  
  get '/templates/*' do  
    # cache_request  
    name =  params[:splat] 
    logger.info name
    # content_type 'text'
    partial :'layouts/template', :locals => { :template => "/#{params[:splat]}" }
  end 
  
  get '/css/:name' do 
    name = "#{params[:name]}.#{format.to_s}"
    css = Stylesheet.by_site(current_site.id).find_by_name(name)  
    css.render
  end 
  
  get '/js/:name' do
    name = "#{params[:name]}.#{format.to_s}"
    js = Javascript.by_site(current_site.id).find_by_name(name) 
    js.render
  end
  
  get '*' do  
    # cache_request     
    if current_site      
      path = params[:splat].first
      @page = Page.find_by_path(path, current_site) 

      unless @page.nil? 
        @page.render(format, request)
      else   
        raise Sinatra::NotFound   
      end
    else
      haml :'pages/welcome'   
    end
  end
  
  error 404 do   
    haml :'errors/not_found'     
  end
  
  error 500 do   
    # Error logging
    e = request.env['sinatra.error']
    info = "Application error\n#{e}\n#{e.backtrace.join("\n")}"
    logger.error info
    haml :'errors/500'     
  end
  
end
