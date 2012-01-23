require './app/models/parts/part.rb'
require './app/models/assets/asset.rb'

class ImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_id, ObjectId 
  belongs_to :asset, :foreign_key => :asset_id
  
  def admin_path
   "/admin/pages/#{self.page.id}/image_parts/#{self.id}" 
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
  alias :filename :file_name
  
  def editor
    if self.edit
      "<div data-name='#{self.name}' class='verlag'>\n<a class='insert-image' href='#{admin_path}/edit'>insert widget goes here</a>\n</div>"
    end
  end
  
  def as_json(options)
    super(:methods => [:image_path, :asset, :path, :file_name, :title])
  end
  
  def render(edit=false)
    result = ""
    if self.edit
      result += "<div data-name='#{self.name}' class='verlag'>\n<a class='insert-image' href='#{admin_path}/edit'>insert widget goes here</a>\n</div>\n"
    end
    
    result += "<img src='#{self.path}' alt='#{self.title}' />"
    result
    # self.asset.image_path
    # ImageProxy.new(self, edit)
  end
  
end