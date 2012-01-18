require './app/models/parts/part.rb'

class MultiImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_ids, Array
  many :assets, :in => :asset_ids
  
  def path
   "/pages/#{self.page_id}/image_parts/#{self.id}" 
  end
  alias :admin_path :path
  
  def render(edit=false)
    GalleryProxy.new(self, edit)
  end
  
end