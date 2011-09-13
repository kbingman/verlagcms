class GalleryDrop < Liquid::Drop
  
  def initialize part, edit=nil
    @part = part 
    @edit = edit
  end   
  
  # def title
  #   @page.title
  # end  
  # 
  # def slug
  #   @page.slug
  # end
  
  # Rendering for gallery part
  def assets
    @part.assets
  end
  
  def each(&block)
    @part.assets(&block)
  end
  
  def id
    @part.id
  end
  
  def path
    @part.path
  end
  
  def name
    @part.name
  end
  
  def first
    @part.assets.first
  end
  
  def last
    @part.assets.last
  end
  
  def empty?
    @part.assets.empty?
  end
  
  def length
    @part.assets.length
  end
  
  def edit
    @edit
  end
   
  def before_method(meth) 

  end

end

