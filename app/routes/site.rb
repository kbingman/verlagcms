class Main  
  
  # Pulls out the format before each request
  # but removes the param, so that the raoutes 
  # can be written so '/assets' instead of '/assets.:format'
  before do
    ext = Pathname(request.path_info).extname
    request.path_info = request.path_info.sub!(/#{ext}$/,'')
    content_type = request.content_type ? request.content_type.split(';').first.sub!(/^application\//,'') : nil
    ext = ext.empty? ? content_type : ext.sub(/^./,'')
    self.format = (ext || options.default_content_type).to_sym
    content_type format
  end
  
  # Logging info
  before do
    @start = Time.now
    logger.info "Starting: #{request.request_method} #{request.path} #{response.status}"
    logger.info "Parameters: #{params.inspect}"
    logger.info "Content Type:  #{request.content_type}"
    logger.info "Format: #{format}"   
  end
  
  after do
    logger.info "Completed in: #{Time.now - @start}s"  
    logger.info "#{1 / (Time.now - @start)} Requests per second"  
    logger.info ""
  end
  
  get '/' do
    @title = "Mustache + Sinatra = Wonder"
    haml :'pages/page' 
  end 
 
  get '/:page.:format' do
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
