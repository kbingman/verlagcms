class Main    
  
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

end