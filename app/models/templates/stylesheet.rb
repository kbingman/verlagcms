require './app/models/template.rb'

class Stylesheet < Template 
  
  key :filter, String 
  
  # Syntax editor theme name
  def mode
    self.filter || 'css'
  end  
  
  attr_accessible :filter 
  
  def render(options={}) 
    # template = Liquid::Template.parse(self.content)
    # rendered_content = template.render({
    #   'site' => SiteDrop.new(self.site, nil), 
    #   'registers' => { 'site_id' => self.site_id.to_s }
    # })
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
  
  protected
    # After Save
    # ----------------------------------------
    after_save :set_activity
    def set_activity
      a = Activity.new(:loggable => self)
      a.save
    end
  
end