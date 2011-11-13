class Group
  include MongoMapper::Document
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  
  # many :users
  many :sites
  
  timestamps!
  
end