class Main
  module Views
    module Pages
      class Page < Layouts::Application
        def content
          "Welcome! Mustache lives."
        end
      end
    end
  end
end
