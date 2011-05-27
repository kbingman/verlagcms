class Part
  include MongoMapper::EmbeddedDocument
  
  key :name, String, :required => true, :unique => true 
  key :content, String
  
  many :pages
  
  liquid_methods :name, :content
  
  # def page_id
  #   self.page.id
  # end
  
end