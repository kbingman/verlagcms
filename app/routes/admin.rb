class Main   
  # include Canable::Enforcers
  
  # Admin Mustache Templates 
  # -------------------------------------------
  template_route = get '/templates' do  
    authenticate!
    cache_request  
    @files = Dir[root_path('app/views/admin/**/*.mustache')]
    partial :'layouts/js_templates' 
  end
  
  # Site admin interface  
  # -------------------------------------------  
  module Admin    
    before do
      # TODO better way to override authorization
      authenticate! unless request.path.match(/^\/admin\/css\//)
      
      # Clears the cache
      # TDOO this needs to be a class or something...
      if request.request_method == 'PUT'
        Dir[File.join(root_path('tmp/cache/body'), "*")].each{ |file| FileUtils.rm_rf(file) }
        $cache.flush
      end
  
      # Redirects if no site is found
      # unless current_site   
      #   redirect '/admin/' 
      # end 
    end  
    
    # Redirects to '/admin/' so that the page hash looks pretty     
    get '' do
      redirect '/admin/'
    end
    
    admin_route = get '/' do   
      admin_haml :'admin/index'  
    end  
  end
  
end