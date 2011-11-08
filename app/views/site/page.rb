class Main
  module Views
    module Site
      class Page < Mustache 
        
        def initialize page
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
          @page.data
        end
        
        def body
          @page.data.body
        end
        
        def tree
          # cache this??
          @site.tree(page)
        end
        
      end
    end
  end
end