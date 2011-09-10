class ImageProxy
  
  def initialize part, edit=nil
    @part = part 
    @edit = edit
  end   
  
  def to_liquid
    ImageDrop.new(@part, @edit)
  end
  
  def asset
    @part.asset
  end
  
  def path
    @part.path 
  end
 
  def id
    @part.id
  end
  
  def name
    @part.name
  end
  
  def method_missing(method) 
    @part.send(method)
  end

end

class ImageDrop < Liquid::Drop
  
  def initialize part, edit=nil
    @part = part 
    @edit = edit
  end 
  
  def path
    @part.path 
  end 
  
  def asset
    @part.asset
  end 
  
  def name
    @part.name
  end
  
  def id
    @part.id
  end
  
  def edit
    @edit
  end
   
  def before_method(method) 
    puts method
    @part[method].to_s
  end

end