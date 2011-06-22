class PageDrop < Liquid::Drop 
    
  def initialize page, request=nil
    @page ||= page   
    @request = request
  end   
  
  def title
    @page.title
  end
  
  def path
    @page.path
  end
  
  def children    
    @page.children
  end
  
  def child_count
    @page.children.count
  end
  
  def assets
    @page.assets
  end
  
  def parts
    @page.parts
  end  
  
  def data
    @page.data(@request)
  end 
  
  def before_method(meth) 
    part = @page.parts.detect { |p| p.name == meth.to_s } 
    part
  end 
  
end  

class RenderPart < Liquid::Tag                                             
  def initialize(tag_name, name, tokens)
    super 
    @name = name
  end

  def render(context)  
    "This renders the #{@name} part #{@page.title}"  
    # page.parts.first{|p| p.name == @name}
  end    
end

Liquid::Template.register_tag('render_part', RenderPart) 
 
# 
# class PageDrop < Liquid::Block                                             
#   def initialize(tag_name, path, tokens)
#      super 
#      logger.debug('Path: ' + path)
#      @page = Page.find_by_path path, Site.first  
#   end
# 
#   def render(context) 
#     @page.title
#     super
#   end    
# end
# 
# 
# Liquid::Template.register_tag('page', PageDrop)  