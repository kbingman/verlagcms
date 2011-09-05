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
    part = @page.parts.detect { |p| p.name == meth.to_s } 
    part ? part.render : ''
  end

end