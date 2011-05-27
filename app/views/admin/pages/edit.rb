class Main
  module Views
    module Admin
      module Pages
        class Edit < Mustache 
            
          def page_id
            @page.id  
          end      
          
        end
      end
    end
  end
end