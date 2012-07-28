require './lib/views/part'
class PartProxy

  def initialize page, edit=nil
    @page = page 
    @edit = edit
  end  

  def part(name)
    part = @page.parts.detect { |p| p.name.match(/^#{name.to_s}$/i) } 
    part.edit = true if part && @edit
    part
  end
  
  def method_missing(name, *args, &block) 
    return super unless part(name)
    
    part_view = Main::Views::Part.new part(name), @edit
    part(name)
  end
  
  # This needs to return true for any of the above methods to work.
  def respond_to?(name)
    return super unless part(name)
    part(name)
  end

end