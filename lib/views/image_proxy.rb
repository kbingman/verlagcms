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
  
  def respond_to?(method)
    # This needs to return true for any of the above methods to work.
    part(method) || method.to_s == 'test' ? true : false
  end

end