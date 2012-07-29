class Folder
  include MongoMapper::Document
  
  attr_accessible :name, :parent_id
  
  # Folder Tree
  # ----------------------------------------
  plugin MongoMapper::Plugins::ActsAsTree
  key :parent_id, ObjectId
  acts_as_tree :order => :slug
  
  # Attributes
  # ----------------------------------------
  key :name, String
  many :assets, :dependent => :destroy
  
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
  
  # def as_json(options)
  #   super(:methods => [
  #     :assets
  #   ]) 
  # end
  
  
  protected
  
    # Before Validation
    # ----------------------------------------
    before_validation :set_site_id
    def set_site_id 
      self.site_id = self.parent.site_id if self.site_id.blank? && self.parent_id
    end
  
end