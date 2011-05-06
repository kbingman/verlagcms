class Page
  include MongoMapper::Document
  # plugin MongoMapper::Plugins::IdentityMap
  
  key :title, String 
  key :description, String 
  
  many :page_parts, :class_name => 'PagePart', :dependent => :destroy
  
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id
  

  many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  
  timestamps!
  
  validates_presence_of :title
  
  scope :all_roots, lambda { where(:parent_id => nil) }
  
  def root?
    self.parent_id.nil? ? true : false
  end
  
  # def api_attributes
  #   hash = {}
  #   hash[:id] = self.id.to_s
  #   hash[:class] = self.class.to_s.downcase
  #   hash[:children] = self.children.collect{ |c| c.api_attributes }
  #   hash[:created_at] = self.created_at.strftime('%Y%m%d%H%M%S')
  #   [:title].each do |attr|
  #     hash[attr.to_sym] = self.send(attr)
  #   end
  #   
  #   hash
  # end
  
end