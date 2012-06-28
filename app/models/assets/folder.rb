class Folder < Item
  include MongoMapper::Document
  
  # Attributes
  # ----------------------------------------
  
  many :assets, :dependent => :destroy
  
  def admin_path
    "/admin/folders/#{self.id}"
  end
  
  def as_json(options)
    super(:methods => [
      :admin_path
    ]) 
  end
  
  
  protected
  
    # Before Validation
    # ----------------------------------------
    before_validation :set_site_id
    def set_site_id 
      self.site_id = self.parent.site_id if self.site_id.blank? && self.parent_id
    end
  
end