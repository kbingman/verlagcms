class Main   
  # include Canable::Enforcers
    
  # Site admin interface  
  # -------------------------------------------  
  namespace '/admin' do   
    before do
      # TODO better way to override authorization
      authenticate! unless request.path.match(/^\/admin\/css\//)
      
      # Clears the cache
      # TODO this needs to be a class or something...
      if request.request_method == 'PUT'
        Dir[File.join(root_path('tmp/cache/body'), "*")].each{ |file| FileUtils.rm_rf(file) }
        $cache.flush unless $cache.nil?
      end
    end  
    
    # Redirects to '/admin/' so that the page hash looks pretty     
    get '' do
      redirect '/admin/'
    end
  
    get '/*' do   
      admin_haml :'admin/index'
    end  
  end
  
end