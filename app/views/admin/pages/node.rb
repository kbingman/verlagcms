class Main
  module Views
    module Admin
      module Pages
        class Node < Mustache   
          
          def level
            @level || 1  
          end   
          
          def padding
            (level - 1) * 24
          end 
          
          def children
            @page.children if page_open?(@page)
          end    
          
          def page_open?(page)
            true
          end  
          
          def render_children
            # mustache :'admin/pages/node'
          end
          
        end
      end
    end
  end
end