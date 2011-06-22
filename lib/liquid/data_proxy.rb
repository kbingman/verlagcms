class DataProxy
  
  def initialize page, request=nil
    @page = page 
    @request = request
  end  
  
  def to_liquid
    DataDrop.new(@page, @request)
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