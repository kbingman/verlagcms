class CollectionProxy
  
  def initialize part, edit=nil
    @part = part 
    @edit = edit
  end   
  
  def to_liquid
    GalleryDrop.new(@part, @edit)
  end
  


end