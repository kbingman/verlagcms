class PageDrop < Liquid::Drop 
    
  def initialize page, request=nil
    @page ||= page   
    @request = request
  end   
  
  def title(edit=false)
    edit ? 'fibble' + @page.title : @page.title
  end
  
  def path  
     edit = @request.params['edit'] unless @request.nil?
     if edit == 'true' 
       # This is used for the inline editor, setting a small flag with the edit page / part path
       "/preview#{@page.path}" 
     else
       @page.path 
     end
  end
  
  def children 
    children = []   
    @page.children.each do |child|
       children << PageDrop.new(child, @request) 
    end 
    children
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
  
  def find
    Page.first
  end
  
  # def before_method(meth) 
  #   part = @page.parts.detect { |p| p.name == meth.to_s } 
  #   part
  # end 
  
end  

class Include < Liquid::Tag 
  # Load all models.
  Dir[root_path('app/models/*.rb')].each do |file|
    require file
  end
                                              
  def initialize(name, params, tokens)
    super 
    @params = params
  end

  def render(context)  
    puts context['registers']['site_id']
    template = ::Template.find_by_name @params.strip
    template.render
  end    
end

Liquid::Template.register_tag('include', Include) 
 
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