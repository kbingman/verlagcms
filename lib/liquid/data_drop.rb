class DataDrop < Liquid::Drop
  
  def initialize page
    @page = page 
  end   
  
  def title
    @page.title
  end  
  
  def slug
    @page.slug
  end
   
  def before_method(meth) 
    part = @page.parts.detect { |p| p.name == meth.to_s } 
    part ? part.render : '' 
  end

end