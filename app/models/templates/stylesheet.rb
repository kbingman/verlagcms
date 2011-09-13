class Stylesheet < Template 
  
  key :filter, String 
  
  # Syntax editor theme name
  def mode
    'css'
  end  
  
  attr_accessible :filter 
  
  def render(options={}) 
    template = Liquid::Template.parse(self.content)
    rendered_content = template.render({
      'site' => SiteDrop.new(self.site, nil), 
      'registers' => { 'site_id' => self.site_id.to_s }
    })
    unless self.filter == 'none'
      begin
        options[:style] = :compact unless options[:style] 
        options[:syntax] = self.filter.to_sym
        Sass::Engine.new(rendered_content, options).render
      rescue Sass::SyntaxError
        "Syntax Error at line #{$!.sass_line}: " + $!.to_s
      end    
    else
      rendered_content
    end
  end
  
end