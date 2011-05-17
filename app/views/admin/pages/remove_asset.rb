class Main
  module Views
    module Admin
      module Assets
        class RemoveAsset < Mustache 

          def query_path
            @query.blank? ? '' : "?query=#{@query}"
          end
       
        end
      end
    end
  end
end