class Stylesheet < Template 
  
  key :filter, String 
  
  # Syntax editor theme name
  def mode
    'css'
  end  
  
  attr_accessible :filter 
  
  def render(options={}) 
    unless self.filter == 'none'
      begin
        options[:style] = :compact unless options[:style] 
        options[:syntax] = self.filter.to_sym
        Sass::Engine.new(self.content, options).render
      rescue Sass::SyntaxError
        "Syntax Error at line #{$!.sass_line}: " + $!.to_s
      end    
    else
      self.content
    end
  end
  
end