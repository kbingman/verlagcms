class Main
  module Views

    class IfPathProxy
    
      def initialize page
        @page = page
      end  
      
      def remove_trailing_slash(string)
        (string =~ %r{^(.*?)/$}) ? $1 : string
      end
      
      def method_missing(method, *args, &block) 
        return super unless remove_trailing_slash(@page.path) == remove_trailing_slash(method.to_s)
        true
      end
      
      # This needs to return true for any of the above methods to work.
      def respond_to?(method)
        remove_trailing_slash(@page.path) == remove_trailing_slash(method.to_s) ? true : false
      end
    
    end
  end
end