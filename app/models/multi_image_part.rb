class MultiImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_ids, Array
  many :assets, :in => :asset_ids
  
  liquid_methods :name, :content, :render, :image_path, :assets, :id
  
  def path
   "/pages/#{self.page_id}/image_parts/#{self.id}" 
  end
  
  def as_json(options)
    super
  end
  
  def render(edit=false)
    GalleryProxy.new(self, edit)
  end
  
  # validate :unique_name
  # 
  # def unique_name 
  #   exisiting_names = self.parts.collect{ |p| p.name }
  #   if exisiting_names.include(self.name)
  #     errors.add( :name, "Name must be unique")
  #   end
  # end
  
end