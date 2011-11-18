class Main   
  include Canable::Enforcers 
  
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
  
  # CSS Templates 
  # -------------------------------------------
  # css_route = 
  get '/css/:name' do 
    cache_request(60)
    name = "#{params[:name]}.#{format.to_s}"
    stylesheet = Stylesheet.by_site(current_site).find_by_name(name)  
    if stylesheet    
      stylesheet_view = Views::Stylesheet.new stylesheet
      # move to model?
      unless stylesheet.filter == 'none'
        begin
          Sass::Engine.new(stylesheet_view.render, { 
            :style => :compact, 
            :syntax => stylesheet.filter.to_sym 
          }).render
        rescue Sass::SyntaxError
          "Syntax Error at line #{$!.sass_line}: " + $!.to_s
        end    
      else
        stylesheet_view.render
      end
    else
      raise Sinatra::NotFound   
    end
  end 
  
  # Javascript Templates
  # -------------------------------------------
  # js_route = 
  get '/js/:name' do
    cache_request(60)
    name = "#{params[:name]}.#{format.to_s}"
    js = Javascript.by_site(current_site).find_by_name(name) 
    if js    
      # js.render 
      js_view = Views::Javascript.new js
      js_view.render()
    else
      raise Sinatra::NotFound   
    end
  end  
  
  # Site Preview
  # -------------------------------------------
  # preview_route = 
  get '/preview*' do   
    authenticate!
    path = params[:splat].first   
    # TODO change method to current_site.find_by_path
    page = Page.find_by_path(path, current_site) 
    
    if page 
      page_view = Views::Page.new page, true
      page_view.render()
      # page.render(format, request)
    else   
      raise Sinatra::NotFound   
    end
  end
  
  # Site Pages
  # -------------------------------------------
  # pages_route = 
  get '*' do
    authenticate! unless current_site.published?   
    cache_request(60) # unless authenticated?
     
    path = params[:splat].first
    # TODO change method to current_site.find_by_path
    page = Page.find_by_path(path, current_site) if path
    
    if page 
      page_view = Views::Page.new page
      page_view.render()
    else   
      raise Sinatra::NotFound   
    end
    # page.template.content
  end    
  

  
  error 404 do   
    # TODO Build custom pages
    admin_haml :'errors/not_found'     
  end
  
  #  Error logging
  error 500 do   
    # Error logging
    e = request.env['sinatra.error']
    info = "Application error\n#{e}\n#{e.backtrace.join("\n")}"
    logger.error info
    haml :'errors/500'     
  end
  
end
