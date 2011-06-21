class PartType
  include MongoMapper::Document
  
  key :name, String, :required => true #, :unique => true 
  
  key :layout_id, ObjectId #, :required => true 
  belongs_to :layout, :foreign_key => :layout_id                         
  
  liquid_methods :name
  
  # def page_id
  #   self.page.id
  # end
  
end