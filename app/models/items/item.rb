class Item
  include MongoMapper::Document 
  
  # Plugins
  # ----------------------------------------  
  plugin MongoMapper::Plugins::ActsAsTree
  key :parent_id, ObjectId
  # belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id  
  # many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  acts_as_tree :order => :slug
  
  
  
  key :site_id, ObjectId, :required => true
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |site| where(:site_id => site.id) }
  
end