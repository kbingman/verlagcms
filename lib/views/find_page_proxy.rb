class Main
  module Views

    class FindPageProxy
    
      # Clears out the page, so that it is not cached between interations
      def initialize site
        @site = site
        @page = nil
      end  
      
      # 'caches' the page so that only one db request is made
      def find_page path
        @page ||= @site.find_by_path(path)
      end
      
      def method_missing(method, *args, &block) 
        page = find_page(method.to_s)
        return super unless page
        page
      end
      
      # This needs to return true for any of the above methods to work.
      def respond_to?(method)
        page = page = find_page(method.to_s)
        page ? true : false
      end
    
    end
  end
end