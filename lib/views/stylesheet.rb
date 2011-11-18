class Main
  module Views
    
    class Stylesheet < Mustache 
        
      def initialize(template, edit = nil)
        @template = template
        @site = template.site
        @edit = edit
      end
      
      # Loads the template from the db
      def template
        @template.content
      end
      
      # Partial
      # ----------------------------------------------------
      def partial(name)
        part = @site.templates.first :conditions => { :name => name, :_type => 'Stylesheet' }
        part.content if part
      end
      
    end
  end
end