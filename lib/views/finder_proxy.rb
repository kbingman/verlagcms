class Main
  module Views

    class FinderProxy
    
      def initialize site
        @site = site
      end  
      
      def test 
        'test'
      end
      
      def find_page path
        # @page ||= @site.find_by_path(path)
        @site.find_by_path(path)
      end
      
      def root
        @page = @site.root
      end
      
      def method_missing(method, *args, &block) 
        page = find_page(method.to_s)
        return super unless page
        page
      end
      
      def respond_to?(method)
        # This needs to return true for any of the above methods to work.
        page = page = find_page(method.to_s)
        page ? true : false
      end
    
    end
  end
end