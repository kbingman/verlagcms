class PagePart
  include MongoMapper::Document
  
  key :name, String 
  key :content, String
  
  timestamps!
  
  key :page_id, ObjectId
  belongs_to :page, :foreign_key => :page_id
  
  validates_presence_of :name
  
end