class GalleryProxy
  
  def initialize part, edit=nil
    @part = part 
    @edit = edit
  end   
  
  def to_liquid
    GalleryDrop.new(@part, @edit)
  end
  
  # Rendering for gallery part
  def assets
    @part.assets
  end
  
  def name
    @part.name
  end
  
  def each
    '@part.assets'
  end
  
  def empty?
    @part.assets.empty?
  end
  
  def length
    @part.assets.length
  end
  
  def method_missing(meth) 

  end

end