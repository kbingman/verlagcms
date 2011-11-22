class Main
  module Views

    class ChildrenProxy
    
      def initialize page
        @page = page
      end  
      
      def each(options={})
        @page.children.all options
      end
      
      def method_missing(method, *args, &block) 
        return super unless method.to_s =~ /^limit_(\d+)/
        self.each({ :limit => $1 })
      end
      
      # This needs to return true for any of the above methods to work.
      def respond_to?(method) 
        return super unless method.to_s.match(/^limit_(\d+)/)
        true
      end
    
    end
  end
end