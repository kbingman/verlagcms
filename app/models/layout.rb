class Layout
  include MongoMapper::Document
  
  key :name, String, :required => true, :unique => true 
  key :content, String  
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |id| where(:site_id => id) }
  
  timestamps!

end
