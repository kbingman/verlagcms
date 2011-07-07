class ImagePart < Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  key :content, String   
  
  key :asset_id, ObjectId 
  belongs_to :asset, :foreign_key => :artist_id
  
  liquid_methods :name, :content, :render, :image_path
  
  def image_path
    self.asset.image_path   
  end
  
  def as_json(options)
    super(:methods => [:image_path])
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