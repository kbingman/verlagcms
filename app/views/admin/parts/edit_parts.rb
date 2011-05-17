class Main
  module Views
    module Admin
      module PageParts
        class EditParts < Mustache   
          
          def parts
            @page.page_parts
          end  
          
        end
      end
    end
  end
end