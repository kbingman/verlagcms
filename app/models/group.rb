class Group < Part
  include MongoMapper::Document
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  
  # many :users
  many :sites
  
  validates :name, 
    :uniqueness => true,
    :presence => true
  
  timestamps!
  
end