class Javascript < Template 
  
  key :filter, String
  
  def mode
    'javascript'
  end  
  
  def render
    self.content
  end

end