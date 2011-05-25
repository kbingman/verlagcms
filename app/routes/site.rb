class Main  
  
  get '/' do  
    # cache_request     
    if current_site 
      @title = current_site.name
      logger.info current_site.name 
      haml :'pages/page' 
    else
      # raise Sinatra::NotFound 
      haml :'pages/welcome'   
    end
  end    
  
  get '/admin/?' do
    admin_haml :'admin/pages/index'  
  end  
  
  get '/templates/*' do  
    cache_request  
    name =  params[:splat] 
    logger.info name
    # content_type 'text'
    partial :'layouts/template', :locals => { :template => "/#{params[:splat]}" }
  end
 
  # get '/:page' do
  #   @title = params[:page]
  #   haml :'pages/page' 
  # end  
  before do
    
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
