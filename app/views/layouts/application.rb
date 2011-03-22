class Main
  module Views
    module Layouts
      class Application < Mustache
        def title 
          @title || "Galerie"
        end
      end
    end
  end
end