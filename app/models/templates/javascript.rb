require './app/models/template.rb'

class Javascript < Template 
  
  key :filter, String
  
  # Syntax editor theme name 
  def mode
    'javascript'
  end  

end