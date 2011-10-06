require root_path('app/liquid/drops/recent_drop')

class PageDrop < Liquid::Drop 
    
  def initialize page, request=nil
    @page ||= page   
    @request = request
  end   
  
  def title(edit=false)
    edit ? 'fibble' + @page.title : @page.title
  end
  
  def path  
    @page.path 
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
  
  def recent
    @page.recent
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
    logger.info context['registers']['site_id']
    logger.info @params.strip.inspect
    template = ::Template.find_by_name @params.strip
    template.render
  end    
end

Liquid::Template.register_tag('include', Include) 