class Main  
  
  # Pulls out the format before each request
  before do
    ext = request.path_info =~ /.*([.]([^.]*))$/ ? $1 : '.html'
    request.path_info = request.path_info + ext unless $1
    content_type ext
  end
  
  get '/' do
    @title = "Mustache + Sinatra = Wonder"
    haml :'pages/page' 
  end 
  
  # This method just redirects to a prettier url, as davis has issues with queries. 
  get '/search.:format' do
    query = params[:query].gsub(/ /, '+') if params[:query]
    @assets = Asset.all
    respond_to do |format|
      format.html do
        if query
          redirect("/search/#{query}") 
        else
          haml :'pages/assets'
        end
      end 
      format.json do
        if query
          redirect("/search/#{query}.json") 
        else
          @asset.to_json
        end
      end
    end  
  end
  
  get '/search/:query.:format' do
    @query = params[:query] ? params[:query].split('.')[0] : ''
    @assets = Asset.search(@query).all

    respond_to do |format|
      format.html { haml :'pages/assets' }
      format.json { @assets.to_json }
    end
  end   
  
  get '/:page' do
    @title = params[:page]
    haml :'pages/page' 
  end 
  
  error 404 do   
    haml :'errors/not_found'     
  end
  
end
