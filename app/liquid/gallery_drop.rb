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

module CollectionFilter
  
  def image(part, size='original')
    asset = part.asset
    
    r = ''
    if part.edit == 'true' 
      r = setup_editor(part)  
    end
    r +="<img src='#{asset.image_path(size)}' />\n" if asset
    r
  end
  
  # renders a collection of assets from a given collection part
  # if list is set to true, renders a <ul>
  def collection(part, options_string='')
    collection = part.assets
    
    options = {}
    options_string.split(',').each{ |a| k, v = a.split(':'); options[k.strip] = v.strip }
    
    size = options.delete('size') || 'thumbnail'
    link_size = options.delete('link_size') || 'original'
    wrap_tag = otption.delete('wrap_tag') || 'li'
    list = options.delete('list') || 'false'
    link = options.delete('link') || 'true'
    dom_id = options['id'] || part.name
    
    r = ''
    if part.edit == 'true' 
      r = setup_editor(part)
    end
    r += "<ul id='#{dom_id}'>\n" if list == 'true'
    unless collection.empty?
      collection.each do |asset|
        r += "<#{li}>\n" if list == 'true'
        r += "<a href='#{asset.image_path(link_size)}'>" if link == 'true'
        r += "<img src='#{asset.image_path(size)}' />"
        r += "</a>\n" if link == 'true'
        r += "</#{li}>\n" if list == 'true'
      end
    end
    r += "</ul>\n" if list == 'true'
    r
  end
  
  def editor(part)
    if part.edit == 'true' 
      setup_editor(part)
    end
  end
  
  def find_page(path)
    current_site = Site.find @context['registers']['site_id']
    page = Page.find_by_path(path, site)
    page.title
  end
  
  protected
    
    # This is used for the inline editor, setting a small flag with the edit page / part path
    def setup_editor(part)
      r =  "<span class='part-editor' id='editor-#{part.id}'>"
      r += "<a class='verlag-editor' href='##{part.path}/edit'>"
      r += "<span>Edit #{part.name}</span></a></span>"
      r
    end
end

Liquid::Template.register_filter CollectionFilter