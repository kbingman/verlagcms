class Item
  include MongoMapper::Document 
  
  # Plugins
  # ----------------------------------------  
  plugin MongoMapper::Plugins::ActsAsTree
  
  # Folder Tree
  # ----------------------------------------
  key :parent_id, ObjectId
  acts_as_tree :order => :slug
  
  # Attributes
  # ----------------------------------------
  key :name, String
  
  # Scoped to Site
  # ----------------------------------------
  key :site_id, ObjectId, :required => true
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site, lambda { |site| where(:site_id => site.id) }
  
  # Validations
  # ----------------------------------------
  validates :name, 
    :uniqueness => { :scope => [:site_id, :parent_id] },
    :presence => true
  
  timestamps!
  
  
end
