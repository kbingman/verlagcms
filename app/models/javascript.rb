class Javascript < Template 
  
  key :filter, String
  
  # Syntax editor theme name 
  def mode
    'javascript'
  end  
  
  def render
    self.content
  end

end