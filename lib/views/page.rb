class Main
  module Views
    
    class Page < Mustache 
      include ::ViewHelpers
        
      def initialize page, request = nil
        @page = page
        @site = page.site
      end
      
      def template
        @page.layout.content
      end
      
      def page
        @page
      end
      
      def title
        @page.title
      end
      
      def site
        @site
      end

      def data
        PartProxy.new @page
      end
      
      def tree
        # cache this??
        @site.tree @page
      end

      def users
        User.all
      end

    end
  end
end