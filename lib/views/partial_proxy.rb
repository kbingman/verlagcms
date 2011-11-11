class Main
  module Views

    class PartialProxy
    
      def initialize page
        @page = page 
        @site = page.site
      end  
      
      def test 
        'test'
      end
      
      def partial(method)
        @site.templates.first :conditions => { :name => method.to_s } 
      end
      
      def method_missing(method, *args, &block) 
        return super unless partial(method)
        view = Partial.new partial(method), @page
        view.render
      end
      
      def respond_to?(method)
        # This needs to return true for any of the above methods to work.
        partial(method)
      end
    
    end
  end
end