require root_path('app/models/template.rb') 

class Javascript < Template 
  
  key :filter, String
  
  # Syntax editor theme name 
  def mode
    'javascript'
  end  
  
  def render
    js_view = Main::Views::Javascript.new self
    js_view.render()
  end

end