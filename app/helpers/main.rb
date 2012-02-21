class Main
  
  helpers do
    
    def model
      @model ||= params['model']
    end
    
    def klass 
      begin
        @klass ||= model.singularize.titlecase.constantize if model 
      rescue
        nil
      end
    end
     
    # Basic Date formatting
    def format_date(date, format = "%d/%m/%Y")
      date.strftime(format)
    end

    # Set default mustache partials
    def mustache(template, options = {}, locals = {})
      options[:layout] = false unless options.include?(:layout)    
      super(template, options, locals)
    end
    
    # Set default haml template
    def haml(template, options = {}, locals = {})
      options[:layout] = :'layouts/admin' unless options.include?(:layout)    
      super(template, options, locals)
    end
    
    # Set admin haml template
    def admin_haml(template, options = {}, locals = {})
      options[:layout] = :'layouts/admin' unless options.include?(:layout)    
      haml(template, options, locals)
    end
    
    # Haml partials
    def partial(template, options = {}, locals = {})
      options[:layout] = false  
      haml(template, options, locals)
    end
            
    # Page Caching using Rack Cache or Varnish
    def cache_request(timeout=600)
      unless RACK_ENV == 'development'
        response['Cache-Control'] = "max-age=#{timeout}, public" 
      end
    end 
     
    # Delivers a page without any page cache. Forces the browser to reload.
    def no_request_cache
      response.headers['Cache-Control'] = 'public, no-store, no-cache, must-revalidate, max-age=0' 
    end
    
    # Embeds the mustache templates in a script tag, with the correct id
    def show_template(*sources)
      sources.map do |source|
        template = File.open(root_path(File.join('app/views/', "#{source}.mustache")))
        dom_id = source.split('/').last.dasherize
        haml :'layouts/_template', 
          { :layout => false }, 
          { :template => template.read.html_safe, :dom_id => dom_id }
      end
    end 
    
    # Returns the mustache template as raw html so that we can use it on the client
    def js_template(source)
      template = File.open(root_path(File.join('app/views/', "#{source}.mustache")))
      dom_id = source.split('/').last.camelize
      template.read.html_safe
    end
    
    # Provides content_for and matching content tags for sinatra views
    # def content_for(key, &block)
    #   @content ||= {}
    #   @content[key] = capture_haml(&block)
    # end
    # 
    # def content(key)
    #   @content && @content[key]
    # end  
    
    def sidebar_toggled?
      request.cookies['sidebar_toggled']
    end
    
    def editor_toggled?
      request.cookies['sidebar_toggled'] == 'closed' ? 'open' : 'closed'
    end
 
  end
end
