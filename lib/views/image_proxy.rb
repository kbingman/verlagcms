class ImageProxy

  def initialize part
    @part = part 
  end  
  
  def path
  end
  
  # Possible tags: icon_path, thumbnail_path, splits the method name like the 
  # Ranger example
  
  def method_missing(method, *args, &block) 
    return super unless part(method)
    part(method).render
  end
  
  # This needs to return true for any of the above methods to work.
  def respond_to?(method)
    return super unless part(method)
    part(method)
  end

end