class MultiImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_ids, Array
  many :assets, :in => :asset_ids
  
  liquid_methods :name, :content, :render, :image_path, :assets, :id
  
  def path
   "/pages/#{self.page_id}/parts/#{self.id}" 
  end
  
  def render(edit=false)
    GalleryProxy.new(self, edit)
  end
  
end