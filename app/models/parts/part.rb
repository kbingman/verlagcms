class Part
  include MongoMapper::EmbeddedDocument
  
  # TODO add custom validation
  key :name, String, :required => true #, :unique => true 
  key :content, String
  
  key :page_id, ObjectId
  belongs_to :page
  
  attr_accessor :edit
  
  # validates :name, :uniqueness => true
   
  def klass
    self.class.to_s.downcase.pluralize
  end
    
end