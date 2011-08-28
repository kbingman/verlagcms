class PartType
  include MongoMapper::EmbeddedDocument
  
  key :name, String, :required => true #, :unique => true 
  key :kind, String, :required
  
  key :layout_id, ObjectId #, :required => true 
  belongs_to :layout, :foreign_key => :layout_id                         
  
  liquid_methods :name
  
  # validates :name, :uniqueness => true
  
  # def page_id
  #   self.page.id
  # end
  
end