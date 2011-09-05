class GalleryBlock < Liquid::Block

  attr_accessor :assets
      
  def initialize(name, params, tokens)
    @assets = []
    @name = name
    @params = params
    @tokens = tokens
    super
  end
  
  def render(context)
    context.stack do 
    
      output = render_all(@nodelist, context)
    
      @nodelist.inspect             
    end
  end
  
end

Liquid::Template.register_tag 'gallery', GalleryBlock