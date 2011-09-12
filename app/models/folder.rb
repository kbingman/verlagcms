class Folder < Part
  include MongoMapper::Document
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  
  many :assets, :dependent => :destroy
  
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Folder', :foreign_key => :parent_id  
  many :children, :class_name => 'Folder', :dependent => :destroy, :foreign_key => :parent_id
  
  validates :name, 
    :uniqueness => { :scope => [:site_id, :parent_id] },
    :presence => true
  
  timestamps!
  
end