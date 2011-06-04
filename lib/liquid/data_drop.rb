class DataDrop < Liquid::Drop
  
  def initialize page
    @parts = page.parts 
  end  
   
  def before_method(meth) 
    part = @parts.detect { |p| p.name == meth.to_s } 
    part ? part.render : '' 
  end

end