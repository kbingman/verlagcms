class PageType
  include MongoMapper::Document 
  
  key :name, String, :required => true
  
  key :site_id, ObjectId, :required => true
  belongs_to :site, :foreign_key => :site_id 
  scope :by_site,  lambda { |site| where(:site_id => site.id) }
  
  key :layout_id, ObjectId, :required => true
  belongs_to :layout, :foreign_key => :layout_id 
  
  many :pages
  many :part_types 
  
  protected
  
    # after_create :create_default_part_type
    def create_default_part_type
      p = PartType.new :name => 'body', :kind => 'TextPart'
      p.layout = self 
      p.save 
      self.part_types << p
      self.save 
    end

  
end