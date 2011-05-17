class Part
  include MongoMapper::EmbeddedDocument
  
  key :name, String 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page, :foreign_key => :page_id
  
  validates_presence_of :name
  
  # def page_id
  #   self.page.id
  # end
  
end