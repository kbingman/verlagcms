require './lib/views/view_helpers'

class Main
  module Views
    
    class Page < Mustache 
      include ViewHelpers
        
      def initialize page, edit = nil
        @page = page
        @site = page.site
        @edit = edit
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
      
      def children
        @page.children
      end

      def data
        PartProxy.new @page, @edit
      end
      
      def tree
        # cache this??
        @site.tree @page
      end

      def users
        User.all
      end
      
      def partial
        PartialProxy.new self
      end

    end
  end
end