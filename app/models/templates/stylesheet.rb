require './app/models/template.rb'

class Stylesheet < Template 
  
  key :filter, String 
  
  # Syntax editor theme name
  def mode
    self.filter || 'css'
  end  
  
  attr_accessible :filter 
  
  def render(options={}) 
    stylesheet_view = Main::Views::Stylesheet.new self
    unless self.filter == 'none'
      begin
        Sass::Engine.new(stylesheet_view.render, { 
          :style => :compact, 
          :syntax => self.filter.to_sym 
        }).render
      rescue Sass::SyntaxError
        "Syntax Error at line #{$!.sass_line}: " + $!.to_s
      end    
    else
      stylesheet_view.render
    end
  end
  
  protected
    # After Save
    # ----------------------------------------
    after_save :set_activity
    def set_activity
      a = Activity.new(:loggable => self)
      a.save
    end
  
end