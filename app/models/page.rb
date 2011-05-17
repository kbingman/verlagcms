class Page
  include MongoMapper::Document
  # plugin MongoMapper::Plugins::IdentityMap
  
  key :title, String  
  key :slug, String
  key :description, String 
  key :level, Integer
  
  many :parts, :class_name => 'Part', :dependent => :destroy 
  many :assets, :class_name => 'Asset'
  
  key :parent_id, ObjectId
  belongs_to :parent, :class_name => 'Page', :foreign_key => :parent_id
  

  many :children, :class_name => 'Page', :dependent => :destroy, :foreign_key => :parent_id
  
  timestamps!
  
  validates_presence_of :title
  
  scope :all_roots, lambda { where(:parent_id => nil) }
  
  def root?
    self.parent_id.nil? ? true : false
  end 
  
  def padding
    self.level * 24
  end  
  
  def descendants #(*ids)   
    results = []
    children = self.children #.all(:id => ids)
    children.each do |c|
      results << c.as_json({})
    end
    results
  end
  
  def as_json(options)
    super(:methods => [:padding, :assets])
  end  
  
  def path
    self.parent? ? self.parent.path + '/' + self.slug : '/' + self.slug
  end
  
  protected
    
    before_validation :set_level
    def set_level
      self.level = self.root? ? 0 : self.parent.level + 1
    end
    
    before_validation :set_slug
    def set_slug
      self.slug = sanitize(self.title) if self.slug.nil?
    end     
    
    def sanitize(text)
      text.gsub(/[^a-z0-9-]+/i, '-').downcase
    end  
    
    def clean_path(path)
      "/#{ path.strip }/".gsub(%r{//+}, '/')
    end

end