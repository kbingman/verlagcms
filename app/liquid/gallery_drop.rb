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
   
  def before_method(meth) 

  end

end

module CollectionFilter
  
  def image(part, edit='true')
    asset = part.asset
    r = ''
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<span class='part-editor' id='editor-#{part.id}'>"
      r += "<a class='verlag-editor' href='##{part.path}/edit'>"
      unless asset.nil?
        r += "<span>Replace image</span></a></span>"  
      else
        r += "<span>Add images</span></a></span>"
      end
    end
    r +="<a href='#{asset.image_path}'><img src='#{asset.image_path}' /></a>\n" if asset
    r
  end

  def collection(part, edit='true')
    collection = part.assets
    
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<span class='part-editor' id='editor-#{part.id}'>"
      r += "<a class='verlag-editor' href='##{part.path}/edit'>"
      unless collection.empty?
        r += "<span>Replace image</span></a></span>" 
        collection.each do |asset|
          r +="<a href='#{asset.image_path}'><img src='#{asset.thumb_path}' /></a>\n" 
        end
      else
        r += "<span>Add images</span></a></span>"
      end
      r
    else
      r = ''
      unless collection.empty?
        collection.each do |asset|
          r +="<a href='#{asset.image_path}'><img src='#{asset.thumb_path}' /></a>\n" 
        end
      end
      r
    end
  end
  
  def editor(part, edit='true')
    
    if edit == 'true' 
      # This is used for the inline editor, setting a small flag with the edit page / part path
      r =  "<span class='part-editor' id='editor-#{part.id}'>"
      r += "<a class='verlag-editor' href='##{part.path}/edit'><span>Edit #{part.name}</span></a></span>"
      r
    end
  end
end

Liquid::Template.register_filter CollectionFilter