class Main  
  
  # Pulls out the format before each request
  before do
    ext = request.path_info =~ /.*([.]([^.]*))$/ ? $1 : '.html'
    request.path_info = request.path_info + ext unless $1
    content_type ext
  end
  
  before do
    logger.info "#{request.request_method} #{request.path}"
  end
  
  get '/' do
    @title = "Mustache + Sinatra = Wonder"
    haml :'pages/page' 
  end 
  
  get '/search.:format' do
    @query = params[:query] ? params[:query].split('.')[0] : ''
    @assets = Asset.search(@query).all

    respond_to do |format|
      format.html { haml :'pages/assets' }
      format.json { @assets.to_json }
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
  
  
  get '/assets/:query/:id.:format' do
    @query = params[:query] ? params[:query].split('.')[0] : ''
    @assets = Asset.search(@query).all
    @asset = Asset.find params['id']

    respond_to do |format|
      format.html { haml :'pages/asset' }
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
