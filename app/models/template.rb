class Template
  include MongoMapper::Document
  include Canable::Ables
  
  key :name, String, :required => true #, :unique => true 
  key :content, String  
  
  key :site_id, ObjectId, :required => true 
  belongs_to :site, :foreign_key => :site_id 
  
  validates :name, :uniqueness => { :scope => :site_id }
  
  def self.by_site(site, admin = false)
    self.where :site_id => site.id
  end
  
  timestamps! 
  
  attr_accessible :content, :name  
  
  def klass
    self.class.name
  end
  
  def layout?
    self.class.name == 'Layout'
  end
  
  def as_json(options)
    super(:methods => [:klass, :mode, :part_types, :layout?])
  end 
  
  def mode
    'liquid'
  end

end