class Main
  helpers do

    #   def format_date(date, format = "%d/%m/%Y")
    #     date.strftime(format)
    #   end

    # Set default mustache template
    def mustache(template, options = {}, locals = {})
      options[:layout] = :'layouts/application' unless options.include?(:layout)    
      super(template, options, locals)
    end
    
    # Set default haml template
    def haml(template, options = {}, locals = {})
      options[:layout] = :'layouts/application' unless options.include?(:layout)    
      super(template, options, locals)
    end
    
    # Mustache partials
    def partial(template, options = {}, locals = {})
      options[:layout] = false  
      mustache(template, options, locals)
    end
    
    # def haml_partial(template, options = {}, locals = {})
    #   options[:layout] = false
    #   haml(template, options, locals)
    # end

    def cache_request(timeout=600)
      unless RACK_ENV == 'development'
        response['Cache-Control'] = "max-age=#{timeout}, public" 
      end
    end
    
    # Embeds the mustache templates in a script tag, with the correct id
    # The actual rendering is done using a partial
    def show_template(*sources)
      sources.map do |source|
        template = File.open(root_path(File.join('app/views/', "#{source}.mustache")))
        dom_id = source.split('/').last.dasherize
        haml :'layouts/_template', { :layout => false }, { :template => template.read.html_safe, :dom_id => dom_id }
      end
    end
    
    # Provides content_for and matching content tags for sinatra views
    def content_for(key, &block)
      @content ||= {}
      @content[key] = capture_haml(&block)
    end
    
    def content(key)
      @content && @content[key]
    end
    
    # Render a partial and pass local variables.
    #
    # Example:
    #   != partial :games, :players => @players
    # def partial(template, locals = {})
    #   mustache(template, {:layout => false}, locals)
    # end
  end
end
