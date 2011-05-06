class Main  
  
  get '/' do
    @title = "Mustache + Sinatra = Wonder"
    haml :'pages/page' 
  end 
 
  get '/:page' do
    @title = params[:page]
    haml :'pages/page' 
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
