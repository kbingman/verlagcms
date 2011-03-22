class Main  
  
  get '/' do
    @title = "Mustache + Sinatra = Wonder"
    mustache :'pages/page' 
  end 
  
  get '/search' do
    if params[:query]
      query = params[:query].gsub(/ /, '+')
      redirect("/assets/#{query}") 
    end
    @assets = Asset.all
    haml :'pages/assets' 
  end
  
  get '/search/:query?/?' do
    @query = params[:query] ? params[:query] : ''
    logger.info 'Title: ' + @query
    haml :'pages/assets' 
  end   
  
  get '/:page' do
    @title = params[:page]
    mustache :'pages/page' 
  end 
  
  # get '*' do
  #   @path = params[:splat]
  #   if File.exists? root_path("app/views/pages/#{@path}.haml")
  #     haml :"pages/#{@path}"    
  #   else  
  #     haml :'pages/404'   
  #   end
  # end   
  
  error 404 do   
    mustache :'errors/not_found'     
  end
  
end
