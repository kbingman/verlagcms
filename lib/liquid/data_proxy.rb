class DataProxy
  
  def initialize page
    @page = page 
  end  
  
  def to_liquid
    DataDrop.new(@page)
  end  
  
  def title
    @page.title
  end
  
  def slug
    @page.slug
  end 
  
  def method_missing(meth) 
    part = @page.parts.detect { |p| p.name == meth.to_s } 
    part ? part.render : ''
  end

end