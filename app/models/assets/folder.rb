class Folder < Part
  include MongoMapper::Document
  
  # Attributes
  # ----------------------------------------
  
  # TODO add custom validation
  key :name, String, :required => true, :unique => true 
  
  many :assets, :dependent => :destroy
  
  # Folder Tree
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Folder', :foreign_key => :parent_id  
  many :children, :class_name => 'Folder', :dependent => :destroy, :foreign_key => :parent_id
  
  # Scoped to Site
  key :site_id, ObjectId, :required => true
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site, lambda { |site| where(:site_id => site.id) }
  
  # Validations
  # ----------------------------------------
  validates :name, 
    :uniqueness => { :scope => [:site_id, :parent_id] },
    :presence => true
  
  timestamps!
  
  
  protected
  
    # Before Validation
    # ----------------------------------------
    before_validation :set_site_id
    def set_site_id 
      self.site_id = self.parent.site_id if self.site_id.blank? && self.parent_id
    end
  
end