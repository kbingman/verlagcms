class Main
  module Views

    class Partial < Page 

      def initialize partial, page = nil
        @partial = partial
        @page = page 
        @site = partial.site
      end  
      
      def template
        @partial.content
      end
    
    end
  end
end