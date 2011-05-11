class Main
  module Views
    module Admin
      module Pages
        class Nodes < Mustache   
          
          # def padding
          #   2 * 24
          # end 
          
          # def children
          #   @root.children if page_open?(@root)
          # end    
          
          def page_open?(page)
            true
          end  
          
        end
      end
    end
  end
end