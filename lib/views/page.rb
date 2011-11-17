require './lib/views/view_helpers'
require './lib/views/finder_proxy'

class Main
  module Views
    
    class Page < Mustache 
      include ViewHelpers
        
      def initialize page, edit = nil
        @global_page = page
        @site = page.site
        @edit = edit
      end
      
      # determines the template
      def template
        @global_page.layout.content
      end
      
      # Global Methods
      # -----------------------------------------------------------------------------
      # the methods below all refer to the current page
      # you can use any of them without any nesting
      # for example {{ title }} will return the title of the current page
      
      # the current page we are on
      # should you need more than the methods below, nest within this token
      def page
        @global_page
      end
      
      # title of the current page
      def title
        @global_page.title
      end
      
      # path of the current page
      def path
        @global_page.path
      end
      
      # slug of the current page
      def slug
        @global_page.slug
      end
      
      # children of the current page
      def children
        @global_page.children
      end
      
      # current site
      def site
        @site
      end
      
      # root page of the current site
      def root
        @site.root
      end
      
      
      # Proxy Methods
      # ----------------------------------------------------
      
      def data
        PartProxy.new @global_page, @edit
      end
      
      def find
        FinderProxy.new @site
      end
      
      def partial
        PartialProxy.new @global_page
      end
      
      def users
        @site.users
      end

    end
  end
end