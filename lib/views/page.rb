require './lib/views/view_helpers'
require './lib/views/find_page_proxy'
require './lib/views/if_path_proxy'

class Main
  module Views
    
    class Page < Mustache 
      include ViewHelpers
        
      def initialize page, edit = nil
        @global_page = page
        @site = page.site
        @edit = edit
      end
      
      # Loads the template from the db
      def template
        @global_page.layout.content
      end
      
      # Partial
      # ----------------------------------------------------
      def partial(name)
        part = name.to_s.split('_').first
        if part == 'data'
          part_name = name.to_s.split('_')[1]
          method = name.to_s.split('_')[2]
          # puts "Method: #{method}"
          part = @global_page.find_part_by_name(part_name)
          
          if part && method
            part.edit = @edit
            part.send(method)
          elsif part
            part.edit = @edit
            part.render
          end
        else
          partial = @site.templates.first :conditions => { :name => name, :_type => 'Partial' }
          partial.content if partial
        end
      end
      
      # Global Methods
      # ----------------------------------------------------
      # the methods below all refer to the current page
      # you can use any of them without any nesting
      # for example {{ title }} will return the title of the current page
      
      # the current page we are on
      # should you need more than the methods below, nest within this token
      def page
        @global_page
      end
      
      def date
        Time.now.to_s
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
      def children(options={})
        @global_page.children.all options
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
      
      def block
        PartProxy.new @global_page, @edit
      end
      alias :part :block
      
      def find
        FindPageProxy.new @site
      end
      
      def if_path_matches
        IfPathProxy.new @page
      end
      
      def users
        @site.users
      end
      
      def parts
        @global_page.parts
      end
      
      # Conditionals
      # ----------------------------------------------------
      
      # Returns true if the local page matches the global page
      def if_self
        @global_page.id == self[:id]
      end
      
      # Returns true if the local page or any of its ancestors match the global page
      def if_ancestor_or_self
        local_page_id = self[:id].to_s
        ids = @global_page.ancestor_ids + [@global_page.id.to_s]
        ids.include?(local_page_id)
      end      
      
      # Meta Methods
      # ----------------------------------------------------
      def method_missing(method, *args, &block) 
        return super unless method.to_s =~ /^children_limit_(\d+)/
        self.children({ :limit => $1 })
      end
      
      # This needs to return true for any of the above methods to work.
      def respond_to?(method) 
        return super unless method.to_s.match(/^children_limit_(\d+)/)
        true
      end

    end
  end
end