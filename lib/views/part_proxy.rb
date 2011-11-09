class PartProxy

  def initialize page, request=nil
    @page = page 
    @request = request
  end  
  
  def test 
    'test'
  end
  
  def part(method)
    @page.parts.detect { |p| p.name == method.to_s } 
  end
  
  def method_missing(method, *args, &block) 
    return super unless part(method)
    part(method).render
  end
  
  def respond_to?(method)
    # This needs to return true for any of the above methods to work.
    part(method) || method.to_s == 'test' ? true : false
  end

end