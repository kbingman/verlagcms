class ImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_id, ObjectId 
  belongs_to :asset, :foreign_key => :asset_id
  
  liquid_methods :name, :content, :render, :image_path
  
  def path
   "/pages/#{self.page_id}/image_parts/#{self.id}" 
  end
  
  def image_path
    self.asset.image_path   
  end
  
  def as_json(options)
    super(:methods => [:image_path, :asset])
  end
  
  def render(edit=false)
    ImageProxy.new(self, edit)
    # if edit == 'true' 
    #   # This is used for the inline editor, setting a small flag with the edit page / part path
    #   r =  "<span class='part-editor' id='editor-#{self.id}'>"
    #   r += "<a class='verlag-editor' href='##{self.path}/edit'>"
    #   if self.asset
    #     r += "<span>Replace image</span></a></span>" 
    #     r += "<img src='#{self.asset.image_path}' />" 
    #   else
    #     r += "<span>Add an image</span></a></span>"
    #   end
    #   r
    # else
    #   self.asset ? "<img src='#{self.asset.image_path}' />" : ''
    # end
  end
  
  
end