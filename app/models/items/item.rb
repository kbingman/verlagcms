class Item
  include MongoMapper::Document 
  
  key :site_id, ObjectId 
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |site| where(:site_id => site.id) }
  
end