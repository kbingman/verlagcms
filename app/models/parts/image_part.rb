require './app/models/parts/part.rb'

class ImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_id, ObjectId 
  belongs_to :asset, :foreign_key => :asset_id
  
  def admin_path
   "/admin/pages/#{self.page_id}/image_parts/#{self.id}" 
  end
 
  def path
    self.asset ? self.asset.image_path : '/images/missing.png'
  end
  
  def title
    self.asset.title if self.asset
  end
  
  def image_path
    self.asset ? self.asset.image_path : '/images/missing.png'
  end
  
  def file_name
    self.asset ? self.asset.file_name : 'missing.png'
  end
  
  def editor
    if self.edit
      "<div class='verlag'>\n<a class='insert-image' href='#{admin_path}/edit'>insert widget goes here</a>\n</div>"
    end
  end
  
  def as_json(options)
    super(:methods => [:image_path, :asset, :path, :klass, :file_name, :title])
  end
  
  def render(edit=false)
    "<img src='#{self.path}' alt='#{self.title}' />"
    # self.asset.image_path
    # ImageProxy.new(self, edit)
  end
  
end