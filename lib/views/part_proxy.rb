class PartProxy

  def initialize page, edit=nil
    @page = page 
    @edit = edit
  end  
  
  def part(name)
    part = @page.parts.detect { |p| p.name == name.to_s } 
    part.edit = true if part && @edit
    part
  end
  
  def method_missing(method, *args, &block) 
    return super unless part(method)
    part(method)
  end
  
  # This needs to return true for any of the above methods to work.
  def respond_to?(method)
    return super unless part(method)
    part(method)
  end

end