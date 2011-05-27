class Main    
   
  # get '/:page' do
  #   @title = params[:page]
  #   haml :'pages/page' 
  # end   
  
  get '*' do  
    # cache_request     
    if current_site      
      logger.info(params[:splat].inspect) 
      @path = params[:splat].first
      @title = current_site.name 
      @page = Page.find_by_path(@path, current_site) 
      logger.info request.params.inspect

      unless @page.nil? 
        haml :'pages/page' 
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
