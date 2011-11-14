require './app/models/parts/part.rb'

class ImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_id, ObjectId 
  belongs_to :asset, :foreign_key => :asset_id
  
  liquid_methods :name, :content, :render, :image_path
  
  def admin_path
   "/admin/pages/#{self.page_id}/image_parts/#{self.id}" 
  end
 
  def path
    self.asset ? self.asset.image_path : '/images/missing.png'
  end
  
  def image_path
    self.asset ? self.asset.image_path : '/images/missing.png'
  end
  
  def editor
    if self.edit
      '<p>insert widget goes here<p>'
    end
  end
  
  def as_json(options)
    super(:methods => [:image_path, :asset, :path, :klass])
  end
  
  def render(edit=false)
    self.asset.image_path
    # ImageProxy.new(self, edit)
  end
  
end